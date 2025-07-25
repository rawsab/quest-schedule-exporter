"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const StickyHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[#0A0A0A]/80 border-b border-[#232323]"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ minHeight: 64 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 h-16">
        {/* Left: Logo and Questporter */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo/LogoDark.png"
            alt="Questporter Logo"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="text-md font-medium select-none">
            <span style={{ color: "#E5E5E5" }}>Quest</span>
            <span style={{ color: "#ABABAB" }}>porter</span>
          </span>
        </div>
        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Login pill */}
          <a
            href="https://quest.pecs.uwaterloo.ca/psp/SS/?cmd=login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-[642px]:flex items-center bg-[rgba(38,38,38,0.5)] rounded-full px-3 py-1.5 gap-2 mr-1 hover:bg-[#333] transition-colors cursor-pointer"
          >
            <span className="text-[#E5E5E5] font-medium text-xs">Login to UWaterloo Quest</span>
            <img src="/icons/open_link.svg" alt="Open link" height={12} style={{ height: 12, width: 'auto' }} draggable={false} />
          </a>
          {/* GitHub button */}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-[#232323] transition-colors"
          >
            <img src="/icons/github_dark.svg" alt="GitHub" height={16} style={{ height: 16, width: "auto" }} draggable={false} />
            <span className="text-[#E5E5E5] font-medium text-sm">GitHub</span>
          </a>
          {/* Divider */}
          <div className="h-5 w-px bg-[#2D2D2D] mx-0" />
          {/* Dark mode toggle with tooltip */}
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-md hover:bg-[#232323] transition-colors cursor-pointer">
                  <img src="/icons/dark_mode_toggle.svg" alt="Toggle dark mode" height={16} style={{ height: 16, width: 'auto' }} draggable={false} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center" className="text-xs font-medium">
                Light mode coming soon!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader; 