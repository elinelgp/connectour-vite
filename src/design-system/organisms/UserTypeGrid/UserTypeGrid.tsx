import React from 'react';
import { UserTypeCard } from '../../molecules/UserTypeCard';
import { UserTypeGridProps } from './UserTypeGrid.types';

export const UserTypeGrid: React.FC<UserTypeGridProps> = ({
  userTypes,
  onTypeClick
}) => {
  return (
<section className="mt-6 px-4 sm:px-6">
  <h2 className="mb-4 text-[var(--color-brown)] text-lg sm:text-xl font-semibold">
    Explore by Type
  </h2>

  <div className="grid grid-cols-2 gap-4 sm:gap-6">
    {userTypes.map((type) => (
      <UserTypeCard
        key={type.id}
        {...type}
        onClick={() => onTypeClick?.(type.id)}
      />
    ))}
  </div>
</section>
  );
};

UserTypeGrid.displayName = 'UserTypeGrid';