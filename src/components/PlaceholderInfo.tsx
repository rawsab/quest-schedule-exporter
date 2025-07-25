import React from "react";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface PlaceholderInfoProps {
  top: string;
  middle: string;
  bottom: string;
  className?: string;
}

export const PlaceholderInfo: React.FC<PlaceholderInfoProps> = ({ top, middle, bottom, className }) => {
  return (
    <div
      className={`rounded-xl bg-[#0C0C0C] border border-[#2D2D2D] p-4 flex flex-col items-start gap-0 min-w-0 ${className ?? ""}`}
    >
      <div className={`${geistMono.className} text-[#E5E5E5] text-base font-mono break-all mb-2`}>{top}</div>
      <div className="text-[#E5E5E5] text-sm font-medium" style={{ fontFamily: 'var(--font-inter-tight, Inter Tight, sans-serif)' }}>{middle}</div>
      <div className="text-[#7C7C7C] text-sm font-medium" style={{ fontFamily: 'var(--font-inter-tight, Inter Tight, sans-serif)' }}>{bottom}</div>
    </div>
  );
};

export default PlaceholderInfo; 