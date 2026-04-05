import type { ClubPageData } from "@/types/club";

const data: ClubPageData = {
  name: "SAE eBaja Club – Revolt Racers",
  logo: "/teams/revolt/logo.webp",
  introduction: `The SAE eBaja Club – Revolt Racers 1.0, established in 2024, is a student-driven team focused on the design and development of electric all-terrain vehicles for SAE eBAJA competitions. It brings together students interested in automotive engineering and provides a hands-on platform to apply theoretical concepts to real-world challenges.

The club aims to build competent engineers capable of designing efficient electric off-road vehicles through practical learning and innovation. Members work across key areas such as vehicle dynamics, powertrain systems, brakes, chassis design, electronics and manufacturing, gaining exposure to the complete vehicle development process.

Through participation in SAE eBAJA 2025 and 2026, the team has developed strong technical and problem-solving skills while working under real-world constraints.

What sets the club apart is its focus on end-to-end product development, where students are involved from initial design to final testing, helping them understand how real engineering projects are actually executed.`,
  timeline: [
    {
      year: 2024,
      event: "Club Formation",
      description: "The club was established with a team of around 25 members, aiming to design and build an electric ATV for SAE eBAJA.",
    },
    {
      year: 2025,
      event: "SAE eBAJA Participation",
      description: "The team reached Phase 3 of the competition but was eliminated after failing the Mechanical Technical Inspection.",
    },
    {
      year: 2026,
      event: "SAE eBAJA Participation",
      description: `The team cleared all safety scrutiny tests and participated in both static and dynamic events. The vehicle successfully completed the endurance event.

Overall Performance:
All India Rank: 36
Tamil Nadu Rank: 7
CFTI Rank: 2

Event Highlights

Static Events:
CAE Event – Rank 12
Sustainability – Rank 16
Cost Event – Rank 21
Sales Event – Rank 26
Design Event – Rank 34

Dynamic Events:
Sled Pull – Rank 18
Endurance Event – Rank 34

Other events such as acceleration and maneuverability were attempted but not ranked due to time limits, and suspension & traction was not cleared.`,
    },
  ],
  projects: [
    {
      name: "Current Activities – SAE eBAJA 2027 Preparation",
      description: `The team is currently working on open house and ignition for recruiting new members for the 2027 SAE eBAJA team.

Internal training sessions have been conducted on CAD, SolidWorks, and ANSYS. Senior members have also conducted knowledge transfer sessions for juniors.

Following the 2026 competition, the team documented vehicle performance and identified areas for improvement. Regular meetings and design discussions are being carried out to plan the next iteration of the vehicle.`,
      image: "/teams/revolt/logo.webp",
      technologies: ["CAD", "SolidWorks", "ANSYS", "Vehicle Design"],
      themeColor: "#F44336",
    },
  ],
  gallery: [
    { src: "/teams/revolt/gallery/tech-inspection.jpeg",      caption: "Group photo after clearing the technical inspection" },
    { src: "/teams/revolt/gallery/dynamic-events.jpeg",       caption: "Group photo after participating in dynamic events" },
    { src: "/teams/revolt/gallery/pooja-1.jpeg",              caption: "Team photo after the pooja for starting the manufacturing work" },
    { src: "/teams/revolt/gallery/pooja-2.jpeg",              caption: "Team photo after the pooja for starting the manufacturing work" },
    { src: "/teams/revolt/gallery/endurance-race.jpeg",       caption: "The vehicle at the endurance race" },
    { src: "/teams/revolt/gallery/chassis-manufacturing.jpeg", caption: "The vehicle chassis while manufacturing" },
  ],
  core: [
    { name: "Harish N",       role: "Team Captain",  image: "/teams/revolt/captain.webp" },
    { name: "Gurubaran V",    role: "Vice Captain",  image: "/teams/revolt/vice-captain.webp" },
    { name: "Keshavprasad",   role: "Manager",       image: "/teams/revolt/manager.webp" },
    { name: "Shricharan R G", role: "Joint Manager", image: "/teams/revolt/joint-manager.webp" },
  ],
  links: {
    instagram: "https://www.instagram.com/revolt_racers_iiitdm/",
  },
};

export default data;
