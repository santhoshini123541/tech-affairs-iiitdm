import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/societies/optica";

function OpticaStudentChapter() {
  return <NewClubPageTemplate {...clubData} />;
}

export default OpticaStudentChapter;
