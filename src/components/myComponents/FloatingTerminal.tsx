'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Type Definitions ---
type HistoryItem = {
  type: 'command' | 'output' | 'error' | 'success';
  content: React.ReactNode;
};

// --- Mock File System ---
const fileSystem: Record<string, string> = {
  'about.txt': `Hi! I'm Manpreet Singh, also known as Mannu Vilasara.

I'm a passionate Full Stack Developer from India with a love for creating beautiful and functional web applications. I specialize in modern web technologies and enjoy turning ideas into reality through code.

When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing my knowledge with the developer community.

Currently focused on building scalable web applications and learning about system design and cloud technologies.`,
  'skills.md': `# Technical Skills

## Frontend
- **React** - Advanced proficiency with hooks, context, and modern patterns
- **Next.js** - Full-stack framework with App Router, SSR, and API routes
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library

## Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **REST APIs** - API design and development
- **Database Design** - SQL and NoSQL databases

## Tools & Technologies
- **Git** - Version control
- **VS Code** - Primary IDE
- **Linux** - Development environment
- **Docker** - Containerization
- **Vercel** - Deployment platform

## Learning
- **Go** - Concurrent programming
- **AWS/Azure** - Cloud platforms
- **System Design** - Scalable architecture patterns`,
  'contact.json': `{
  "name": "Manpreet Singh",
  "alias": "MannuVilasara",
  "email": "mannuvilasara@gmail.com",
  "github": "https://github.com/MannuVilasara",
  "twitter": "https://twitter.com/dev_mannuu",
  "website": "https://mannu.live",
  "discord": "dev_mannu",
  "location": "India",
  "timezone": "IST (UTC+5:30)",
  "status": "Available for opportunities"
}`,
  'secrets.env': `Error: Permission denied. You need to be Manpreet to read this.`,
};

export default function FloatingTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      type: 'output',
      content: (
        <div className="space-y-1">
          <p>Welcome to MannuShell v1.0.0 🚀</p>
          <p className="text-muted-foreground">
            Type <span className="text-green-400 font-bold">'help'</span> to see available commands.
          </p>
        </div>
      ),
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [suggestionType, setSuggestionType] = useState<'command' | 'file'>('command');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isOpen]);

  // Focus input on click
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (cmdStr: string) => {
    const trimmedCmd = cmdStr.trim();
    if (!trimmedCmd) return;

    // Add command to history
    const newHistory: HistoryItem[] = [...history, { type: 'command', content: trimmedCmd }];

    const args = trimmedCmd.split(' ');
    const cmd = args[0].toLowerCase();
    const arg = args[1];

    // Process Commands
    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className="grid grid-cols-1 gap-1">
              <span className="text-yellow-400 font-bold mb-1">Available commands:</span>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-green-400">ls</span>
                <span>List directory contents</span>

                <span className="text-green-400">cat [file]</span>
                <span>Read a file (e.g., cat about.txt)</span>

                <span className="text-green-400">whoami</span>
                <span>Display current user info</span>

                <span className="text-green-400">date</span>
                <span>Show current time</span>

                <span className="text-green-400">fastfetch</span>
                <span>Display system information</span>

                <span className="text-green-400">clear</span>
                <span>Clear the terminal screen</span>
              </div>
            </div>
          ),
        });
        break;

      case 'ls':
        newHistory.push({
          type: 'success',
          content: (
            <div className="flex gap-4 flex-wrap">
              {Object.keys(fileSystem).map((file) => (
                <span
                  key={file}
                  className={file.endsWith('.env') ? 'text-red-400' : 'text-blue-400'}
                >
                  {file}
                </span>
              ))}
            </div>
          ),
        });
        break;

      case 'cat':
        if (!arg) {
          newHistory.push({ type: 'error', content: 'Usage: cat [filename]' });
        } else if (fileSystem[arg]) {
          newHistory.push({
            type: 'output',
            content: (
              <pre className="whitespace-pre-wrap font-mono text-zinc-300">{fileSystem[arg]}</pre>
            ),
          });
        } else {
          newHistory.push({ type: 'error', content: `cat: ${arg}: No such file or directory` });
        }
        break;

      case 'whoami':
        newHistory.push({ type: 'output', content: 'guest_user@mannu.live' });
        break;

      case 'date':
        newHistory.push({ type: 'output', content: new Date().toString() });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        setSuggestions([]);
        setSelectedSuggestion(-1);
        setSuggestionType('command');
        return;

      case 'fastfetch':
        newHistory.push({
          type: 'output',
          content: (
            <div className="font-mono text-sm flex gap-8">
              {/* {/* ASCII Art - Cowsay Style */}
              {/* prettier-ignore */}
              {/* <div className="text-cyan-400 hidden md:block leading-none font-mono">
                <div className="mb-1"> ________</div>
                <div className="mb-1">&lt; mannu &gt;</div>
                <div className="mb-1"> --------</div>
                <div className="mb-1">        \   ^__^</div>
                <div className="mb-1">         \  (oo)\_______</div>
                <div className="mb-1">            (__)\       )\</div>
                <div className="mb-1">                ||----w |</div>
                <div className="mb-1">                ||     ||</div>
              </div> */}
              {/* System Info */}
              <div className="space-y-1 flex-1">
                <div className="text-cyan-400 font-bold">guest@mannu.live</div>
                <div className="text-zinc-400">────────────────────────</div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-blue-400">OS:</span>
                  <span>Linux (Arch-based)</span>

                  <span className="text-blue-400">Kernel:</span>
                  <span>6.6.1-arch1-1</span>

                  <span className="text-blue-400">Uptime:</span>
                  <span>2 hours, 34 mins</span>

                  <span className="text-blue-400">Packages:</span>
                  <span>127 (pacman)</span>

                  <span className="text-blue-400">Shell:</span>
                  <span>MannuShell v1.0.0</span>

                  <span className="text-blue-400">Resolution:</span>
                  <span>1920x1080</span>

                  <span className="text-blue-400">WM:</span>
                  <span>React DOM</span>

                  <span className="text-blue-400">Terminal:</span>
                  <span>mannu.live</span>

                  <span className="text-blue-400">CPU:</span>
                  <span>Intel Core i7-13620H (14) @ 2.5GHz</span>

                  <span className="text-blue-400">GPU:</span>
                  <span>NVIDIA GeForce RTX 4060</span>

                  <span className="text-blue-400">Memory:</span>
                  <span>8GB / 16GB</span>
                </div>
                <div className="text-zinc-400 mt-2">────────────────────────</div>
                <div className="text-green-400">
                  <span className="text-red-400">██</span>
                  <span className="text-yellow-400">██</span>
                  <span className="text-green-400">██</span>
                  <span className="text-cyan-400">██</span>
                  <span className="text-blue-400">██</span>
                  <span className="text-magenta-400">██</span>
                </div>
              </div>
            </div>
          ),
        });
        break;

      case 'exit':
      case 'q':
        setIsOpen(false);
        setHistory([]);
        setInput('');
        setSuggestions([]);
        setSelectedSuggestion(-1);
        setSuggestionType('command');
        return;

      default:
        newHistory.push({
          type: 'error',
          content: `Command not found: ${cmd}. Type 'help' for options.`,
        });
    }

    setHistory(newHistory);
    setInput('');
    setSuggestions([]);
    setSelectedSuggestion(-1);
    setSuggestionType('command');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (selectedSuggestion >= 0 && suggestions.length > 0) {
        if (suggestionType === 'command') {
          setInput(suggestions[selectedSuggestion]);
        } else {
          const parts = input.split(' ');
          parts[parts.length - 1] = suggestions[selectedSuggestion];
          setInput(parts.join(' '));
        }
        setSuggestions([]);
        setSelectedSuggestion(-1);
        setSuggestionType('command');
      } else {
        handleCommand(input);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed.startsWith('cat ')) {
        const files = Object.keys(fileSystem);
        if (suggestions.length === 0) {
          setSuggestions(files);
          setSelectedSuggestion(0);
          setSuggestionType('file');
        } else {
          setSelectedSuggestion((selectedSuggestion + 1) % suggestions.length);
        }
      } else {
        const commands = [
          'help',
          'ls',
          'cat',
          'whoami',
          'date',
          'clear',
          'sudo',
          'exit',
          'fastfetch',
        ];
        const filtered = commands.filter((cmd) => cmd.toLowerCase().includes(input.toLowerCase()));
        if (filtered.length > 0) {
          if (suggestions.length === 0) {
            setSuggestions(filtered);
            setSelectedSuggestion(0);
            setSuggestionType('command');
          } else {
            setSelectedSuggestion((selectedSuggestion + 1) % suggestions.length);
          }
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion((selectedSuggestion + 1) % suggestions.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion((selectedSuggestion - 1 + suggestions.length) % suggestions.length);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedSuggestion(-1);
      setSuggestionType('command');
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95',
          'bg-black text-white dark:bg-white dark:text-black border-2 border-transparent hover:border-zinc-500'
        )}
        aria-label="Open Terminal"
      >
        <Terminal className="w-6 h-6" />
      </button>

      {/* Terminal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-zinc-700 flex flex-col font-mono text-sm h-[500px]">
            {/* macOS-style Header */}
            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-zinc-700 select-none">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"
                  title="Close"
                />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors" />
              </div>
              <div className="text-zinc-400 text-xs font-medium flex items-center gap-1.5">
                <Terminal size={12} />
                <span>guest@mannu.live:~</span>
              </div>
              <div className="w-10" /> {/* Spacer for centering */}
            </div>

            {/* Terminal Body */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-2 text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, i) => (
                <div key={i} className="leading-relaxed">
                  {item.type === 'command' ? (
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">➜</span>
                      <span className="text-cyan-400 font-bold">~</span>
                      <span className="text-zinc-100">{item.content}</span>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'ml-6 mb-2',
                        item.type === 'error' ? 'text-red-400' : 'text-zinc-300'
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">➜</span>
                <span className="text-cyan-400 font-bold">~</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (suggestions.length > 0) {
                        if (suggestionType === 'command') {
                          const commands = [
                            'help',
                            'ls',
                            'cat',
                            'whoami',
                            'date',
                            'clear',
                            'sudo',
                            'exit',
                            'fastfetch',
                          ];
                          const filtered = commands.filter((cmd) =>
                            cmd.toLowerCase().includes(e.target.value.toLowerCase())
                          );
                          setSuggestions(filtered);
                          if (filtered.length === 0) {
                            setSelectedSuggestion(-1);
                          } else if (selectedSuggestion >= filtered.length) {
                            setSelectedSuggestion(0);
                          }
                        } else if (suggestionType === 'file') {
                          const lastWord = e.target.value.split(' ').pop() || '';
                          const files = Object.keys(fileSystem).filter((file) =>
                            file.toLowerCase().includes(lastWord.toLowerCase())
                          );
                          setSuggestions(files);
                          if (files.length === 0) {
                            setSelectedSuggestion(-1);
                          } else if (selectedSuggestion >= files.length) {
                            setSelectedSuggestion(0);
                          }
                        }
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-600"
                    placeholder="Type a command..."
                    title="Terminal command input"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="ml-6 mt-1 space-y-1">
                  {suggestions.map((sug, i) => (
                    <div
                      key={sug}
                      className={cn(
                        'text-xs cursor-pointer px-2 py-1 rounded',
                        i === selectedSuggestion
                          ? 'bg-zinc-600 text-zinc-100'
                          : 'text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300'
                      )}
                      onClick={() => {
                        if (suggestionType === 'command') {
                          setInput(sug);
                        } else {
                          const parts = input.split(' ');
                          parts[parts.length - 1] = sug;
                          setInput(parts.join(' '));
                        }
                        setSuggestions([]);
                        setSelectedSuggestion(-1);
                        setSuggestionType('command');
                      }}
                    >
                      {sug}
                    </div>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
