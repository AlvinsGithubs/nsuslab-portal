
import React, { useState, useEffect, useContext } from 'react';
import PeopleCard from '@/components/PeopleCard';
import PageWrapper from '@/components/PageWrapper';
import { fetchAllTeamMembers } from '@/lib/contentful';
import type { TeamMember } from '@/types';
import { NavbarThemeContext } from '@/App';

const PeoplePage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
      if (navbarContext) {
        navbarContext.setNavbarTheme("light");
      }
  }, [navbarContext]);
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const getTeamMembers = async () => {
      const members = await fetchAllTeamMembers();
      setTeamMembers(members);
    };
    getTeamMembers();
  }, []);
  
  return (
    <PageWrapper 
      title="Meet Our People" 
      subtitle="Hear from the talented individuals who make NSUS LAB a great place to work."
      className="bg-nsus-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {teamMembers.map(member => <PeopleCard key={member.id} member={member} />)}
      </div>
    </PageWrapper>
  );
};

export default PeoplePage;
