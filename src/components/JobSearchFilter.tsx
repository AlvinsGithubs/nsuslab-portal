
import React from 'react';
import type { FilterState, JobFilterCheckboxState } from '../types';
import { FILTER_OPTIONS } from '../constants';
import SearchIcon from './icons/SearchIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface JobSearchFilterProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  departmentOptions: string[];

}

const JobSearchFilter: React.FC<JobSearchFilterProps> = ({ filters, onFilterChange, onReset, departmentOptions }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'keyword') {
      onFilterChange(name, value);
    } else {
      const filterKey = name as keyof Omit<FilterState, 'keyword'>;
      
      const allOptionsForFilter = {
        jobGroup: ['All', ...departmentOptions],
        employmentType: FILTER_OPTIONS.employmentType,
        careerLevel: FILTER_OPTIONS.careerLevel,
        location: FILTER_OPTIONS.location,
      }[filterKey];
      
      const newState: JobFilterCheckboxState = {};

      allOptionsForFilter.forEach(opt => {
        newState[opt] = (opt === value && value !== 'All');
      });
      onFilterChange(filterKey, newState);
    }
  };
  
  const FilterSelect: React.FC<{name: keyof Omit<FilterState, 'keyword'>, options: readonly string[] | string[]}> = ({name, options}) => {
    const selection = filters[name];
    const selectedValue = Object.keys(selection).find(key => selection[key]) || 'All';

    return (
        <div className="relative w-full">
        <select
            id={name}
            name={name}
            value={selectedValue}
            onChange={handleInputChange}
            className="w-full appearance-none bg-nsus-gray-100 border-transparent rounded-lg py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-nsus-blue"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-nsus-gray-700">
            <ChevronDownIcon className="h-5 w-5" />
        </div>
        </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg -mt-16 relative z-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
        <div className="lg:col-span-2">
          <label htmlFor="keyword" className="block text-sm font-medium text-nsus-gray-700 mb-1">Keyword</label>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-nsus-gray-500" />
            <input
              type="text"
              id="keyword"
              name="keyword"
              placeholder="Search by job title or keyword"
              value={filters.keyword}
              onChange={handleInputChange}
              className="w-full bg-nsus-gray-100 border-transparent rounded-lg py-3 pl-10 pr-4 leading-tight focus:outline-none focus:ring-2 focus:ring-nsus-blue"
            />
          </div>
        </div>
        <div>
          <label htmlFor="jobGroup" className="block text-sm font-medium text-nsus-gray-700 mb-1">Department</label>
          <FilterSelect name="jobGroup" options={['All', ...departmentOptions]} />
        </div>
        <div>
          <label htmlFor="employmentType" className="block text-sm font-medium text-nsus-gray-700 mb-1">Employment Type</label>
          <FilterSelect name="employmentType" options={FILTER_OPTIONS.employmentType} />
        </div>
        <div>
          <label htmlFor="careerLevel" className="block text-sm font-medium text-nsus-gray-700 mb-1">Career Level</label>
          <FilterSelect name="careerLevel" options={FILTER_OPTIONS.careerLevel} />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-nsus-gray-700 mb-1">Location</label>
          <FilterSelect name="location" options={FILTER_OPTIONS.location} />
        </div>
      </div>
       <div className="mt-4 flex justify-end">
         <button onClick={onReset} className="text-sm font-medium text-nsus-gray-500 hover:text-nsus-blue">
            Reset Filters
         </button>
       </div>
    </div>
  );
};

export default JobSearchFilter;
