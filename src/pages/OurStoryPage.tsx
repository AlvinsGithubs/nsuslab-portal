import React, { useState, useEffect, useContext } from 'react';
import { fetchAllDepartments, fetchAllTeamMembers } from '@/lib/contentful';
import type { Department, TeamMember } from '@/types';
import DepartmentCard from '@/components/DepartmentCard';
import PeopleCard from '@/components/PeopleCard';
import { NavbarThemeContext } from '@/App';

type Tab = 'all' | 'teams' | 'life';

const OurStoryPage: React.FC = () => {
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
        if (navbarContext) {
            navbarContext.setNavbarTheme("light");
        }
    }, [navbarContext]);

    const [activeTab, setActiveTab] = useState<Tab>('all');
    const [departments, setDepartments] = useState<Department[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const [departmentData, teamMemberData] = await Promise.all([
                    fetchAllDepartments(),
                    fetchAllTeamMembers(),
                ]);
                setDepartments(departmentData);
                setTeamMembers(teamMemberData);
            } catch (error) {
                console.error("Failed to load Our Story data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const renderTabs = () => (
        <div className="flex justify-center items-center space-x-2 sm:space-x-8 mb-16">
            {(['all', 'teams', 'life'] as Tab[]).map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-3xl sm:text-5xl font-bold transition-colors capitalize ${activeTab === tab ? 'text-nsus-gray-900' : 'text-nsus-gray-300 hover:text-nsus-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );

    const TeamsGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
                <DepartmentCard key={dept.id} department={dept} />
            ))}
        </div>
    );
    
    const LifeGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
                <PeopleCard key={member.id} member={member} />
            ))}
        </div>
    );

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center py-20">Loading stories...</div>;
        }

        switch (activeTab) {
            case 'all':
                return (
                    <div className="space-y-24">
                        <div>
                            <h2 className=" text-nsus-gray-900 mb-8">Teams</h2>
                            {departments.length > 0 ? <TeamsGrid /> : <p className="text-nsus-gray-500">No teams to display.</p>}
                        </div>
                        <div>
                            <h2 className="font-bold text-nsus-gray-900 mb-8">Life</h2>
                            {teamMembers.length > 0 ? <LifeGrid /> : <p className="text-nsus-gray-500">No stories to display.</p>}
                        </div>
                    </div>
                );
            case 'teams':
                return departments.length > 0 ? <TeamsGrid /> : <div className="text-center py-20 text-nsus-gray-500">No teams to display.</div>;
            case 'life':
                 return teamMembers.length > 0 ? <LifeGrid /> : <div className="text-center py-20 text-nsus-gray-500">No stories to display.</div>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-12 mb-24">
                {renderTabs()}
                {renderContent()}
            </div>
        </div>
    );
};

export default OurStoryPage;
