export interface Project {
  heading: string;
  subheading: string;
  color: string;
  language?: string;
  stars?: number;
  href: string;
  target?: string;
}

export const projects: Project[] = [
  {
    heading: 'me',
    subheading: 'My personal portfolio website built with Next.js and Tailwind CSS.',
    color: 'bg-[#3178C6]',
    language: 'TypeScript',
    stars: 1,
    href: '/',
    target: '_self',
  },
  {
    heading: 'Edclinic Campus',
    subheading:
      'A fully functional Student and Alumni Connecting Platform for Colleges (Team Project).',
    color: 'bg-[#3178C6]',
    stars: 2,
    href: 'https://campus.educlinic.org/',
    target: '_blank',
    language: 'TypeScript',
  },
  {
    heading: "Ticketify (in progress)",
    subheading: 'A platform to manage support tickets from user. used inngest.',
    color: 'bg-[#3178C6]',
    stars: 2,
    href: 'https://https://ai-ticket-agent.vercel.app/',
    target: '_blank',
    language: 'TypeScript',
  },
];
