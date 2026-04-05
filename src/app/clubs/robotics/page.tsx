import React from "react";
import NewClubPageTemplate from "@/components/NewClubPageTemplate";
import clubData from "@/data/clubs/robotics";

function RoboticsClub() {
  return <NewClubPageTemplate {...clubData} />;
}

export default RoboticsClub;
