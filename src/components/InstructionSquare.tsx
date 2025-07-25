import React from "react";
import Image from "next/image";

interface InstructionSquareProps {
  primary: string;
  secondary: string;
  iconSrc?: string;
  className?: string;
  glow?: boolean;
  fade?: boolean;
  forceGlow?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const InstructionSquare: React.FC<InstructionSquareProps> = ({
  primary,
  secondary,
  iconSrc,
  className,
  glow,
  fade,
  forceGlow,
  onMouseEnter,
  onMouseLeave,
}) => {
  let iconClass = "";
  if (forceGlow) iconClass = "icon-glow";
  else if (glow) iconClass = "icon-glow";
  else if (fade) iconClass = "icon-glow-fade";

  return (
    <div
      className={`w-40 h-40 p-[2px] rounded-xl bg-gradient-to-b from-[#2D2D2D] to-[#1B1B1C] transition-shadow duration-300 hover:shadow-[0_0_8px_2px_rgba(229,229,229,0.2)] ${className ?? ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col justify-end items-start w-full h-full rounded-xl bg-[#0C0C0C] p-4">
        {/* Icon placeholder */}
        <div className="w-full flex items-center mb-4" style={{ minHeight: 38, maxHeight: 38 }}>
          {iconSrc ? (
            <img
              src={iconSrc}
              alt="icon"
              height={38}
              style={{ height: 38, width: 'auto' }}
              draggable={false}
              className={iconClass}
            />
          ) : (
            <div style={{ height: 38 }} />
          )}
        </div>
        <div className="w-full text-left mb-1">
          <div
            className="font-medium text-2xl"
            style={{ color: "#C3C3C4", fontFamily: 'var(--font-inter-tight, Inter Tight, sans-serif)' }}
          >
            {primary}
          </div>
          <div
            className="text-xs mt-1"
            style={{ color: "#7C7C7C", fontWeight: 400 }}
          >
            {secondary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionSquare; 