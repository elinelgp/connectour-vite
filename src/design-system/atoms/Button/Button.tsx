import React from 'react';
import { ButtonProps } from './Button.types';
import { 
  buttonSizeClasses, 
  buttonVariantColors 
} from '../../componentStyles';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Récupérer les styles de size et variant depuis le mapping centralisé
  const sizeStyles = buttonSizeClasses[size];
  const colorStyles = buttonVariantColors[variant];

  // Classes Tailwind (structure)
  const finalClasses = `
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  // Combiner styles inline (couleurs + tailles en inline)
  const combinedStyles: React.CSSProperties = {
    ...colorStyles,
    ...sizeStyles,
  };

  return (
    <button
      className={finalClasses}
      style={combinedStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';