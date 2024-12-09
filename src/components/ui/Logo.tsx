import React from 'react';
import LogoImage from '../../Gemini_Generated_Image_zcnac9zcnac9zcna-removebg.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <img 
      src={LogoImage} 
      alt="DRIVERX Logo" 
      className={`object-contain ${className}`} 
    />
  );
}
