import React from 'react';
import { AvatarProps } from './Avatar.types';
import { avatarSizeStyles, avatarBaseStyles } from '../../componentStyles';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = ''
}) => {
  const avatarClasses = [
    className
  ].filter(Boolean).join(' ');
  
  const combinedStyles: React.CSSProperties = {
    ...avatarBaseStyles,
    ...avatarSizeStyles[size],
  };
  
  return (
    <div className={avatarClasses} style={combinedStyles}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white font-bold">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';