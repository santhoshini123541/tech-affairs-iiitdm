import React from "react";
import SocietyPageTemplate from "../../../components/SocietyPageTemplate";
import clubData from "@/data/societies/asme";

// SocietyPageTemplate uses `description` instead of `introduction`.
const templateProps = {
  name: clubData.name,
  logo: clubData.logo,
  description: clubData.introduction,
  core: clubData.core,
  links: clubData.links,
};

function ASMEStudentSection() {
  return <SocietyPageTemplate {...templateProps} />;
}

export default ASMEStudentSection;
