import { generateSessionToken, createSession, setSessionTokenCookie } from "@/lib/server/session";
import { google } from "@/lib/server/auth";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { User_roles, OrgAdmins } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { OAuth2Tokens } from "arctic";
import { createUser, getUserFromGoogleId } from "@/lib/server/user";

async function getRedirectPath(email: string): Promise<string> {
    const roleRows = await db
        .select({ role: User_roles.role })
        .from(User_roles)
        .where(eq(User_roles.email, email));

    const role = roleRows.length > 0 ? roleRows[0].role : 'U';

    if (role === 'A') return '/admin';
    if (role === 'O') return '/org-admin';
    return '/';
}

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const cookieStore = await cookies();
    const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
    const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;

    if (code === null || state === null || storedState === null || codeVerifier === null) {
        return new Response(null, { status: 400 });
    }
    if (state !== storedState) {
        return new Response(null, { status: 400 });
    }

    let tokens: OAuth2Tokens;
    try {
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch (e) {
        return new Response(null, { status: 400 });
    }

    const claims = decodeIdToken(tokens.idToken()) as {
        sub: string;
        picture: string;
        email: string;
        name: string;
    };
    const googleUserId = claims.sub;
    const username = claims.name;
    const picture = claims.picture;
    const email = claims.email;

    // Only allow IIITDM emails
    if (!email.endsWith("@iiitdm.ac.in")) {
        redirect("/login?error=non_iiitdm");
    }

    const existingUser = await getUserFromGoogleId(googleUserId);

    let userId: number;
    if (existingUser !== null) {
        userId = existingUser.id;
    } else {
        const newUser = await createUser(googleUserId, email, username, picture);
        userId = newUser.id;
    }

    const sessionToken = await generateSessionToken();
    const session = await createSession(sessionToken, userId);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    const dest = await getRedirectPath(email);
    return new Response(null, {
        status: 302,
        headers: { Location: dest },
    });
}
