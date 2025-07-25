"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { InstructionSquare } from "../components/InstructionSquare";
import { StickyHeader } from "../components/StickyHeader";
import InputForm from "../components/InputForm";
import PlaceholderInfo from "../components/PlaceholderInfo";
import CalendarIconDisplay from "../components/CalendarIconDisplay";
import Footer from "../components/Footer";

export default function Home() {
  // Animation state for glowing and fading icons
  const [glowIndex, setGlowIndex] = useState(-1);
  const [fadeIndex, setFadeIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverFadeIndex, setHoverFadeIndex] = useState<number | null>(null);
  const [modifierKey, setModifierKey] = useState('⌘');
  const [atBottom, setAtBottom] = useState(false);
  const inputFormRef = useRef<HTMLDivElement>(null);
  const [showDownArrow, setShowDownArrow] = useState(false);

  // Helper for fade duration (should match CSS)
  const FADE_DURATION = 1100;

  useEffect(() => {
    let current = 0;
    let glowTimeout: NodeJS.Timeout;
    let fadeTimeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    const squaresCount = 4;
    const glowDuration = 900;
    const fadeDuration = 1100; // match CSS transition
    const delayBetween = 0;

    function loop() {
      setGlowIndex(current);
      setFadeIndex(-1);
      glowTimeout = setTimeout(() => {
        setGlowIndex(-1);
        setFadeIndex(current);
        fadeTimeout = setTimeout(() => {
          setFadeIndex(-1);
          current = (current + 1) % squaresCount;
          interval = setTimeout(loop, delayBetween);
        }, fadeDuration); // fade duration matches CSS
      }, glowDuration); // Glow stays active
    }
    loop();
    return () => {
      clearTimeout(glowTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(interval);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const platform = window.navigator.platform.toLowerCase();
      if (platform.includes('mac')) {
        setModifierKey('⌘');
      } else if (platform.includes('win')) {
        setModifierKey('Ctrl');
      } else {
        setModifierKey('Ctrl');
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setAtBottom(scrollY + windowHeight >= docHeight - 2);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function checkInputFormPosition() {
      if (!inputFormRef.current) return;
      const rect = inputFormRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // InputForm is completely in lower half if its top is below window/2 and its bottom is below window/2
      const inLowerHalf = rect.top >= windowHeight / 2 && rect.bottom > windowHeight / 2;
      setShowDownArrow(inLowerHalf);
    }
    window.addEventListener("scroll", checkInputFormPosition);
    window.addEventListener("resize", checkInputFormPosition);
    checkInputFormPosition();
    return () => {
      window.removeEventListener("scroll", checkInputFormPosition);
      window.removeEventListener("resize", checkInputFormPosition);
    };
  }, []);

  function handleArrowClick() {
    if (!inputFormRef.current) return;
    const header = document.querySelector("header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const formTop = inputFormRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: formTop - headerHeight - 16, // 16px for spacing
      behavior: "smooth",
    });
  }

  return (
    <>
      <StickyHeader />
      <div className="h-[20px]"></div>
      <div className="font-sans min-h-screen p-8 pb-10 sm:p-20 relative overflow-hidden">
        {/* Foreground content goes here */}
        <div className="relative z-10 flex flex-col items-center pt-24">
          {/* Logo and gradient overlay, absolutely positioned behind tagline and subtext */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-[180px] h-[180px] pointer-events-none select-none z-0">
            <Image
              src="/logo/LogoDark.png"
              alt="App Logo"
              width={180}
              height={180}
              priority
              className="z-10 opacity-80"
            />
            <div
              className="absolute top-0 left-0 w-full h-full z-20"
              style={{
                background: "linear-gradient(to bottom, rgba(10,10,10,0.15), rgba(10,10,10,0.66), rgba(10,10,10,0.9), rgba(10,10,10,1), rgba(10,10,10,1))"
              }}
            />
          </div>
          <div className="relative z-10 w-[90vw] max-w-4xl flex flex-col items-center">
            <h1 className="text-2xl sm:text-[2.5rem] font-medium text-center drop-shadow-lg" style={{ color: '#E5E5E5' }}>
              Export your Quest schedule in seconds.
            </h1>
            <div className="mt-4">
              <p className="text-base sm:text-md font-regular text-center" style={{ color: '#C9C9C9' }}>
                Go to Quest&nbsp;&nbsp;›&nbsp;&nbsp;Class Schedule&nbsp;&nbsp;›&nbsp;&nbsp;Choose Term&nbsp;&nbsp;›&nbsp;&nbsp;Press “Continue”&nbsp;&nbsp;›&nbsp;&nbsp;List View
              </p>
            </div>
          </div>
          {/* Add your main content here */}
          <div className="mt-8 grid grid-cols-4 gap-6 max-w-[712px] mx-0 [@media(max-width:800px)]:grid-cols-2">
            <InstructionSquare
              primary={`${modifierKey} + A`}
              secondary="Select Quest page."
              iconSrc="/icons/select_dark.svg"
              glow={glowIndex === 0}
              fade={(fadeIndex === 0 && hoveredIndex !== 0) || hoverFadeIndex === 0}
              forceGlow={hoveredIndex === 0}
              onMouseEnter={() => {
                setHoveredIndex(0);
                setHoverFadeIndex(null);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setHoverFadeIndex(0);
                setTimeout(() => setHoverFadeIndex(null), FADE_DURATION);
              }}
            />
            <InstructionSquare
              primary={`${modifierKey} + C`}
              secondary="Copy to clipboard."
              iconSrc="/icons/clipboard_dark.svg"
              glow={glowIndex === 1}
              fade={(fadeIndex === 1 && hoveredIndex !== 1) || hoverFadeIndex === 1}
              forceGlow={hoveredIndex === 1}
              onMouseEnter={() => {
                setHoveredIndex(1);
                setHoverFadeIndex(null);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setHoverFadeIndex(1);
                setTimeout(() => setHoverFadeIndex(null), FADE_DURATION);
              }}
            />
            <InstructionSquare
              primary={`${modifierKey} + V`}
              secondary="Paste below."
              iconSrc="/icons/paste_dark.svg"
              glow={glowIndex === 2}
              fade={(fadeIndex === 2 && hoveredIndex !== 2) || hoverFadeIndex === 2}
              forceGlow={hoveredIndex === 2}
              onMouseEnter={() => {
                setHoveredIndex(2);
                setHoverFadeIndex(null);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setHoverFadeIndex(2);
                setTimeout(() => setHoverFadeIndex(null), FADE_DURATION);
              }}
            />
            <InstructionSquare
              primary="Export."
              secondary="Add to calendar."
              iconSrc="/icons/calendar_dark.svg"
              glow={glowIndex === 3}
              fade={(fadeIndex === 3 && hoveredIndex !== 3) || hoverFadeIndex === 3}
              forceGlow={hoveredIndex === 3}
              onMouseEnter={() => {
                setHoveredIndex(3);
                setHoverFadeIndex(null);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setHoverFadeIndex(3);
                setTimeout(() => setHoverFadeIndex(null), FADE_DURATION);
              }}
            />
          </div>
          <div className="mt-10 flex justify-center" ref={inputFormRef}>
            <InputForm />
          </div>
          <div className="mt-12 w-full max-w-[712px] mx-auto flex items-center gap-2 justify-center">
            <img src="/icons/ph_dark.svg" alt="Placeholders" height={20} style={{ height: 20, width: 'auto' }} draggable={false} />
            <span className="text-[#E5E5E5] text-lg font-medium" style={{ fontFamily: 'var(--font-inter-tight, Inter Tight, sans-serif)' }}>Available Placeholders</span>
          </div>
          <div className="mt-6 w-full max-w-[712px] mx-0 grid grid-cols-3 gap-4 [@media(max-width:530px)]:grid-cols-2">
            <PlaceholderInfo top="@code" middle="Course code" bottom="CS 452" />
            <PlaceholderInfo top="@section" middle="Course section number" bottom="001" />
            <PlaceholderInfo top="@name" middle="Course name" bottom="Real-time Programming" />
            <PlaceholderInfo top="@type" middle="Course type" bottom="LEC" />
            <PlaceholderInfo top="@location" middle="Building and room number" bottom="DWE 3522A" />
            <PlaceholderInfo top="@prof" middle="Course instructor" bottom="William B Cowan" />
          </div>
          <div className="mt-20 mb-5">
            <CalendarIconDisplay />
          </div>
          <Footer />
        </div>
      </div>
      {/* Bottom gradient overlay */}
      <div
        className={`fixed bottom-0 left-0 w-full h-40 z-[9999] pointer-events-none select-none transition-opacity duration-500 ${atBottom ? 'opacity-0' : 'opacity-100'}`}
        style={{background: "linear-gradient(to bottom, rgba(10,10,10,0), #0A0A0A 100%)"}}
      />
      {/* Downwards arrow above bottom gradient overlay */}
      <button
        type="button"
        aria-label="Scroll to Input Form"
        onClick={handleArrowClick}
        className={`fixed left-1/2 -translate-x-1/2 z-[10000] mb-2 bottom-8 transition-opacity duration-500 ${showDownArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'} cursor-pointer`}
        style={{ outline: 'none' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 28L18 8M18 28L8 18M18 28L28 18" stroke="#E5E5E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  );
}
