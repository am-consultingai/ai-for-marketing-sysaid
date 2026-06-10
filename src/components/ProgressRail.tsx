/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

interface ProgressRailProps {
  sections: { id: string; label: string }[];
}

export default function ProgressRail({ sections }: ProgressRailProps) {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      // Determine active section
      let currentSection = "";
      for (const sect of sections) {
        const el = document.getElementById(sect.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // We mark as active if the section top occupies prime reading space on screen
          if (rect.top <= window.innerHeight * 0.4) {
            currentSection = sect.id;
          }
        }
      }
      setActiveSection(currentSection || sections[0]?.id || "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4 bg-white/80 dark:bg-brand-ink/40 backdrop-blur-md px-3 py-6 rounded-full border border-brand-line/60 shadow-lg"
      id="progress-rail"
      role="navigation"
      aria-label="Progress Rail"
    >
      {/* Scroll indicator line */}
      <div className="absolute top-4 bottom-4 w-[2px] bg-brand-line/40 rounded-full overflow-hidden">
        <div 
          className="w-full bg-brand-primary" 
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {sections.map((sect) => (
        <button
          key={sect.id}
          onClick={() => scrollToSection(sect.id)}
          className="relative group w-4 h-4 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 z-10"
          aria-label={`Scroll to ${sect.label}`}
          title={sect.label}
        >
          <span 
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === sect.id 
                ? "bg-brand-primary scale-125 ring-4 ring-brand-primary/20" 
                : "bg-brand-line group-hover:bg-brand-primary/60 scale-100"
            }`}
          />
          {/* Label tooltip on hover */}
          <span className="absolute right-7 py-1 px-3.5 bg-brand-ink text-white text-xs font-medium rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-md">
            {sect.label}
          </span>
        </button>
      ))}
    </div>
  );
}
