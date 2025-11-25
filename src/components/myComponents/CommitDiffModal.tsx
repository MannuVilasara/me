'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  X,
  Github,
  FileDiff,
  GitCommit,
  ChevronRight,
  ChevronDown,
  FileCode,
  Loader2,
} from 'lucide-react';

interface CommitDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  diff: string | null;
  loading: boolean;
  error: string | null;
  commitSha: string;
  commitMessage: string;
  files?: Array<{
    filename: string;
    status: string;
    additions: number;
    deletions: number;
  }>;
  commitUrl?: string;
}

export function CommitDiffModal({
  isOpen,
  onClose,
  diff,
  loading,
  error,
  commitSha,
  commitMessage,
  files = [],
  commitUrl,
}: CommitDiffModalProps) {
  // State to track which files are expanded
  const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>({});

  // Reset state when modal opens/closes or commit changes
  useEffect(() => {
    if (isOpen) {
      setExpandedFiles({});
    }
  }, [isOpen, commitSha]);

  const toggleFile = (filename: string) => {
    setExpandedFiles((prev) => ({
      ...prev,
      [filename]: !prev[filename],
    }));
  };

  // Logic to split the giant diff string into file-specific chunks
  const fileDiffs = useMemo(() => {
    if (!diff) return {};

    // Split by the git diff header
    const chunks = diff.split('diff --git ');
    const diffMap: Record<string, string> = {};

    chunks.forEach((chunk) => {
      if (!chunk.trim()) return;

      // Attempt to extract the filename from the first line of the chunk
      // Header usually looks like: a/path/to/file.ts b/path/to/file.ts
      const firstLine = chunk.split('\n')[0];

      // We look for our known filenames in this header line
      // This is a naive but effective matching strategy for this context
      const matchedFile = files.find((f) => firstLine.includes(f.filename));

      if (matchedFile) {
        diffMap[matchedFile.filename] = `diff --git ${chunk}`; // Add back the separator we split by
      }
    });

    return diffMap;
  }, [diff, files]);

  if (!isOpen) return null;

  const totalAdditions = files.reduce((acc, file) => acc + file.additions, 0);
  const totalDeletions = files.reduce((acc, file) => acc + file.deletions, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-background border border-border rounded-xl shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="flex items-start justify-between p-5 border-b border-border bg-muted/20 shrink-0">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-xs font-mono text-foreground/80 border border-border">
                <GitCommit size={14} />
                {commitSha.substring(0, 7)}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-green-600 font-medium">+{totalAdditions}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-red-600 font-medium">-{totalDeletions}</span>
              </span>
            </div>
            <h3 className="text-lg font-semibold leading-tight truncate" title={commitMessage}>
              {commitMessage}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {commitUrl && (
              <a
                href={commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                title="View on GitHub"
              >
                <Github size={20} />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground"
              title="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto bg-muted/5">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
              <Loader2 size={32} className="animate-spin text-primary" />
              <span className="text-sm font-medium">Loading commit details...</span>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-red-500 gap-2">
              <FileDiff size={32} />
              <p className="font-medium">Error loading diff</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {/* File Accordion List */}
              {files.map((file, index) => {
                const isExpanded = expandedFiles[file.filename];
                const currentDiff = fileDiffs[file.filename];

                return (
                  <div
                    key={index}
                    className="border border-border rounded-lg bg-background shadow-sm overflow-hidden transition-all duration-200"
                  >
                    {/* Accordion Header - Clickable */}
                    <button
                      onClick={() => toggleFile(file.filename)}
                      className={`w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left group ${isExpanded ? 'bg-muted/30 border-b border-border' : ''}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {isExpanded ? (
                          <ChevronDown size={16} className="text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                        )}

                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            file.status === 'added'
                              ? 'bg-green-500'
                              : file.status === 'removed'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                          }`}
                        />

                        <span className="font-mono text-sm font-medium truncate text-foreground/90 group-hover:text-primary transition-colors">
                          {file.filename}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-medium shrink-0 ml-4">
                        {file.additions > 0 && (
                          <span className="text-green-600">+{file.additions}</span>
                        )}
                        {file.deletions > 0 && (
                          <span className="text-red-600">-{file.deletions}</span>
                        )}
                      </div>
                    </button>

                    {/* Accordion Content - Slides open */}
                    {isExpanded && (
                      <div className="animate-in slide-in-from-top-2 duration-200">
                        {currentDiff ? (
                          <div className="bg-[#0d1117] overflow-x-auto">
                            <pre className="font-mono text-xs leading-[1.6] p-4 text-gray-300 min-w-max">
                              {currentDiff.split('\n').map((line, i) => {
                                // Diff Parsing Logic
                                if (line.startsWith('diff --git') || line.startsWith('index ')) {
                                  // Hide redundant header info inside the accordion
                                  return null;
                                }

                                if (line.startsWith('@@')) {
                                  return (
                                    <div
                                      key={i}
                                      className="text-blue-400 bg-blue-500/10 py-1 my-1 px-2 rounded border-l-2 border-blue-500"
                                    >
                                      {line}
                                    </div>
                                  );
                                }
                                if (line.startsWith('+') && !line.startsWith('+++')) {
                                  return (
                                    <div
                                      key={i}
                                      className="bg-green-500/10 text-green-400 block w-full px-2 border-l-2 border-green-500"
                                    >
                                      {line}
                                    </div>
                                  );
                                }
                                if (line.startsWith('-') && !line.startsWith('---')) {
                                  return (
                                    <div
                                      key={i}
                                      className="bg-red-500/10 text-red-400 block w-full px-2 border-l-2 border-red-500"
                                    >
                                      {line}
                                    </div>
                                  );
                                }
                                if (line.startsWith('+++') || line.startsWith('---')) {
                                  // Skip file markers as we already know the file
                                  return null;
                                }

                                return (
                                  <div key={i} className="px-2.5 opacity-60">
                                    {line}
                                  </div>
                                );
                              })}
                            </pre>
                          </div>
                        ) : (
                          <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                            <FileCode size={24} className="opacity-50" />
                            <span>Binary file or no text changes detected.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
