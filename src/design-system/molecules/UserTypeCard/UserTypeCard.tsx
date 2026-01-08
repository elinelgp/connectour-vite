import React from 'react';
import { Card } from '../../atoms/Card';
import { UserTypeCardProps } from './UserTypeCard.types';

export const UserTypeCard: React.FC<UserTypeCardProps> = ({
  title,
  icon: Icon,
  description,
  iconColor = 'primary',
  onClick
}) => {
  const iconColors = {
    primary: 'text-[#FF9F5A]',
    secondary: 'text-[#5C9C9C]'
  };
  
  return (
    <Card
      variant="elevated"
      onClick={onClick}
      className="
        bg-[#FFF4E6]
        border border-[#E5E5E5]
        text-left
        p-3 sm:p-4
        "
    >
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-2">
        <Icon className={`w-5 h-5 ${iconColors[iconColor]}`} />
      </div>
      <h3 className="text-[#8B5A2B] font-semibold text-xs sm:text-sm mb-1">
        {title}
      </h3>
      <p className="text-xs text-[#8B5A2B]/70 line-clamp-2">
        {description}
      </p>
    </Card>
  );
};

UserTypeCard.displayName = 'UserTypeCard';