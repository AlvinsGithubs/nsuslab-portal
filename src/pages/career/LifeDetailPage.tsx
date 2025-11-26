import React, { useState, useEffect, useContext } from "react";
import { fetchTeamMemberBySlug } from "@/lib/contentful";
import type { TeamMember } from "@/types";
import NotFoundPage from "../NotFoundPage";
import { NavbarThemeContext } from "@/App";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

interface LifeDetailPageProps {
  slug: string;
}

const LifeDetailPage: React.FC<LifeDetailPageProps> = ({ slug }) => {
  const navbarContext = useContext(NavbarThemeContext);

  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMember = async () => {
      setIsLoading(true);
      try {
        const fetchedMember = await fetchTeamMemberBySlug(slug);
        setMember(fetchedMember);
      } catch (error) {
        console.error("Error fetching member:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      getMember();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="text-center py-24 text-xl text-nsus-gray-500">
        Loading member...
      </div>
    );
  }

  if (!member) {
    return <NotFoundPage />;
  }

  // 2. Rich Text 렌더링 옵션
  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_1]: (_node: any, children: any) => (
        <h1 className="text-xl font-bold md:text-2xl lg:text-2xl mb-4 mt-12 text-nsus-gray-900">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: any) => (
        <h2 className="text-xl font-bold md:text-2xl lg:text-2xl mb-4 mt-12 text-nsus-gray-900">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: any) => (
        <h3 className="text-xl font-bold md:text-2xl lg:text-2xl mb-2 mt-12 text-nsus-gray-900">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (_node: any, children: any) => (
        <h4 className="text-xl font-semibold md:text-2xl mb-2 mt-5">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (_node: any, children: any) => (
        <h5 className="text-lg md:text-xl mb-2 mt-4">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_node: any, children: any) => (
        <h6 className="text-base md:text-lg mb-2 mt-4 text-nsus-gray-700">
          {children}
        </h6>
      ),
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => {
        return (
          <h6 className="mb-4 text-nsus-gray-700 leading-relaxed min-h-[1.625rem]">
            {children}
          </h6>
        );
      },
      [BLOCKS.UL_LIST]: (_node: any, children: any) => (
        <ul className="list-disc list-outside pl-5 mb-4 ml-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: any) => (
        <ol className="list-decimal list-outside pl-5 mb-4 ml-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: any) => (
        <li className="text-sm md:text-base leading-relaxed mb-2 text-nsus-gray-700 [&>p]:inline [&>p]:mb-0">
          {children}
        </li>
      ),
      [BLOCKS.QUOTE]: (_node: any, children: any) => (
        <blockquote className="border-l-4 border-nsus-gray-300 pl-4 italic text-nsus-gray-600 my-4">
          {children}
        </blockquote>
      ),

      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const file = node.data?.target?.fields?.file;
        if (!file) return null;

        const { url, description } = file;
        return (
          <img
            src={`https:${url}`}
            alt={description || "Content Image"}
            className="my-8 rounded-lg shadow-md max-w-full h-auto"
          />
        );
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text: any) => (
        <span className="font-bold text-nsus-gray-900">{text}</span>
      ),
    },
  };

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 pt-16">
        <p className="caption text-nsus-gray-500">Life</p>

        <div className="mt-8">
          <h3 className="mt-2 tracking-tight text-nsus-gray-900">
            {member.name}
          </h3>
          <p className="caption mt-4 text-nsus-gray-500">
            {member.role} {member.department && `/ ${member.department}`}
          </p>
        </div>

        {member.imageUrl && (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="mt-12 w-full h-auto rounded-xl shadow-lg"
          />
        )}

        <article className="mt-12 max-w-none">
          {member.content &&
            documentToReactComponents(member.content as any, renderOptions)}
        </article>

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

export default LifeDetailPage;
