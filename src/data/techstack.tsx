import { FaJs, FaReact, FaGithub } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPostman,
  SiDocker,
  SiApachekafka,
  SiArchlinux,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

export const webdev = [
  {
    name: 'JavaScript',
    description: 'Languages of the web',
    icon: <FaJs className="text-yellow-400 text-4xl" />,
  },
  {
    name: 'TypeScript',
    description: 'JavaScript with Types',
    icon: <SiTypescript className="text-blue-400 text-3xl" />,
  },

  {
    name: 'ReactJS',
    description: 'A JavaScript Library',
    icon: <FaReact className="text-sky-400 text-4xl" />,
  },
  {
    name: 'Tailwind CSS',
    description: 'CSS Frameworks',
    icon: <SiTailwindcss className="text-cyan-400 text-4xl" />,
  },
  {
    name: 'NextJS',
    description: 'React Framework',
    icon: <SiNextdotjs className="text-white text-4xl" />,
  },
];

export const tools = [
  {
    name: 'GitHub',
    description: 'Version Control',
    icon: <FaGithub className="text-gray-400 text-4xl" />,
  },
  {
    name: 'VS Code',
    description: 'Code Editor',
    icon: <VscVscode className="text-blue-500 text-4xl" />,
  },
  {
    name: 'Postman',
    description: 'API Testing',
    icon: <SiPostman className="text-orange-500 text-4xl" />,
  },
  {
    name: 'Docker',
    description: 'Containerization',
    icon: <SiDocker className="text-blue-400 text-4xl" />,
  },
  {
    name: 'Apache Kafka',
    description: 'Distributed Streaming Platform',
    icon: <SiApachekafka className="text-gray-500 text-4xl" />,
  },
  {
    name: 'Arch Linux',
    description: 'Linux Distribution',
    icon: <SiArchlinux className="text-blue-400 text-4xl" />,
  },
];
