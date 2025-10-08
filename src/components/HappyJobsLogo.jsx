import React from 'react';

const HappyJobsLogo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#0EA5A4" />
      <path
        d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z"
        fill="white"
      />
      <circle cx="24" cy="8" r="3" fill="#0F172A" />
      <path
        d="M22 8h4M24 6v4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HappyJobsLogo;
