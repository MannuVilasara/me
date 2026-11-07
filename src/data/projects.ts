export interface Project {
  id: number;
  title: string;
  tagline?: string;
  href?: string;
  live?: string;
  createdAt: string;
  description: string;
  longDescription?: string;
  features: string[];
  badge: string[];
  image?: string;
  category: 'Platform & Infra' | 'Web Apps' | 'CLI & Tooling';
  featured?: boolean;
  architectureHighlights?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'GitHub Actions Visualizer',
    tagline: 'Real-time workflow execution telemetry and step-latency waterfall analysis.',
    href: 'https://github.com/MannuVilasara',
    createdAt: 'May 2026',
    description:
      'A telemetry platform that monitors GitHub Actions workflows as they run. It converts multi-step CI/CD jobs into an interactive waterfall trace, helping engineers pinpoint slow build steps, network lag, and flaky stages without sifting through thousands of raw log lines.',
    longDescription:
      'GitHub Actions logs are inherently sequential and difficult to diagnose during complex matrix builds. This visualizer hooks into repository webhook events via a custom GitHub App, streams live runner state through SSE, and plots execution latency into an interactive waterfall timeline. Built with Go for high-throughput event processing and Redis for fast pub/sub state caching.',
    features: [
      'Live run updates streamed over server-sent events (SSE)',
      'Waterfall trace breakdown for step-level execution latency',
      'Instant failure diagnosis and step log inspection',
      'GitHub App integration installable on up to 5 repositories for free',
    ],
    architectureHighlights: [
      'Go event worker daemon processing GitHub webhook payloads',
      'Redis pub/sub channels for low-latency browser streaming',
      'Next.js frontend with tactile canvas-based timeline scrubbing',
    ],
    badge: ['Next.js', 'Go', 'Redis', 'GitHub App', 'Tailwind CSS'],
    image: '/projects/github-actions-visualizer.png',
    category: 'Platform & Infra',
    featured: true,
  },
  {
    id: 3,
    title: 'CyberSuite',
    tagline: 'Monorepo security operations platform and containerized infrastructure.',
    href: 'https://github.com/MannuVilasara/cybersuite',
    createdAt: 'Nov 2025',
    description:
      'A consolidated security platform bringing vulnerability scanning, authentication governance, and threat telemetry under a unified control plane. Engineered with a Turborepo microservices architecture, Docker containerization, and PostgreSQL for distributed audit logging.',
    longDescription:
      'Security tools in modern teams are often siloed across disparate scripts and dashboards. CyberSuite unifies these utilities behind an API gateway, utilizing Docker containers for reproducible local sandboxing and PostgreSQL schemas configured for strict immutable audit trails.',
    features: [
      'Unified security operations and incident monitoring dashboard',
      'Microservices orchestration behind a centralized API Gateway',
      'Immutable audit trails and relational schema with PostgreSQL',
      'Dockerized container runtime for reproducible environment setup',
    ],
    architectureHighlights: [
      'Turborepo monorepo structure with shared TypeScript packages',
      'Multi-stage Docker builds optimized for minimal image sizes',
      'Container network isolation with secure internal communications',
    ],
    badge: ['Turborepo', 'Next.js', 'Docker', 'PostgreSQL', 'Redis'],
    image: '/projects/secureauth.jpg',
    category: 'Platform & Infra',
    featured: true,
  },
  {
    id: 4,
    title: 'Educlinic Campus',
    tagline: 'Real-time student & alumni communication and event platform.',
    live: 'https://campus.educlinic.org/',
    createdAt: 'Oct 2024',
    description:
      'A responsive campus networking platform designed to bridge communication between active university students and alumni. Features low-latency WebSocket messaging, campus event coordination, and mobile-friendly community forums.',
    longDescription:
      'Built to replace fragmented WhatsApp groups with an authentic campus-managed network. Features persistent room channels with Socket.io, role-based alumni directory lookups, and lightweight mobile views tuned for campus Wi-Fi networks.',
    features: [
      'Real-time WebSocket chat rooms for peer-to-peer and group discussions',
      'Campus event board with calendar integration and RSVPs',
      'Directory with verified alumni and student badges',
      'Optimized responsive layout tuned for high-latency mobile networks',
    ],
    architectureHighlights: [
      'Socket.io cluster handling persistent WebSocket connections',
      'MongoDB schemas optimized for rapid feed queries and chat logs',
      'Tailwind CSS design with high readability across mobile devices',
    ],
    badge: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Socket.io'],
    image: '/projects/educlinic.png',
    category: 'Web Apps',
    featured: false,
  },
  {
    id: 5,
    title: 'Personal Portfolio & Craft Workbench',
    tagline: 'Tactile portfolio, interactive physics workbench, and real-time telemetry.',
    href: 'https://github.com/MannuVilasara/me',
    live: '/',
    createdAt: 'Jun 2025',
    description:
      'This website—crafted with Next.js 15, Tailwind CSS, and Framer Motion. Engineered around tactile physical feedback, warm OKLCH color palettes, interactive spring physics testing, and live telemetry integrations.',
    longDescription:
      'Designed to showcase engineering principles by using them directly on screen. Includes an interactive spring physics lab with tension and damping sliders, a live DevOps pipeline runner that pings real latency, and real-time telemetry connected to Discord and Spotify.',
    features: [
      'Soft warm peach and basalt charcoal themes with custom dot matrix grid',
      'Engineering Craft Workbench with live spring physics and pipeline runner',
      'Real-time telemetry HUD displaying Discord status, Spotify, and IST clock',
      'High-performance zero-layout-shift architecture with full keyboard accessibility',
    ],
    architectureHighlights: [
      'Next.js 15 App Router with Turbopack and React Server Components',
      'Framer Motion spring physics configured with natural damping curves',
      'Modern Tailwind CSS v4 OKLCH color space for glare-free contrast',
    ],
    badge: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/portfolio.png',
    category: 'Web Apps',
    featured: false,
  },
  {
    id: 2,
    title: 'Campus Kiosk',
    tagline: 'Offline-resilient campus directory and 360-degree interactive navigation.',
    href: 'https://github.com/MannuVilasara',
    createdAt: 'Feb 2026',
    description:
      'A touch-first desktop application built for physical university information kiosks. Allows students and visitors to search staff offices, view block schedules, and explore a 360-degree interactive campus map with seamless background auto-updating.',
    longDescription:
      'Public kiosks frequently lose network connectivity or get stuck in outdated software states. This Electron application operates with an offline-first SQLite cache and integrates background GitHub release polling so university IT never needs to manually plug in USB updates.',
    features: [
      'Offline-resilient staff directory and timetable lookups',
      'Interactive 360-degree panoramic campus navigation',
      'Background auto-updater eliminating manual binary reinstallations',
      'Touch-friendly interface tuned for public touchscreen hardware',
    ],
    architectureHighlights: [
      'Electron wrapper with secure IPC channel isolation',
      'Auto-updater module pulling delta releases from GitHub Releases',
      'Local caching layer ensuring 100% uptime when campus Wi-Fi drops',
    ],
    badge: ['Electron', 'React', 'Node.js', 'Auto-Updater'],
    category: 'CLI & Tooling',
    featured: false,
  },
  {
    id: 7,
    title: 'git-auto',
    tagline: 'Deterministic CLI for semantic commit formatting and synchronized branch pushes.',
    href: 'https://github.com/MannuVilasara/git-auto',
    createdAt: 'Jul 2025',
    description:
      'A lightweight terminal utility that standardizes commit messages according to conventional commit specifications. Guides developers through staged changes, prompts for concise semantic scopes, and pushes cleanly with a single command.',
    longDescription:
      'Inconsistent commit messages break automated semantic changelog tools. git-auto inspects `git status`, guides developers through interactive prompts for types (feat, fix, refactor), validates message lengths, and handles the atomic commit-and-push sequence reliably.',
    features: [
      'Interactive terminal prompt enforcing Conventional Commits syntax',
      'Automated staging, diff inspection, and atomic push execution',
      'Zero-dependency executable with cross-platform terminal support',
      'Significantly reduces commit linting rejections in CI pipelines',
    ],
    architectureHighlights: [
      'Written in TypeScript and compiled into a standalone Node CLI binary',
      'Direct integration with local git child processes and stdin',
      'Configurable prompt templates for custom repository standards',
    ],
    badge: ['TypeScript', 'Node.js', 'Git', 'CLI'],
    category: 'CLI & Tooling',
    featured: false,
  },
  {
    id: 8,
    title: 'Auto-Labeler',
    tagline: 'Filepath-driven pull request triage and automated labeling GitHub Action.',
    href: 'https://github.com/MannuVilasara/auto-labeler',
    createdAt: 'Jul 2025',
    description:
      'A reusable GitHub Action that analyzes incoming pull request file diffs and automatically applies semantic labels (e.g. backend, ui, docs, infra). Helps teams maintain clean triage workflows without manual maintainer intervention.',
    longDescription:
      'Manual triage of pull requests creates maintainer fatigue. Auto-Labeler parses repository diffs against a simple `.github/labeler.yml` rule file, querying changed file paths using micromatch patterns and applying GitHub labels via Octokit REST API.',
    features: [
      'Configurable YAML pattern matching for paths and file types',
      'Instant PR classification on open, synchronize, or reopened triggers',
      'Minimal permission footprint using standard GitHub tokens',
      'Detailed step logs for auditing triage decisions',
    ],
    architectureHighlights: [
      'GitHub Action runner written in TypeScript with `@actions/core` and `@actions/github`',
      'Glob matching algorithm with sub-millisecond evaluation speed',
      'Idempotent label additions avoiding redundant API calls',
    ],
    badge: ['TypeScript', 'GitHub Actions', 'Node.js'],
    category: 'Platform & Infra',
    featured: false,
  },
  {
    id: 6,
    title: 'Fit-Ai',
    tagline: 'Symptom analysis prototype powered by machine learning and Gemini API.',
    href: 'https://github.com/MannuVilasara/disease-detector',
    createdAt: 'Jun 2025',
    description:
      'An exploratory healthcare triage interface that translates patient symptom descriptions into probable condition assessments. Built as a rapid prototype using Streamlit and Gemini API to experiment with structured medical inference.',
    longDescription:
      'An experimental project exploring how LLMs can assist preliminary healthcare inquiries without replacing clinical diagnosis. Combines structured symptom prompts with the Gemini API to output probable health condition vectors and advisory next steps.',
    features: [
      'Natural language symptom parsing with Gemini LLM integration',
      'Preliminary condition triage matrix and severity breakdown',
      'Interactive parameter sliders for onset duration and intensity',
      'Streamlined prototype workflow deployed with Streamlit',
    ],
    architectureHighlights: [
      'Streamlit reactive Python interface with minimal UI overhead',
      'Structured prompt engineering for deterministic medical triage output',
      'API rate-limit handling and safe input sanitization',
    ],
    badge: ['Python', 'Streamlit', 'Gemini API', 'Machine Learning'],
    category: 'CLI & Tooling',
    featured: false,
  },
];

export { projects };
