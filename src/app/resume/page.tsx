"use client";

import { useEffect } from "react";

export default function ResumePage() {
  useEffect(() => {
    // Hide the layout's scrollbar so we only see the PDF's scrollbar
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-zinc-100 dark:bg-zinc-900">
      <iframe
        src="/resume.pdf"
        className="w-full h-full border-0"
        title="Resume PDF"
      />
    </div>
  );
}
