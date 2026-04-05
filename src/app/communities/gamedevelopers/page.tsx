import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/communities/gamedevelopers";

function GameDevelopers() {
  return <NewClubPageTemplate {...clubData} />;
}

export default GameDevelopers;
