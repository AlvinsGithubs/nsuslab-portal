
import React, { useState, useEffect } from 'react';
import type { Job } from "@/types";
import { fetchJobBySlug } from "@/lib/contentful";
import NotFoundPage from "./NotFoundPage";
import Breadcrumb from "@/components/Breadcrumb";
import MapPinIcon from "@/components/icons/MapPinIcon";
import { BriefcaseIcon } from "@/components/icons/BriefcaseIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

interface JobDetailPageProps {
  slug: string;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ slug }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getJob = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedJob = await fetchJobBySlug(slug);
        setJob(fetchedJob);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    getJob();
  }, [slug]);
  
  const DetailSection: React.FC<{title: string, items: string[] | undefined}> = ({ title, items }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="mt-10">
            <h3 className="text-xl font-bold text-nsus-gray-900">{title}</h3>
            <ul className="mt-4 list-disc list-inside space-y-2 text-nsus-gray-700">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
  };

  if (isLoading) {
    return (
        <div className="text-center py-24 text-xl text-nsus-gray-500">
            Loading job details...
        </div>
    );
  }

  if (error) {
     return <div className="text-center py-24 text-xl text-red-500">{error}</div>;
  }
  
  if (!job) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-nsus-gray-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb links={[
            { name: 'Home', href: '#/' },
            { name: 'Careers', href: '#/careers' },
            { name: job.title || 'Job Detail', href: `#/jobs/${job.slug}` }
        ]} />

        <div className="mt-8 text-center">
            <p className="text-base font-semibold text-nsus-blue">{job.department}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-nsus-gray-900 sm:text-5xl">{job.title}</h1>
        </div>
        
        <div className="mt-16 lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-nsus-gray-900">Job Description</h2>
                <DetailSection title="Responsibilities" items={job.responsibilities} />
                <DetailSection title="Qualifications" items={job.qualifications} />
                <DetailSection title="Preferred Qualifications" items={job.preferred} />
            </div>
            <aside className="mt-8 lg:mt-0">
                <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-nsus-gray-900">Job Overview</h3>
                    <ul className="mt-4 space-y-3 text-nsus-gray-700">
                        <li className="flex items-center">
                            <BriefcaseIcon className="h-5 w-5 mr-3 text-nsus-gray-500" />
                            <span>{job.employmentType} / {job.careerLevel}</span>
                        </li>
                        <li className="flex items-center">
                            <MapPinIcon className="h-5 w-5 mr-3 text-nsus-gray-500" />
                            <span>{job.location}</span>
                        </li>
                    </ul>
                    <button className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-nsus-blue hover:bg-blue-700">
                        Apply Now
                        <ArrowRightIcon className="ml-2 w-5 h-5" />
                    </button>
                    <p className="text-center mt-4 text-sm text-nsus-gray-500">Application deadline: {job.deadline}</p>
                </div>
            </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
