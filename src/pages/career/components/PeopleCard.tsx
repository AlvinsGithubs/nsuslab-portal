import React from 'react';
import type { TeamMember } from '../../../types';

interface LifeCardProps {
  member: TeamMember;
}

const LifeCard: React.FC<LifeCardProps> = ({ member }) => {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    window.location.hash = path;
  };
  
  const path = `#/people/${member.slug}`;

  return (
    <a
      href={path}
      onClick={(e) => handleNavigate(e, path)}
      className="group block" 
    >
      <div className="aspect-video bg-nsus-gray-200 rounded-lg overflow-hidden">
        <img
          src={
            member.imageUrl ||
            `https://picsum.photos/seed/${member.slug}/400/300`
          }
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <h3 className="mt-4 font-bold text-lg text-nsus-gray-900 group-hover:text-nsus-blue transition-colors leading-tight">
        {member.name}
      </h3>
      
      <p className="mt-1 text-sm text-nsus-gray-700 line-clamp-2">
        {member.quote}
      </p>
    </a>
  );
};

export default LifeCard;