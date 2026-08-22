'use client';

import React from 'react';

export type BorderBeamSize = 'sm' | 'md' | 'lg';
export type BorderBeamTheme = 'dark' | 'light' | 'cyan' | 'auto';
export type BorderBeamColorVariant = 'default' | 'colorful' | 'cyan' | 'purple';

export interface BorderBeamProps {
  className?: string;
  size?: BorderBeamSize | number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  theme?: BorderBeamTheme;
  colorVariant?: BorderBeamColorVariant;
  style?: React.CSSProperties;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  size = 'md',
  duration = 8,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = '#00D4AA',
  colorTo = '#7C3AED',
  delay = 0,
  theme = 'cyan',
  colorVariant = 'colorful',
  style,
}) => {
  const sizeMap: Record<BorderBeamSize, number> = {
    sm: 150,
    md: 250,
    lg: 380,
  };

  const actualSize = typeof size === 'number' ? size : sizeMap[size] || 250;

  const colorStyles: Record<BorderBeamColorVariant, string> = {
    colorful: 'linear-gradient(90deg, #00D4AA 0%, #33DDBB 50%, #7C3AED 100%)',
    cyan: 'linear-gradient(90deg, #00D4AA 0%, #00A88A 50%, #33DDBB 100%)',
    purple: 'linear-gradient(90deg, #7C3AED 0%, #A78BFA 50%, #00D4AA 100%)',
    default: `linear-gradient(90deg, ${colorFrom} 0%, ${colorTo} 100%)`,
  };

  const gradient = colorStyles[colorVariant] || colorStyles.colorful;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
      style={{
        padding: `${borderWidth}px`,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          border: `${borderWidth}px solid transparent`,
          WebkitMask:
            'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      >
        <div
          className="absolute"
          style={{
            width: `${actualSize}px`,
            height: `${actualSize}px`,
            top: '-50%',
            left: '-50%',
            background: gradient,
            borderRadius: '50%',
            filter: 'blur(4px)',
            opacity: 0.85,
            animation: `border-beam-spin ${duration}s linear infinite`,
            animationDelay: `-${delay}s`,
            transformOrigin: '100% 100%',
          }}
        />
      </div>
      <style>{`
        @keyframes border-beam-spin {
          0% {
            transform: rotate(0deg) translate(50%, 50%);
          }
          100% {
            transform: rotate(360deg) translate(50%, 50%);
          }
        }
      `}</style>
    </div>
  );
};
