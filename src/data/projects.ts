export interface Project {
  id: number;
  title: string;
  href?: string;
  live?: string;
  createdAt: string;
  description: string;
  features: string[];
  badge: string[];
  image?: string; // Added image field
}

const projects: Project[] = [
  {
    id: 1,
    title: 'GitHub Actions Visualizer',
    href: '',
    createdAt: '29-05-2026',
    description:
      'Visualize GitHub Actions with live run updates, waterfall trace to identify slow steps, and detailed logs. Users can install the GitHub app on up to 5 repositories for free to track their actions.',
    features: [
      'Live run updates',
      'Waterfall trace for step performance',
      'Detailed execution logs',
      'GitHub App integration (5 repos free)',
    ],
    badge: ['Next.js', 'GitHub App', 'Tailwind CSS', 'Go-lang', 'Redis'],
    image: '/projects/github-actions-visualizer.png',
  },
  {
    id: 2,
    title: 'Campus Kiosk',
    href: '',
    createdAt: '21-02-2026',
    description:
      'A campus kiosk application for colleges providing staff information, a 360-degree campus tour, timetables, block information, and navigation. Built with Electron featuring seamless in-app updates to avoid manual GitHub downloads.',
    features: [
      'Staff information directory',
      'Interactive 360-degree campus tour',
      'Timetable and block navigation',
      'Seamless in-app updates',
    ],
    badge: ['Electron', 'React', 'Node.js', 'Auto-Updater'],
  },
  {
    id: 3,
    title: 'CyberSuite',
    href: 'https://github.com/MannuVilasara/cybersuite',
    createdAt: '15-11-2025',
    description:
      'A comprehensive cybersecurity infrastructure platform that consolidates all essential security tools into one unified system. Built with a microservices architecture using Turborepo for efficient monorepo management.',
    features: [
      'All-in-one cybersecurity toolkit',
      'Microservices architecture with API Gateway',
      'Real-time threat monitoring and alerts',
      'Containerized deployment with Docker',
      'Scalable database with PostgreSQL',
    ],
    badge: ['Turborepo', 'Next.js', 'Docker', 'PostgreSQL', 'Redis'],
    image: '/projects/secureauth.jpg',
  },
  {
    id: 4,
    title: 'Educlinic Campus',
    live: 'https://campus.educlinic.org/',
    createdAt: '30-10-2024',
    description:
      'A comprehensive Alumni and Student Connectivity Platform designed to enhance communication and networking among students and alumni.',
    features: [
      'Real-time chat for instant communication',
      'Event management tools',
      'Mobile-friendly design',
    ],
    badge: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Socket.io'],
    image: '/projects/educlinic.png',
  },
  {
    id: 5,
    title: 'Portfolio',
    href: 'https://github.com/MannuVilasara/me',
    live: '/',
    createdAt: '07-06-2025',
    description:
      'My Personal Portfolio Website, built with Next.js 15, showcasing my skills, projects, and experiences. It features a modern design and responsive layout.',
    features: [
      'Responsive design for all devices',
      'Modern UI components',
      'Framer motion animations',
    ],
    badge: ['Next.js', 'Typescript', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/portfolio.png',
  },
  {
    id: 6,
    title: 'Fit-Ai',
    href: 'https://github.com/MannuVilasara/disease-detector',
    createdAt: '30-06-2025',
    description:
      'A web application that predicts diseases from symptoms using machine learning. It provides a user-friendly interface for users to input their symptoms.',
    features: [
      'Symptom input interface',
      'Real-time disease predictions',
      'Gemini API Integration',
    ],
    badge: ['Streamlit', 'Python', 'Machine Learning', 'Gemini API'],
    // image: '/projects/fit-ai.png',
  },
  {
    id: 7,
    title: 'git-auto',
    href: 'https://github.com/MannuVilasara/git-auto',
    createdAt: '10-07-2025',
    description:
      'A command-line tool for automating Git Commit Formatting and Push operations. It simplifies the process of committing changes with a consistent format.',
    features: ['Automates Git commit formatting', 'CLI tool', 'Cross-platform'],
    badge: ['Node.js', 'Typescript', 'Git', 'CLI'],
    // image: '/projects/git-auto.png',
  },
  {
    id: 8,
    title: 'Auto-Labeler',
    href: 'https://github.com/MannuVilasara/auto-labeler',
    createdAt: '10-07-2025',
    description:
      'A GitHub Action for automatically labeling pull requests based on the content changed in the PR. It uses customizable rules to assign labels.',
    features: ['Automatic label assignment', 'Customizable rules', 'GitHub Actions integration'],
    badge: ['Node.js', 'Typescript', 'GitHub Actions'],
    // image: '/projects/auto-labeler.png',
  },
];

export { projects };
