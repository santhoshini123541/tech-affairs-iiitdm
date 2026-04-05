import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/clubs/cybersecurity";

function CybersecurityClub() {
  return <NewClubPageTemplate {...clubData} />;
}

export default CybersecurityClub;
