import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/clubs/dev";

function DevClub() {
  return <NewClubPageTemplate {...clubData} />;
}

export default DevClub;
