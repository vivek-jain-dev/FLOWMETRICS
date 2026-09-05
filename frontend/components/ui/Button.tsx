'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      magnetic = true,
      onMouseMove,
      onMouseLeave,
      style,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (magnetic && buttonRef.current && !disabled && !isLoading) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Magnetic pull factor
        const moveX = (e.clientX - centerX) * 0.22;
        const moveY = (e.clientY - centerY) * 0.22;
        setOffset({ x: moveX, y: moveY });
      }
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (magnetic) {
        setOffset({ x: 0, y: 0 });
      }
      onMouseLeave?.(e);
    };

    const baseStyles =
      'relative inline-flex items-center justify-center font-medium rounded-xl transition-transform duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#060913] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.96] overflow-hidden group';

    const variants = {
      primary:
        'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-bold hover:brightness-110 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 border border-cyan-400/30 active:scale-[0.98]',
      glow:
        'bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-extrabold hover:brightness-110 shadow-glow-cyan focus:ring-cyan-400 border border-white/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]',
      secondary:
        'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus:ring-slate-400 font-semibold shadow-sm hover:shadow-md',
      outline:
        'bg-white/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md',
      ghost:
        'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-950 dark:hover:text-white focus:ring-slate-400',
      danger:
        'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-red-500 hover:text-white focus:ring-red-500 shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4.5 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-3 gap-2.5 h-12',
    };

    const combinedRef = (node: HTMLButtonElement) => {
      buttonRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    return (
      <button
        ref={combinedRef}
        disabled={disabled || isLoading}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          ...style,
        }}
        {...props}
      >
        {/* Subtle shine hover effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0 relative z-10" />}
        {!isLoading && leftIcon && <span className="shrink-0 relative z-10 inline-flex items-center">{leftIcon}</span>}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0 relative z-10 inline-flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
