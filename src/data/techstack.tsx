import { FaJs, FaReact, FaGithub } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPostman,
  SiDocker,
  SiApachekafka,
  SiArchlinux,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiOpenai,
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
    icon: <SiTailwindcss className="text-cyan-500 dark:text-cyan-400 text-4xl" />,
  },
  {
    name: 'NextJS',
    description: 'React Framework',
    icon: <SiNextdotjs className="text-foreground text-4xl" />,
  },
  {
    name: 'ExpressJS',
    description: 'Web Framework for Node.js',
    icon: <SiExpress className="text-gray-800 dark:text-gray-400 text-4xl" />,
  },
];

export const tools = [
  {
    name: 'Git & GitHub',
    description: 'Version Control',
    icon: <FaGithub className="text-gray-800 dark:text-gray-400 text-4xl" />,
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
  {
    name: 'OpenAI',
    description: 'AI and Machine Learning',
    icon: <SiOpenai className=" text-4xl" />,
  },
];

export const database = [
  {
    name: 'MongoDB',
    description: 'NoSQL Database',
    icon: <SiMongodb className="text-green-500 text-4xl" />,
  },
  {
    name: 'PostgreSQL',
    description: 'Relational Database',
    icon: <SiPostgresql className="text-blue-400 text-4xl" />,
  },
];
