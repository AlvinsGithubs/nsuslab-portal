import React, { useState, useEffect, useContext } from "react";
import NotFoundPage from "../NotFoundPage";
import LifeCard from "@/pages/career/components/PeopleCard";
import {
  fetchJobsByDepartment,
  fetchTeamMembersByDepartment,
} from "@/lib/contentful";
import { fetchDepartmentBySlug } from "@/lib/contentful";
import type { Department, TeamMember } from "@/types";
import { NavbarThemeContext } from "@/App";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TeamsDetailPageProps {
  slug: string;
}

const TeamsDetailPage: React.FC<TeamsDetailPageProps> = ({ slug }) => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  const [department, setDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
          const [_, members] = await Promise.all([
            fetchJobsByDepartment(department.name),
            fetchTeamMembersByDepartment(department.name),
          ]);
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
        Loading Teams...
      </div>
    );
  }

  if (!department) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 pt-16">
        <p className="caption text-nsus-gray-500">Teams</p>
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // PeopleDetailPage 스타일 + leading-loose 적용
              h1: ({ node, ...props }) => (
                <h2 className="mb-4 mt-12 text-nsus-gray-900" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h3 className="mb-4 mt-12 text-nsus-gray-900" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h4 className="mb-2 mt-12 text-nsus-gray-900" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="mb-2 mt-5" {...props} />
              ),
              h5: ({ node, ...props }) => (
                <h5 className="mb-2 mt-4" {...props} />
              ),
              h6: ({ node, ...props }) => (
                <h6 className="mb-2 mt-4 text-nsus-gray-700" {...props} />
              ),

              p: ({ node, ...props }) => (
                <h6
                  className="mb-4 text-nsus-gray-700 leading-loose min-h-[1.625rem]"
                  {...props}
                />
              ),

              ul: ({ node, ...props }) => (
                <ul
                  className="h6 list-disc list-outside pl-5 mb-4 ml-4"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="h6 list-decimal list-outside pl-5 mb-4 ml-4"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="h6 leading-loose mb-2 text-nsus-gray-700 [&>p]:inline [&>p]:mb-0"
                  {...props}
                />
              ),

              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-nsus-gray-300 pl-4 italic text-nsus-gray-600 my-4"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-600 hover:underline" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img
                  className="my-8 rounded-lg shadow-md max-w-full h-auto"
                  {...props}
                  alt={props.alt || "Content Image"}
                />
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

        <div className="mt-20 mb-12">
          <hr className="border-t border-gray-200 mb-12" />
          <div className="flex justify-center">
            <a
              href="#/departments"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-nsus-gray-900 rounded-lg hover:bg-nsus-gray-700 transition-colors duration-200"
            >
              목록보기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsDetailPage;
