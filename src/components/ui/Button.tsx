import React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, MotionProps } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const buttonVariants = cva(
  `
  inline-flex items-center justify-center 
  rounded-2xl 
  font-heading 
  font-bold 
  uppercase 
  tracking-wider 
  transition-all 
  duration-400 
  ease-in-out 
  group 
  relative 
  overflow-hidden 
  select-none 
  cursor-pointer 
  will-change-transform 
  tap:scale-95
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-to-br 
          from-custom-gold 
          to-custom-gold/80 
          text-custom-black 
          hover:from-custom-gold/90 
          hover:to-custom-gold/70
          shadow-xl 
          hover:shadow-2xl 
          focus:ring-4 
          focus:ring-custom-gold/50
        `,
        secondary: `
          bg-custom-dark-gray 
          text-custom-white 
          border-2 
          border-custom-gold/30 
          hover:bg-custom-dark-gray/90 
          hover:border-custom-gold/50
          shadow-lg 
          hover:shadow-xl
        `,
        outline: `
          bg-transparent 
          text-custom-gold 
          border-2 
          border-custom-gold 
          hover:bg-custom-gold/10 
          hover:border-custom-gold/80
          shadow-md 
          hover:shadow-lg
        `,
        ghost: `
          bg-transparent 
          text-custom-white 
          hover:bg-custom-dark-gray/30 
          focus:ring-2 
          focus:ring-custom-white/30
          opacity-80 
          hover:opacity-100
        `
      },
      size: {
        xs: 'px-3 py-1 text-xs',
        sm: 'px-4 py-2 text-sm',
        default: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl'
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      animation: 'none'
    }
  }
);

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
  VariantProps<typeof buttonVariants>,
  MotionProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    children, 
    icon, 
    iconPosition = 'right',
    animation,
    ...props 
  }, ref) => {
    const buttonContent = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="mr-2 group-hover:animate-pulse">{icon}</span>
        )}
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
        {icon && iconPosition === 'right' && (
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            {icon}
          </span>
        )}
      </>
    );

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            animation, 
            className 
          })
        )}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';