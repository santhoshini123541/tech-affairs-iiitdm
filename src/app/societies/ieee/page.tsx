import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/societies/ieee";

function IEEE() {
  return <NewClubPageTemplate {...clubData} />;
}

export default IEEE;
