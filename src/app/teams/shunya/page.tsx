import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/teams/shunya";

function MarsShunya() {
  return <NewClubPageTemplate {...clubData} />;
}

export default MarsShunya;
