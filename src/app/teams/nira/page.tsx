import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/teams/nira";

function NiraPage() {
  return <NewClubPageTemplate {...clubData} />;
}

export default NiraPage;
