export interface SidebarItem {
  id: string;
  label: string;
  icon: string | any; // Allow both string (emoji) and component (SVG)
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarUser {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}

export interface SidebarProps {
  items?: SidebarItem[]; // Made optional since we have defaults
  user?: SidebarUser;
  title?: string;
  logo?: string;
}

// You can import your SVG icons here when you have them
import HomeIcon from "@/assets/svg/home.svg";
import ProfileIcon from "@/assets/svg/user.svg";
import ResumeIcon from "@/assets/svg/resume.svg";
import TweakerIcon from "@/assets/svg/tweaker.svg";
import TemplateIcon from "@/assets/svg/templates.svg";
import ChromeExtensionIcon from "@/assets/svg/ext.svg";

// Simplified sidebar configuration focused on core workflow
export const DEFAULT_SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "home", label: "Start Here", icon: HomeIcon },
  { id: "resume-tweaker", label: "Quick Optimize", icon: TweakerIcon },
  { id: "my-resumes", label: "My Resumes", icon: ResumeIcon },
  { id: "templates", label: "Templates", icon: TemplateIcon },
  {
    id: "chrome-extension",
    label: "chrome Extension",
    icon: ChromeExtensionIcon,
  },
  { id: "master-profile", label: "Profile Info", icon: ProfileIcon },
];
