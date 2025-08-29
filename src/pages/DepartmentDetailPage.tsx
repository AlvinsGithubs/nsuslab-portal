import React, { useState, useEffect } from 'react';
import NotFoundPage from './NotFoundPage';
import Breadcrumb from '@/components/Breadcrumb';
import PeopleCard from '@/components/PeopleCard';
import JobCard from '@/components/JobCard';
import { fetchJobsByDepartment, fetchTeamMembersByDepartment } from '@/lib/contentful';
import type { Job } from '@/types';
import { fetchDepartmentBySlug } from '@/lib/contentful'; // 새로 추가
import type { Department, TeamMember } from '@/types'; // 새로 추가

interface DepartmentDetailPageProps {
  slug: string;
}

const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({ slug }) => {
  const [department, setDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobsInDept, setJobsInDept] = useState<Job[]>([]);
  const [membersInDept, setMembersInDept] = useState<TeamMember[]>([]);

  useEffect(() => {
    const getDepartmentData = async () => {
      setIsLoading(true);
      const fetchedDept = await fetchDepartmentBySlug(slug);
      setDepartment(fetchedDept);
      setIsLoading(false);
    };
    getDepartmentData();
  }, [slug]);

  useEffect(() => {
    if (department) {
      const getRelatedData = async () => {
        try {
          const [jobs, members] = await Promise.all([
            fetchJobsByDepartment(department.name),
            fetchTeamMembersByDepartment(department.name)
          ]);
          setJobsInDept(jobs);
          setMembersInDept(members);
        } catch (error) {
          console.error("Error fetching related data for department:", error);
        }
      };
      getRelatedData();
    }
  }, [department]); 

  if (isLoading) {
    return <div>Loading...</div>; // 간단한 로딩 표시
  }

  if (!department) {
    return <NotFoundPage />;
  }
  
  return (
    <div className="bg-white">
      <div className="relative h-80">
        <img src={department.imageUrl} alt={department.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="py-8">
                <h1 className="text-5xl font-bold text-white">{department.name}</h1>
                <p className="mt-2 text-xl text-gray-200">{department.description}</p>
            </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb links={[
            { name: 'Home', href: '#/' },
            { name: 'Departments', href: '#/departments' },
            { name: department.name, href: `#/departments/${department.slug}` }
        ]} />

        <div className="mt-12">
            <h2 className="text-3xl font-bold text-nsus-gray-900">Our Vision</h2>
            <p className="mt-4 text-lg text-nsus-gray-700 max-w-3xl">{department.vision}</p>
        </div>

        {membersInDept.length > 0 && (
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-nsus-gray-900">Meet the Team</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {membersInDept.map(member => <PeopleCard key={member.id} member={member} />)}
                </div>
            </div>
        )}

        {jobsInDept.length > 0 && (
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-nsus-gray-900">Open Positions in {department.name}</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobsInDept.map(job => <JobCard key={job.id} job={job} />)}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetailPage;