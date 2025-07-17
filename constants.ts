
import type { NavLink } from './types';
import React from 'react';
import { BriefcaseIcon } from './components/icons/BriefcaseIcon';
import { GlobeIcon } from './components/icons/GlobeIcon';

export const NAV_LINKS: NavLink[] = [
  {
    nameKey: 'nav_about_us',
    href: '#/about',
    subLinks: [
      { nameKey: 'nav_about_us_sub_who_we_are', href: '#/about' },
      { nameKey: 'nav_about_us_sub_history', href: '#/history' },
      { nameKey: 'nav_about_us_sub_contact', href: '#/contact' },
    ]
  },
  {
    nameKey: 'nav_what_we_do',
    href: '#/departments',
  },
  {
    nameKey: 'nav_newsroom',
    href: '#/news',
    subLinks: [
      { nameKey: 'nav_newsroom_sub_press_release', href: '#/news' },
      { nameKey: 'nav_newsroom_sub_business_updates', href: '#/business-updates' },
    ],
  },
  {
    nameKey: 'nav_career',
    href: '#/careers',
    subLinks: [
      { nameKey: 'nav_career_sub_jobs', href: '#/careers' },
      { nameKey: 'nav_career_sub_road_to_nsus', href: '#/road-to-nsus' },
      { nameKey: 'nav_career_sub_culture', href: '#/culture' },
      { nameKey: 'nav_career_sub_our_story', href: '#/our-story' },
      { nameKey: 'nav_career_sub_benefits', href: '#/benefits' },
      { nameKey: 'nav_career_sub_financial_info', href: '#/financial-info' }, 
    ],
  },
];

export const ICON_MAP: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  briefcase: BriefcaseIcon,
  globe: GlobeIcon,
};

// New constants for CareersPage filters
export const JOB_GROUP_OPTIONS = [
  'Artist',
  'Operator',
  'Project Manager',
  'Quality Assurance',
  'Software Designer',
  'Software Engineer',
] as const;

export const CAREER_LEVEL_OPTIONS = ['경력'] as const;

export const EMPLOYMENT_TYPE_OPTIONS = ['정규직'] as const;

export const LOCATION_OPTIONS = ['NSUSLAB KOREA'] as const;

export const FILTER_OPTIONS = {
    employmentType: ['All', ...EMPLOYMENT_TYPE_OPTIONS],
    careerLevel: ['All', ...CAREER_LEVEL_OPTIONS],
    location: ['All', ...LOCATION_OPTIONS],
};