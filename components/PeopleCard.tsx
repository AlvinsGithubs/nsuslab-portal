
import React from 'react';
import type { TeamMember } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface PeopleCardProps {
  member: TeamMember;
}

const PeopleCard: React.FC<PeopleCardProps> = ({ member }) => {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    window.location.hash = path;
  };
  
  const path = `#/people/${member.slug}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <img src={member.imageUrl} alt={member.name} className="w-full h-70 object-cover "/>
      <div className="p-6">
        <p className="text-nsus-blue font-bold text-sm">{member.department} / {member.role}</p>
        <h3 className="text-xl font-bold mt-1 text-nsus-gray-900">{member.name}</h3>
        <p className="mt-3 text-nsus-gray-700 h-20 overflow-hidden">"{member.quote}"</p>
        <a href={path} onClick={(e) => handleNavigate(e, path)} className="mt-4 inline-flex items-center font-bold text-nsus-blue">
          Read more <ArrowRightIcon className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default PeopleCard;
