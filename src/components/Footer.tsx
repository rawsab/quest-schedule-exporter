import React from "react";

export const Footer: React.FC = () => (
  <footer className="w-full mt-16 mb-0 flex flex-col">
    <div className="w-full h-px bg-[#2D2D2D] mb-4" />
    <div className="text-center">
      <div className="text-[#E5E5E5] font-medium text-sm" style={{ fontFamily: 'var(--font-inter-tight, Inter Tight, sans-serif)' }}>
        Built by Rawsab Said
      </div>
      <div className="text-[#7C7C7C] font-medium text-sm mt-1" style={{ fontFamily: 'var(--font-inter-tight, Inter Tight, sans-serif)' }}>
        Adapted from Trinovantes/Quest-Schedule-Exporter
      </div>
    </div>
  </footer>
);

export default Footer; 