import React from 'react';

/**
 * CalloutBox Component
 * @param {'warning' | 'info'} type - Only warning (orange) or info (blue)
 * @param {string} title - Heading text
 * @param {React.ReactNode} children - Description / body content
 */
export const CalloutBox = ({ type = 'info', title, children }) => {
  if (type === 'warning') {
    return (
      <div className="bg-[#fff8ec] border border-[#f3d3ad] rounded-[12px] p-[16px_18px] flex gap-[14px] items-start">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9a3f07"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 mt-[2px]"
        >
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
        <div className="flex flex-col gap-[4px]">
          {title && <span className="font-extrabold text-[14px] text-[#9a3f07]">{title}</span>}
          <div className="font-normal text-[15px] leading-[1.6] text-[#5b3a12]">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#eef3fb] border border-[#d3def0] rounded-[12px] p-[16px_18px] flex gap-[14px] items-start">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1e40af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 mt-[2px]"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
      <div className="flex flex-col gap-[4px]">
        {title && <span className="font-extrabold text-[14px] text-[#1e40af]">{title}</span>}
        <div className="font-normal text-[15px] leading-[1.6] text-[#334155]">
          {children}
        </div>
      </div>
    </div>
  );
};
