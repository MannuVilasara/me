export interface Project {
  id: number;
  title: string;
  href?: string;
  live?: string;
  createdAt: string;
  description: string;
  features: string[];
  badge: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio',
    href: 'https://github.com/MannuVilasara/me',
    live: '/',
    createdAt: '07-06-2025',
    description:
      'Its My Personal Portfolio Website, built with Next.js 15, showcasing my skills, projects, and experiences. It features a modern design and responsive layout, providing a seamless user experience.',
    features: [
      'Responsive design for all devices',
      'Showcase of my projects with detailed descriptions',
      'Integration with GitHub for project links',
      'Contact form for inquiries',
      'Built with Next.js 15 framework',
      'Modern UI components styled with shadcn-ui and Tailwind CSS',
      'Framer motion for smooth animations',
      'Real Time Presence'
    ],
    badge: [
      'Open source',
      'Next.js',
      'Typescript',
      'Tailwind CSS',
      'Shadcn UI',
      'Framer motion',
    ],
  },
  {
    id: 2,
    title: 'git-auto',
    href: 'https://github.com/MannuVilasara/git-auto',
    // live: 'https://github.com/MannuVilasara/git-auto',
    createdAt: '10-07-2025',
    description:
      'A command-line tool for automating Git Commit Formatting and Push operations. It simplifies the process of committing changes with a consistent format and pushing them to a remote repository.',
    features: [
      'Automates Git commit formatting',
      'Supports custom commit messages',
      'Pushes changes to remote repositories',
      'CLI tool for easy integration into workflows',
      'Built with Node.js and TypeScript',
      'Cross-platform compatibility',
      'Open source and community-driven'
    ],
    badge: [
      'Open source',
      'Node.js',
      'Typescript',
      'Git',
      'CLI',
    ],
  },
  {
    id: 3,
    title: 'Auto-Labeler',
    href: 'https://github.com/MannuVilasara/auto-labeler',
    // live: '/',
    createdAt: '10-07-2025',
    description:
      'A GitHub Action for automatically labeling pull requests based on the content changed in the PR. It uses customizable rules to assign labels, making it easier to manage and categorize PRs.',
    features: [
      'Automatic label assignment based on PR content',
      'Customizable label rules and patterns',
      'Integration with GitHub workflows',
      'Supports multiple programming languages',
      'Built with Node.js and TypeScript',
    ],
    badge: [
      'Open source',
      'Node.js',
      'Typescript',
      'GitHub Actions',
    ],
  },
  {
    id: 4,
    title: "Educlinic Campus (Team Project)",
    // href: '',
    live: 'https://campus.educlinic.org/',
    createdAt: '30-10-2024',
    description:
      'A comprehensive Alumni and Student Connectivity Platform designed to enhance communication and networking among students and alumni. It features a user-friendly interface, real-time chat, and event management functionalities.',
    features: [
      'User-friendly interface for easy navigation',
      'Real-time chat for instant communication',
      'Event management tools for organizing alumni activities',
      'Integration with existing campus systems',
      'Mobile-friendly design for on-the-go access',
    ],
    badge: [
      'React',
      'Next.js',
      'Node.js',
      'Typescript',
      'Tailwind CSS',
      'Next-Auth',
      'ShadCN UI',
      'MongoDB',
      'GitHub',
      'Zod',
    ],
  },
  {
    id: 5,
    title: 'Fit-Ai (Team Project)',
    href: 'https://github.com/MannuVilasara/disease-detector',
    live: 'https://fit-ai.mannu.live/',
    createdAt: '30-06-2025',
    description:
      'A web application that predict Disease from Symptoms. It provides a user-friendly interface for users to input their symptoms and receive predictions about potential diseases. The application uses machine learning algorithms to analyze the symptoms and provide accurate predictions. It also provides disease Descriptions using Gemini API.',
    features: [
      'User-friendly interface for symptom input',
      'Real-time disease predictions',
      'Integration with Gemini API for disease descriptions',
      'Built with Streamlit and Python',
      'Machine learning algorithms for accurate predictions',
    ],
    badge: [
      'Open source',
      'Streamlit',
      'Flask',
      'Nginx',
      'Docker',
      'Python',
      'Machine Learning',
      'Gemini API',
    ],
  },
  {
    id: 6,
    title: 'Portfolio (Old Version)',
    href: 'https://github.com/MannuVilasara/me/tree/beta',
    live: 'https://beta.mannu.live/',
    createdAt: '04-05-2024',
    description:
      'An older version of my personal portfolio website, showcasing my skills and projects. It was built with Next.js and features a modern design and responsive layout.',
    features: [
      'Responsive design for all devices',
      'Showcase of my projects',
      'Integration with Spotify API for music display',
    ],
    badge: [
      'Next.js',
      'Typescript',
      'Tailwind CSS',
      'Shadcn UI',
    ]
  },

  // Add more projects as needed
];

export { projects };