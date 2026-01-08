import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Card } from '../../atoms/Card';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { ProfileCardProps } from './ProfileCard.types';

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  type,
  location,
  rating,
  genre,
  avatarUrl,
  onClick
}) => {
  return (
    <Card 
      variant="elevated" 
      className="min-w-[280px] text-left"
      onClick={onClick}
    >
      {/* Header avec Avatar et Rating */}
      <div className="flex items-start justify-between mb-3">
        <Avatar src={avatarUrl} alt={name} size="md" />
        <div className="flex items-center gap-1 text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Nom */}
      <h3 className="text-[#8B5A2B] font-semibold mb-2">{name}</h3>
      
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="secondary">{type}</Badge>
        {genre && <Badge variant="primary">{genre}</Badge>}
      </div>
      
      {/* Localisation */}
      <div className="flex items-center gap-1 text-sm text-[#8B5A2B]/70">
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
      </div>
    </Card>
  );
};

ProfileCard.displayName = 'ProfileCard';