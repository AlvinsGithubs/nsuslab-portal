
import React from 'react';
import type { Job } from '../types';
import MapPinIcon from './icons/MapPinIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    window.location.hash = path;
  };

  const path = `#/jobs/${job.slug}`;

  return (
    <div className="bg-white p-6 rounded-lg border border-nsus-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="flex-grow">
        <p className="text-sm text-nsus-blue font-bold">{job.department}</p>
        <h3 className="text-xl font-bold text-nsus-gray-900 mt-1 mb-3">{job.title}</h3>
        <div className="flex items-center text-nsus-gray-500 space-x-4 text-sm">
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-1.5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <BriefcaseIcon className="w-4 h-4 mr-1.5" />
            <span>{job.careerLevel}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xs text-nsus-gray-500">
          Ends on {job.deadline}
        </p>
        <a href={path} onClick={(e) => handleNavigate(e, path)} className="inline-flex items-center px-4 py-2 bg-nsus-light-blue text-nsus-blue font-bold rounded-xl hover:bg-nsus-blue hover:text-white transition-colors duration-300">
          Apply
          <ArrowRightIcon className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
