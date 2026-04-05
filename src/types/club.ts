// Shared types for club / team / society / community page data.
// These mirror the props accepted by NewClubPageTemplate and SocietyPageTemplate.

export interface ClubMember {
  name: string;
  role?: string;
  position?: string;
  image: string;
  email?: string;
  linkedin?: string;
  year?: string;
  department?: string;
  roll?: string;
}

export interface ClubLinks {
  website?: string;
  instagram?: string;
  github?: string;
  linkedin?: string;
}

export interface TimelineEntry {
  year: number;
  event: string;
  description: string;
  proof?: string;
}

export interface Project {
  name: string;
  description: string;
  image?: string;
  members?: string[];
  technologies?: string[];
  themeColor?: string;
}

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface ClubPageData {
  name: string;
  logo: string;
  introduction: string;
  timeline: TimelineEntry[];
  projects: Project[];
  gallery: GalleryImage[];
  core: ClubMember[];
  links: ClubLinks;
}
