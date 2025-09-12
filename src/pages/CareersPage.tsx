
import React, { useState, useMemo, useEffect, useContext } from 'react';
import type { FilterState, Job, JobFilterCheckboxState } from "@/types";
import { contentfulClient, parseContentfulJob } from "@/lib/contentful";
import SearchIcon from "@/components/icons/SearchIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { 
  JOB_GROUP_OPTIONS, 
  CAREER_LEVEL_OPTIONS, 
  EMPLOYMENT_TYPE_OPTIONS, 
  LOCATION_OPTIONS 
} from  "@/constants";
import { NavbarThemeContext } from '@/App';

const JobListItem: React.FC<{ job: Job }> = ({ job }) => {
    const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        event.preventDefault();
        window.location.hash = path;
    };
    const path = `#/jobs/${job.slug}`;

    return (
        <a href={path} onClick={e => handleNavigate(e, path)} className="block py-6 border-b border-nsus-gray-200 group">
            <h4 className="font-bold text-xl text-nsus-gray-900 group-hover:text-nsus-blue transition-colors">{job.title}</h4>
            <div className="mt-2 text-sm text-nsus-gray-500 flex flex-wrap items-center gap-x-2">
                <span>{job.department}</span>
                {job.careerLevel && <><span>|</span><span>{job.careerLevel}</span></>}
                {job.employmentType && <><span>|</span><span>{job.employmentType}</span></>}
                {job.location && <><span>|</span><span>{job.location}</span></>}
            </div>
        </a>
    );
};

const FilterAccordion: React.FC<{
  title: string;
  options: readonly string[];
  selected: JobFilterCheckboxState;
  onChange: (option: string, checked: boolean) => void;
}> = ({ title, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-2 text-left">
        <h3 className="font-bold text-base text-gray-800">{title}</h3>
        <ChevronDownIcon className={`w-5 h-5 transition-transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-4 space-y-3">
          {options.map(option => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selected[option] || false}
                onChange={e => onChange(option, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-nsus-blue focus:ring-2 focus:ring-offset-0 focus:ring-nsus-blue"
              />
              <span className="ml-3 text-sm text-nsus-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const CareersPage: React.FC = () => {
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
            if (navbarContext) {
                navbarContext.setNavbarTheme("light");
            }
    }, [navbarContext]);
    
    const createInitialCheckboxState = (options: readonly string[]): JobFilterCheckboxState => 
        options.reduce((acc, option) => ({ ...acc, [option]: false }), {});

    const initialFilters: FilterState = {
        keyword: '',
        jobGroup: createInitialCheckboxState(JOB_GROUP_OPTIONS),
        careerLevel: createInitialCheckboxState(CAREER_LEVEL_OPTIONS),
        employmentType: createInitialCheckboxState(EMPLOYMENT_TYPE_OPTIONS),
        location: createInitialCheckboxState(LOCATION_OPTIONS),
    };

    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const jobResponse = await contentfulClient.getEntries({ content_type: 'job', order: ['-fields.postedDate'] });
                const fetchedJobs = jobResponse.items.map(parseContentfulJob);
                setJobs(fetchedJobs);
            } catch (err) {
                console.error("Error fetching jobs from Contentful:", err);
                setError("Failed to load job openings. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleFilterChange = (
      category: keyof Omit<FilterState, 'keyword'>,
      option: string,
      checked: boolean
    ) => {
      setFilters(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [option]: checked,
        },
      }));
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, keyword: e.target.value }));
    };

    const filteredJobs = useMemo(() => {
        const getSelected = (state: JobFilterCheckboxState) => Object.keys(state).filter(key => state[key]);

        const selectedJobGroups = getSelected(filters.jobGroup);
        const selectedCareerLevels = getSelected(filters.careerLevel);
        const selectedEmploymentTypes = getSelected(filters.employmentType);
        const selectedLocations = getSelected(filters.location);

        return jobs.filter(job => {
            const keywordMatch = filters.keyword === '' || 
                (job.title && job.title.toLowerCase().includes(filters.keyword.toLowerCase()));

            const jobGroupMatch = selectedJobGroups.length === 0 || 
                (job.department && selectedJobGroups.includes(job.department));
            
            const careerLevelMatch = selectedCareerLevels.length === 0 || 
                (job.careerLevel && selectedCareerLevels.some(level => 
                    (level === '경력' && job.careerLevel === 'Experienced')
                ));
            
            const employmentTypeMatch = selectedEmploymentTypes.length === 0 || 
                (job.employmentType && selectedEmploymentTypes.some(type => 
                    (type === '정규직' && job.employmentType === 'Full-time')
                ));

            const locationMatch = selectedLocations.length === 0 ||
                (job.location && selectedLocations.some(loc => 
                    (loc === 'NSUSLAB KOREA' && (job.location === 'Seoul' || job.location === 'Bundang'))
                ));

            return keywordMatch && jobGroupMatch && careerLevelMatch && employmentTypeMatch && locationMatch;
        });
    }, [filters, jobs]);
    
    const renderJobList = () => {
        if (isLoading) return <div className="text-center py-20 text-nsus-gray-500">Loading openings...</div>;
        if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
        if (filteredJobs.length === 0) return <div className="text-center py-20 text-nsus-gray-500">No matching openings found.</div>;
        
        return (
            <div>
                <div className="py-6 border-b border-nsus-gray-200">
                    <h4 className="font-bold text-xl text-nsus-gray-900">인재 Pool 등록</h4>
                    <div className="mt-2 text-sm text-nsus-gray-500">
                        <span>NSUSLAB KOREA</span>
                    </div>
                </div>
                {filteredJobs.map(job => (
                    <JobListItem key={job.id} job={job as Required<Job>} />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 xl:gap-x-16">
                    <aside className="lg:col-span-3">
                        <div className="sticky top-24">
                            <h1 className="text-4xl font-bold">Jobs</h1>
                            <p className="mt-4 text-nsus-gray-500 leading-relaxed">
                                엔서스랩의 위대한 도전을 함께 할 우수 인재를 모집합니다.
                            </p>
                            <div className="mt-8 divide-y divide-nsus-gray-200">
                                <FilterAccordion 
                                    title="직군" 
                                    options={JOB_GROUP_OPTIONS} 
                                    selected={filters.jobGroup}
                                    onChange={(option, checked) => handleFilterChange('jobGroup', option, checked)}
                                />
                                <FilterAccordion 
                                    title="경력사항" 
                                    options={CAREER_LEVEL_OPTIONS} 
                                    selected={filters.careerLevel}
                                    onChange={(option, checked) => handleFilterChange('careerLevel', option, checked)}
                                />
                                <FilterAccordion 
                                    title="고용형태" 
                                    options={EMPLOYMENT_TYPE_OPTIONS} 
                                    selected={filters.employmentType}
                                    onChange={(option, checked) => handleFilterChange('employmentType', option, checked)}
                                />
                                <FilterAccordion 
                                    title="근무지" 
                                    options={LOCATION_OPTIONS} 
                                    selected={filters.location}
                                    onChange={(option, checked) => handleFilterChange('location', option, checked)}
                                />
                            </div>
                        </div>
                    </aside>

                    <main className="lg:col-span-9 mt-12 lg:mt-0">
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="검색"
                                value={filters.keyword}
                                onChange={handleKeywordChange}
                                className="w-full pl-10 pr-4 py-3 border border-nsus-gray-300 rounded-md focus:ring-nsus-blue focus:border-nsus-blue"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-nsus-gray-400" />
                            </div>
                        </div>
                        {renderJobList()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
