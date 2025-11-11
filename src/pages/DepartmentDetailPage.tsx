import React, { useState, useEffect, useContext } from "react";
import NotFoundPage from "./NotFoundPage";
import Breadcrumb from "@/components/Breadcrumb";
import LifeCard from "@/components/PeopleCard";
import JobCard from "@/components/JobCard";
import {
  fetchJobsByDepartment,
  fetchTeamMembersByDepartment,
} from "@/lib/contentful";
import type { Job } from "@/types";
import { fetchDepartmentBySlug } from "@/lib/contentful";
import type { Department, TeamMember } from "@/types";
import { NavbarThemeContext } from "@/App";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface DepartmentDetailPageProps {
  slug: string;
}

const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({
  slug,
}) => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

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
            fetchTeamMembersByDepartment(department.name),
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
    return (
      <div className="text-center py-24 text-xl text-nsus-gray-500">
        Loading department...
      </div>
    );
  }

  if (!department) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 pt-16">
        <Breadcrumb
          links={[
            { name: "Departments", href: "#/departments" },
            { name: department.name, href: `#/departments/${department.slug}` },
          ]}
        />
        <div className="mt-8">
          <h3 className="mt-2 tracking-tight text-nsus-gray-900">
            {department.name}
          </h3>
          <p className="caption mt-4 text-nsus-gray-500">
            {department.description}
          </p>
        </div>
        {department.imageUrl && (
          <img
            src={department.imageUrl}
            alt={department.name}
            className="mt-12 w-full h-auto rounded-xl shadow-lg"
          />
        )}
        <article className="mt-12 max-w-none">
          {" "}
          {/* 'prose' 클래스 없는지 확인 */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-xl font-bold md:text-2xl lg:text-2xl mb-4 mt-12 text-nsus-gray-900"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl font-bold md:text-2xl lg:text-2xl mb-4 mt-12 text-nsus-gray-900"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-bold md:text-2xl lg:text-2xl mb-2 mt-12 text-nsus-gray-900"
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className="text-xl font-semibold md:text-2xl mb-2 mt-5"
                  {...props}
                />
              ),
              h5: ({ node, ...props }) => (
                <h5 className="text-lg md:text-xl mb-2 mt-4" {...props} />
              ),
              h6: ({ node, ...props }) => (
                <h6 className="text-base md:text-lg mb-2 mt-4 text-nsus-gray-700" {...props} />
              ),

              // 2. 문단 (P)
              p: ({ node, ...props }) => (
                <p
                  className="text-sm md:text-base leading-relaxed mb-4 text-nsus-gray-700"
                  {...props}
                />
              ),

              // 3. 목록 (UL/LI)
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside pl-5 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-sm md:text-base leading-relaxed mb-2 text-nsus-gray-700"
                  {...props}
                />
              ),

              a: ({ node, ...props }) => (
                <a className="text-blue-600 hover:underline" {...props} />
              ),
            }}
          >
            {department.vision}
          </ReactMarkdown>
        </article>
        {membersInDept.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-nsus-gray-900">
              Meet the Team
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membersInDept.map((member) => (
                <LifeCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
        {jobsInDept.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-nsus-gray-900">
              Open Positions in {department.name}
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobsInDept.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetailPage;
