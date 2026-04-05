// ASME uses SocietyPageTemplate which has a different (simpler) prop structure.
// This file matches ClubPageData with unused fields left minimal.
import type { ClubPageData } from "@/types/club";

const data: ClubPageData = {
  name: "ASME Student Section",
  logo: "/societies/ASMEStudentSection/logo.webp",
  introduction: `A global community of engineers with the aim of gaining
  practical knowledge beyond the classroom through
  workshops, competitions, and networking with industry
  professionals. Enhance your technical and soft skills, and
  connect with a worldwide network of engineering leaders.
  Step into the future of engineering with us!`,
  timeline: [],
  projects: [],
  gallery: [],
  core: [
    {
      name: "Vikas K A",
      role: "Chairperson",
      image: "/societies/ASMEStudentSection/vikas.png",
      email: "me22b1021@iiitdm.ac.in",
      linkedin: "https://in.linkedin.com/in/vikas2004",
      year: "B.Tech 3rd Year",
      department: "Mechanical Engineering",
      roll: "me22b1021",
    },
    {
      name: "Prahaladh A R",
      role: "Vice Chairperson",
      image: "/societies/ASMEStudentSection/prahalad.png",
      email: "priya.sharma@iiitdm.ac.in",
      linkedin: "https://in.linkedin.com/in/prahaladh-a-r",
      year: "B.Tech 3rd Year",
      department: "Mechanical Engineering",
      roll: "me22b1022",
    },
  ],
  links: {
    website: "#",
    instagram: "#",
    github: "#",
  },
};

export default data;
