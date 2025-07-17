
import React from 'react';
import type { Department } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
    
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    window.location.hash = path;
  };

  const path = `#/departments/${department.slug}`;

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md">
      <img src={department.imageUrl} alt={department.name} className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold">{department.name}</h3>
        <p className="mt-2 text-gray-200">{department.description}</p>
        <a href={path} onClick={(e) => handleNavigate(e, path)} className="mt-4 inline-flex items-center font-bold text-nsus-blue transition-colors hover:text-white">
          Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default DepartmentCard;
