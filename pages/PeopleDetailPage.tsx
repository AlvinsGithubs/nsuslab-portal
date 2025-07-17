
import React, { useState, useEffect } from 'react';
import { fetchTeamMemberBySlug } from '../lib/contentful';
import type { TeamMember } from '../types';
import NotFoundPage from './NotFoundPage';
import Breadcrumb from '../components/Breadcrumb';

interface PeopleDetailPageProps {
  slug: string;
}

const PeopleDetailPage: React.FC<PeopleDetailPageProps> = ({ slug }) => {
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
    return <div>Loading...</div>; // 간단한 로딩 표시
  }

  if (!member) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-nsus-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <Breadcrumb links={[
                { name: 'Home', href: '#/' },
                { name: 'People', href: '#/people' },
                { name: member.name, href: `#/people/${member.slug}` }
            ]} />
            
            <div className="mt-8 text-center">
                <img className="w-60 h-60 rounded-full mx-auto shadow-lg" src={member.imageUrl} alt={member.name} />
                <h1 className="mt-6 text-4xl font-bold text-nsus-gray-900">{member.name}</h1>
                <p className="mt-2 text-xl text-nsus-blue font-semibold">{member.role} / {member.department}</p>
            </div>

            <article className="mt-16 bg-white rounded-lg shadow-lg p-8 sm:p-12 prose prose-lg max-w-none prose-h2:font-bold prose-h2:text-2xl prose-h2:text-nsus-gray-900 prose-p:text-nsus-gray-900">
                <blockquote className="border-l-4 border-nsus-blue pl-4 italic text-2xl font-medium text-nsus-gray-900">
                    "{member.quote}"
                </blockquote>
                
                <div className="mt-12 space-y-8 text-nsus-gray-900">
                    {member.fullStory.map((item, index) => (
                        <div key={index}>
                            <h2 className="font-bold ">{item.q}</h2>
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
