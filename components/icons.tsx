import type { IconType } from "react-icons";
import { LuFileText, LuGlobe, LuMail, LuPlay } from "react-icons/lu";
import { SiDevpost, SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import type { LinkKind } from "@/content/projects";

export const LINK_ICONS: Record<LinkKind, { icon: IconType; label: string }> = {
  github: { icon: SiGithub, label: "GitHub" },
  site: { icon: LuGlobe, label: "Website" },
  devpost: { icon: SiDevpost, label: "Devpost" },
  demo: { icon: LuPlay, label: "Demo video" },
  report: { icon: LuFileText, label: "Report" },
};

export const SOCIAL_ICONS = {
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
  instagram: SiInstagram,
  email: LuMail,
  resume: LuFileText,
};
