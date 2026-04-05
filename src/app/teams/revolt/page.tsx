import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/teams/revolt";

function SAEeBaja() {
  return <NewClubPageTemplate {...clubData} />;
}

export default SAEeBaja;
