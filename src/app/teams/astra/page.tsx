import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/teams/astra";

function AstraPage() {
  return <NewClubPageTemplate {...clubData} />;
}

export default AstraPage;
