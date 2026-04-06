"use server";

import { db } from "@/db";
import { Sessions, User_roles, Users, OrgAdmins } from "@/db/schema";
import { encodeBase32, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { cache } from "react";

import type { User } from "./user";

export interface Session {
	id: string;
	expiresAt: Date;
	userId: number;
}

type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	
	const rows = await db
		.select({
			sessionId: Sessions.session_id,
			sessionUserId: Sessions.user_id,
			sessionExpiresAt: Sessions.expires_at,
			userId: Users.user_id,
			googleId: Users.google_id,
			email: Users.email,
			name: Users.name,
			picture: Users.picture
		})
		.from(Sessions)
		.innerJoin(Users, eq(Sessions.user_id, Users.user_id))
		.where(eq(Sessions.session_id, sessionId))
		.limit(1);

	if (rows.length === 0) return { session: null, user: null };

	const row = rows[0];

	// Fetch role based on user email
	const roleRows = await db
		.select({ role: User_roles.role })
		.from(User_roles)
		.where(eq(User_roles.email, row.email));

	const role = roleRows.length > 0 ? roleRows[0].role : 'U';

	let orgSlugs: string[] = [];
	if (role === 'O') {
		const orgRows = await db
			.select({ org_slug: OrgAdmins.org_slug })
			.from(OrgAdmins)
			.where(eq(OrgAdmins.email, row.email));
		orgSlugs = orgRows.map((r) => r.org_slug);
	}

	const session: Session = {
		id: row.sessionId,
		userId: row.sessionUserId,
		expiresAt: row.sessionExpiresAt
	};

	const user: User = {
		id: row.userId,
		googleId: row.googleId,
		email: row.email,
		name: row.name,
		picture: row.picture,
		role,
		orgSlugs,
	};

	const now = Date.now();

	if (now >= session.expiresAt.getTime()) {
		await db.delete(Sessions).where(eq(Sessions.session_id, session.id));
		return { session: null, user: null };
	}

	// Renew session if it's expiring in the next 15 days
	if (now >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(now + 1000 * 60 * 60 * 24 * 30); // +30 days
		await db.update(Sessions)
			.set({ expires_at: session.expiresAt })
			.where(eq(Sessions.session_id, session.id));
	}

	return { session, user };
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
	const token = (await cookies()).get("session")?.value ?? null;
	if (!token) return { session: null, user: null };
	return validateSessionToken(token);
});

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(Sessions).where(eq(Sessions.session_id, sessionId));
}

export async function invalidateUserSessions(userId: number): Promise<void> {
	await db.delete(Sessions).where(eq(Sessions.user_id, userId));
}

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
	(await cookies()).set("session", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt
	});
}

export async function deleteSessionTokenCookie(): Promise<void> {
	(await cookies()).set("session", "", {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 0
	});
}

export async function generateSessionToken(): Promise<string> {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	return encodeBase32(tokenBytes).toLowerCase();
}

export async function createSession(token: string, userId: number): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // +30 days

	await db.insert(Sessions).values({
		session_id: sessionId,
		user_id: userId,
        expires_at: expiresAt
	});

	return {
		id: sessionId,
		userId,
		expiresAt
	};
}
