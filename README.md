# Portfolio Website - Manpreet Singh

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features real-time Discord status, GitHub activity, blog posts, and project showcases.

## ✨ Features

- **Modern Design**: Clean, responsive UI with dark/light theme support
- **Real-time Status**: Live Discord status and Spotify now playing integration
- **Blog System**: MDX-powered blog with syntax highlighting
- **Project Showcase**: Dynamic project gallery with live links
- **GitHub Integration**: Latest commit activity and GitHub calendar
- **Contact Form**: Direct messaging system
- **Auto-labeling**: GitHub Actions workflow for PR auto-labeling
- **Performance Optimized**: Built with Next.js 15 and Turbopack

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Tabler Icons, React Icons, Lucide React
- **Theme**: next-themes for dark/light mode

### Backend & APIs

- **API Routes**: Next.js API routes
- **Data Fetching**: SWR for real-time updates
- **Form Handling**: React Hook Form with Zod validation
- **Content**: MDX for blog posts

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint 9
- **Formatting**: Prettier
- **Type Checking**: TypeScript 5
- **Build Tool**: Turbopack

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/MannuVilasara/me.git
cd me
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your environment variables:

```env
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
DISCORD_WEBHOOK_URL=
GITHUB_TOKEN=

# Other API keys as needed
```

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🛠️ Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 📁 Project Structure

```text
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects page
│   └── about/             # About page
├── components/            # React components
│   ├── ui/                # Shadcn/ui components
│   └── myComponents/      # Custom components
├── content/               # MDX blog posts
├── data/                  # Static data files
├── lib/                   # Utility functions
└── styles/                # Global styles
```

## 🎨 Key Components

- **Activities**: Real-time GitHub activity feed
- **Discord**: Live Discord status integration
- **NowPlaying**: Spotify currently playing track
- **MessageBox**: Contact form with validation
- **TechStack**: Animated technology showcase
- **ProgressBar**: Page loading indicator

## 🌐 API Endpoints

- `/api/get-discord-status` - Fetch Discord user status
- `/api/latest-commit` - Get latest GitHub commit
- `/api/now-playing` - Spotify currently playing
- `/api/send-message` - Contact form submission

## 📝 Content Management

Blog posts are written in MDX format and stored in the `src/content/` directory. Each post includes:

- Frontmatter metadata
- Syntax highlighting with Shiki
- Custom MDX components
- Automatic sitemap generation

## 🔧 Customization

1. **Personal Information**: Update `src/data/metadata.ts`
1. **Projects**: Modify `src/data/projects.ts`
1. **Tech Stack**: Edit `src/data/techstack.tsx`
1. **Styling**: Customize Tailwind config and global styles
1. **Components**: Add or modify components in `src/components/`

## 🚀 Deployment

The site is optimized for deployment on Vercel:

1. Push to GitHub
1. Connect repository to Vercel
1. Configure environment variables
1. Deploy automatically on push to main branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MannuVilasara/me)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. The repository includes auto-labeling for PRs via GitHub Actions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Site**: [https://mannu.live](https://mannu.live)
- **GitHub**: [@MannuVilasara](https://github.com/MannuVilasara)
- **Twitter**: [@dev_mannuu](https://twitter.com/dev_mannuu)

---

**Built with ❤️ by [Manpreet Singh](https://mannu.live)**

[⭐ Star this repo](https://github.com/MannuVilasara/me/stargazers) • [🐛 Report Bug](https://github.com/MannuVilasara/me/issues) • [💡 Request Feature](https://github.com/MannuVilasara/me/issues)
