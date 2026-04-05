import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/clubs/cs";

function CSClub() {
  return <NewClubPageTemplate {...clubData} />;
}

export default CSClub;
