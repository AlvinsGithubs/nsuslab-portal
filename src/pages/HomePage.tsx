import React, { useState, useEffect, useContext } from "react";
import HeroSlider from "@/components/HeroSlider";
import JobCard from "@/components/JobCard";
import DepartmentCard from "@/components/DepartmentCard";
import PeopleCard from "@/components/PeopleCard";
import BenefitCard from "@/components/BenefitCard";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import {
  fetchFeaturedJobs,
  fetchAllDepartments,
  fetchAllTeamMembers,
  fetchAllBenefits,
} from "@/lib/contentful";
import type { Job, Department, TeamMember, Benefit } from "@/types"; // Department 추가
import { useLanguage } from "@/contexts/LanguageContext";
import { NavbarThemeContext } from "@/App";

const HomePage: React.FC = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]); // benefits state 추가
  const { t } = useLanguage();

  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("dark");
    }
  }, [navbarContext]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobs, depts, members, fetchedBenefits] = await Promise.all([
          fetchFeaturedJobs(),
          fetchAllDepartments(),
          fetchAllTeamMembers(),
          fetchAllBenefits(),
        ]);
        setFeaturedJobs(jobs);
        setDepartments(depts);
        setTeamMembers(members);
        setBenefits(fetchedBenefits); // state 업데이트
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();
    window.location.hash = path;
  };

  const Section: React.FC<{
    id: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    className?: string;
    link?: string;
    linkText?: string;
  }> = ({ id, title, subtitle, children, className, link, linkText }) => (
    <section id={id} className={`py-24 ${className || "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-nsus-gray-900">{title}</h2>
          <p className="mt-4 text-lg text-nsus-gray-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="mt-12">{children}</div>
        {link && linkText && (
          <div className="mt-12 text-center">
            <a
              href={link}
              onClick={(e) => navigate(e, link)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-nsus-blue hover:bg-blue-700 transition-transform hover:scale-105"
            >
              {linkText}
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <div>
      <HeroSlider />

      <Section
        id="careers"
        title={t("home_section_featured_positions_title")}
        subtitle={t("home_section_featured_positions_subtitle")}
        className="bg-nsus-gray-100"
        link="#/careers"
        linkText={t("home_section_featured_positions_button")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </Section>

      <Section
        id="departments"
        title={t("home_section_our_teams_title")}
        subtitle={t("home_section_our_teams_subtitle")}
        link="#/departments"
        linkText={t("home_section_our_teams_button")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </Section>

      <Section
        id="people"
        title={t("home_section_meet_our_people_title")}
        subtitle={t("home_section_meet_our_people_subtitle")}
        className="bg-nsus-gray-100"
        link="#/our-story"
        linkText={t("home_section_meet_our_people_button")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(0, 3).map((member) => (
            <PeopleCard key={member.id} member={member} />
          ))}
        </div>
      </Section>

      <Section
        id="benefits"
        title={t("home_section_perks_benefits_title")}
        subtitle={t("home_section_perks_benefits_subtitle")}
        link="#/benefits"
        linkText={t("home_section_perks_benefits_button")}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </Section>

      <Section
        id="culture"
        title={t("home_section_culture_value_title")}
        subtitle={t("home_section_culture_value_subtitle")}
        link="#/culture"
        linkText={t("home_section_culture_value_button")}
      >
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://picsum.photos/seed/culture/1200/500"
            alt="Company Culture"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              className="bg-white/20 backdrop-blur-sm rounded-full p-6 text-white hover:bg-white/30 transition-colors"
              onClick={() => (window.location.hash = "#/culture")}
            >
              <PlayIcon className="w-12 h-12" />
            </button>
          </div>
        </div>
      </Section>

      <div className="bg-nsus-blue">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">{t("home_cta_ready_to_dive_in")}</span>
            <span className="block text-blue-200">
              {t("home_cta_start_your_journey")}
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#/careers"
                onClick={(e) => navigate(e, "#/careers")}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-nsus-blue bg-white hover:bg-nsus-light-blue"
              >
                {t("home_cta_view_open_roles")}
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
