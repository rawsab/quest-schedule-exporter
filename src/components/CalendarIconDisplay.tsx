import React from "react";

const icons = [
  { src: "cal_icons/apple_cal.png", alt: "Apple Calendar" },
  { src: "cal_icons/outlook_cal.png", alt: "Outlook Calendar" },
  { src: "cal_icons/google_cal.png", alt: "Google Calendar" },
  { src: "cal_icons/notion_cal.png", alt: "Notion Calendar" },
];

export const CalendarIconDisplay: React.FC = () => {
  return (
    <div className="w-full max-w-[712px] mx-auto flex flex-col items-center gap-6">
      <div className="text-[#A1A1A1] font-medium text-base mb-2 text-center" style={{ fontFamily: 'var(--font-inter-tight, Inter Tight, sans-serif)' }}>
        Exported iCal file can be imported into all calendar applications:
      </div>
      <div className="grid grid-cols-4 gap-2 w-full place-items-center max-w-[350px]">
        {icons.map((icon, idx) => (
          <div key={icon.alt} className="relative flex items-center justify-center" style={{ width: 42, height: 42 }}>
            <img
              src={icon.src}
              alt={icon.alt}
              width={42}
              height={42}
              className="object-contain grayscale"
              style={{ filter: 'grayscale(1)' }}
              draggable={false}
            />
            <div
              className="absolute top-1 left-0 w-full h-full pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0), rgba(10,10,10,0.75) 100%)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarIconDisplay; 