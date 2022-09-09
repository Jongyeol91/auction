import React from 'react';

interface props {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowLeft = ({ width = 30, height = 30, color = 'white' }: props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 30 30"
    >
      <path stroke={color} strokeLinejoin="round" strokeWidth="2" d="M17 8l-6 7.163L17 22" />
    </svg>
  );
};

export default ArrowLeft;
