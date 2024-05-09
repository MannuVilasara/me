import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiGit,
  SiDocker,
  SiBootstrap,
  SiTailwindcss,
  SiFlask,
  SiDjango,
  SiGithub,
  SiArchlinux,
  SiVisualstudiocode,
  SiPostman,
  SiCyberdefenders,
  SiNetlify,
  SiVercel,
  SiDigitalocean,
} from "react-icons/si";
import { text } from "stream/consumers";

export const skills = [
  {
    icon: SiTypescript,
    text: "Typescript",
  },
  {
    icon: SiNodedotjs,
    text: "Node",
  },
  {
    icon: SiReact,
    text: "React",
  },
  {
    icon: SiNextdotjs,
    text: "Next",
  },
  {
    icon: SiTailwindcss,
    text: "Tailwind",
  },
  {
    icon: SiHtml5,
    text: "HTML5",
  },
  {
    icon: SiCss3,
    text: "CSS3",
  },
  {
    icon: SiJavascript,
    text: "Js",
  },
  {
    icon: SiExpress,
    text: "Express",
  },
  {
    icon: SiPython,
    text: "Python",
  },
  {
    icon: SiFlask,
    text: "Flask",
  },
  {
    icon: SiDjango,
    text: "Django",
  },
  {
    icon: SiMongodb,
    text: "MongoDB",
  },
  {
    icon: SiGit,
    text: "Git",
  },
  {
    icon: SiGithub,
    text: "Github",
  },
  {
    icon: SiDocker,
    text: "Docker",
  },
  {
    icon: SiBootstrap,
    text: "Bootstrap",
  },
  {
    icon: SiArchlinux,
    text: "Linux",
  },
  {
    icon: SiVisualstudiocode,
    text: "vscode",
  }
];

export interface Project {
  title: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "This Page",
    description: "The page you are viewing rn",
    link: "/",
  },
  {
    title: "requests-abuser",
    description:
      "Python based request abuser to send as definite number/type of request to any url",
    link: "https://github.com/MannuVilasara/requests-abuser",
  },
  {
    title: "get-spotify-refresh-token",
    description: "A small app to get ur spotify refresh token",
    link: "https://github.com/MannuVilasara/get-Spotify-refresh-token",
  },
  {
    title: "my-dsc-rpc",
    description:
      "a python script that I use to show my presence on discord. it uses playerctl to fetch my now playing.",
    link: "https://github.com/MannuVilasara/my-dsc-rpc",
  },
];

export interface WorkExperience {
  company: string;
  logo: string;
  position: string;
  description: string;
  years: string;
}

export const workExperiences: WorkExperience[] = [
  // {
  //   company: "company 1",
  //   logo: "/company-logo.png",
  //   position: "Company 3 Position",
  //   description: "Write briefly on your experience working at Company 3.",
  //   years: "Apr, 2022 - Aug, 2023",
  // },
];

export const aboutYou = {
  name: "Mannu Vilasara",
  description:
    "👋 Hi, I'm Mannu. A 17-year-old Developer from India, with a passion for coding and a thirst for knowledge.",
  yearsOfExperience: "1 year",
  location: "India",
  email: "mannuvilasara@gmail.com",
};

export const logoText = "@dev_mannu";

export const marketingHeadlines = {
  mainHeadline: "✨ I Turn those random 3 AM ideas into ✨🤌 Reality",
  subHeadline: "I Use arch btw 🔥",
};

export const websiteMetadata = {
  title: "Mannu | 17yo Developer",
  description: "👋 Hey, Mannu here. Welcome to my portflio/blog.",
};
