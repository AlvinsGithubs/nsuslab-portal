import React, { useState, useEffect, useContext } from 'react';
import { fetchTeamMemberBySlug } from '@/lib/contentful';
import type { TeamMember } from '@/types';
import NotFoundPage from './NotFoundPage';
import Breadcrumb from '@/components/Breadcrumb';
import { NavbarThemeContext } from '@/App';

interface PeopleDetailPageProps {
  slug: string;
}

const PeopleDetailPage: React.FC<PeopleDetailPageProps> = ({ slug }) => {
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
      const fetchedMember = await fetchTeamMemberBySlug(slug);
      setMember(fetchedMember);
      setIsLoading(false);
    };
    getMember();
  }, [slug]);

  if (isLoading) {
    return <div className="text-center py-24 text-xl text-nsus-gray-500">Loading member...</div>;
  }

  if (!member) {
    return <NotFoundPage />;
  }

  const roleAndDepartment = `${member.role} / ${member.department}`;

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-16">
        <Breadcrumb links={[
          { name: 'People', href: '#/people' },
          { name: member.name, href: `#/people/${member.slug}` }
        ]} />

        <div className="mt-8">
          <h3 className="mt-2 tracking-tight text-nsus-gray-900">{member.name}</h3>
          <p className="caption mt-4 text-nsus-gray-500">{roleAndDepartment}</p>
        </div>

        {member.imageUrl && (
          <img src={member.imageUrl} alt={member.name} className="mt-12 w-full h-auto rounded-xl shadow-lg" />
        )}
        
        <article className="mt-12 prose prose-lg max-w-none">          
          {member.quote && (
            <blockquote>
              "{member.quote}"
            </blockquote>
          )}
          
          <div className="mt-12">
            {member.fullStory.map((item, index) => (
              <div key={index}>
                <h2>{item.q}</h2>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default PeopleDetailPage;