import React from 'react';
import type { Department } from '../types';

interface TeamCardProps {
  department: Department;
}

const TeamCard: React.FC<TeamCardProps> = ({ department }) => {
    
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    window.location.hash = path;
  };

  const path = `#/departments/${department.slug}`;

  return (
    <a
      href={path}
      onClick={(e) => handleNavigate(e, path)}
      className="group block"
    >
      <div className="aspect-video bg-nsus-gray-200 rounded-lg overflow-hidden">
        <img
          src={
            department.imageUrl ||
            `https://picsum.photos/seed/${department.slug}/400/300` 
          }
          alt={department.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      <h3 className="mt-4 font-bold text-lg text-nsus-gray-900 group-hover:text-nsus-blue transition-colors leading-tight">
        {department.name}
      </h3>
      
      <p className="mt-1 text-sm text-nsus-gray-700 line-clamp-3">
        {department.description}
      </p>
    </a>
  );
};

export default TeamCard;