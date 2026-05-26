import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export interface ProjectCardProps {
  id?: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  createdAt?: string;
  features?: string[];
  delay?: number;
}

// Stagger variants for modal content
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const ProjectCard = ({
  title,
  description,
  longDescription,
  image,
  tags,
  link,
  github,
  createdAt,
  features,
  delay = 0,
}: ProjectCardProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Determine current theme to avoid hydration mismatch
  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'dark';
  const isDark = currentTheme === 'dark';

  const displayImage = image || 'https://via.placeholder.com/800x450?text=Project+Showcase';

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [modalOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay * 0.1, ease: 'easeOut' }}
        onClick={() => setModalOpen(true)}
        className="group relative flex flex-col h-full cursor-pointer"
      >
        {/* Animated Gradient Border Layer */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        {/* Main Card Content */}
        <div
          className={`relative flex flex-col h-full rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-[#0f0f11]/80 hover:border-white/20' : 'border-black/5 bg-white/80 hover:border-black/15'} backdrop-blur-xl p-5 transition-all duration-300 group-hover:-translate-y-1 shadow-lg ${isDark ? 'shadow-black/50' : 'shadow-black/5'}`}
        >
          {/* Image Container */}
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-black/5">
            <AnimatePresence mode="wait">
              {!imageLoaded && (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 ${isDark ? 'bg-white/5' : 'bg-black/5'} animate-pulse`}
                />
              )}
            </AnimatePresence>
            <img
              src={displayImage}
              alt={title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
              }`}
            />
            {/* Overlay Gradient on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {createdAt && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <Calendar size={12} />
                {createdAt}
              </div>
            )}
          </div>

          <div className="flex flex-col grow">
            <h3
              className={`text-2xl font-bold font-['Oswald'] tracking-wide ${isDark ? 'text-white' : 'text-zinc-900'} mb-3 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-2`}
            >
              {title}
            </h3>
            <p
              className={`${isDark ? 'text-zinc-400' : 'text-zinc-600'} font-['JetBrains_Mono'] text-sm leading-relaxed mb-6 grow line-clamp-3`}
            >
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-semibold px-2.5 py-1 ${isDark ? 'bg-white/5 border-white/10 text-zinc-300' : 'bg-black/5 border-black/10 text-zinc-700'} border rounded-md whitespace-nowrap tracking-wide`}
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 ${isDark ? 'bg-blue-400/10 border-blue-400/20 text-blue-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-600'} border rounded-md whitespace-nowrap`}
                >
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Beautiful Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalOpen(false)}
          >
            {/* Backdrop with blur and slight tint */}
            <div
              className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-zinc-900/40'} backdrop-blur-md`}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl border ${isDark ? 'border-white/10 bg-[#0a0a0c]' : 'border-black/5 bg-[#fafafa]'} shadow-2xl flex flex-col md:flex-row`}
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className={`absolute top-4 right-4 z-20 p-2.5 rounded-full ${isDark ? 'bg-black/50 hover:bg-white/10 text-white' : 'bg-white/50 hover:bg-black/5 text-black'} backdrop-blur-md transition-all cursor-pointer`}
              >
                <X size={20} />
              </button>

              {/* Left Column - Image */}
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-full relative overflow-hidden bg-black/10 shrink-0">
                <img src={displayImage} alt={title} className="w-full h-full object-cover" />
                <div
                  className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${isDark ? 'from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent' : 'from-[#fafafa] via-[#fafafa]/40 to-transparent'}`}
                />
              </div>

              {/* Right Column - Content */}
              <div className="p-8 md:p-10 w-full md:w-1/2 flex flex-col">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col h-full"
                >
                  <motion.div variants={itemVariants} className="mb-2">
                    <h2
                      className={`text-3xl md:text-4xl font-bold font-['Oswald'] ${isDark ? 'text-white' : 'text-zinc-900'} tracking-wide`}
                    >
                      {title}
                    </h2>
                  </motion.div>

                  {createdAt && (
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-2 text-sm font-['JetBrains_Mono'] text-blue-500 mb-6 font-medium"
                    >
                      <Calendar size={14} />
                      {createdAt}
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants} className="mb-8">
                    <p
                      className={`${isDark ? 'text-zinc-400' : 'text-zinc-600'} text-base leading-relaxed`}
                    >
                      {longDescription || description}
                    </p>
                  </motion.div>

                  {features && features.length > 0 && (
                    <motion.div variants={itemVariants} className="mb-8">
                      <h4
                        className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-zinc-200' : 'text-zinc-800'} mb-4 flex items-center gap-2`}
                      >
                        <Sparkles size={16} className="text-blue-400" /> Key Features
                      </h4>
                      <ul className="space-y-3">
                        {features.map((feature, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'} text-sm`}
                          >
                            <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs font-semibold px-3 py-1.5 ${isDark ? 'bg-white/5 border-white/10 text-zinc-300' : 'bg-black/5 border-black/10 text-zinc-700'} border rounded-lg`}
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-auto pt-6">
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-bold font-['Oswald'] rounded-xl transition-all tracking-wide group"
                      >
                        LIVE DEMO
                        <ExternalLink
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </a>
                    )}
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white border-white/10' : 'bg-black/5 hover:bg-black/10 text-black border-black/10'} border font-bold font-['Oswald'] rounded-xl transition-all tracking-wide`}
                      >
                        <FaGithub size={16} />
                        SOURCE
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
