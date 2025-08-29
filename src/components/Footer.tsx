import React from 'react';

// 소셜 아이콘 링크를 위한 재사용 컴포넌트
const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
        {children}
    </a>
);

// LinkedIn 아이콘 SVG 컴포넌트
const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

// Footer 링크를 위한 재사용 컴포넌트
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <li>
        <a href={href} className="text-nsus-gray-500 hover:text-nsus-gray-900 hover:underline">
            {children}
        </a>
    </li>
);


const Footer: React.FC = () => {
    return (
        <footer className="bg-nsus-gray-100 border-t border-nsus-gray-200">
            <div className="text-base max-w-[1600px] mx-auto px-6 py-16 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Left Section: Logo and Socials */}
                    <div className="col-span-1 md:col-span-12 lg:col-span-4 pb-6 lg:pb-0">
                        <div className="mb-6">
                            <a href="#/" className="flex-none text-3xl font-bold text-nsus-gray-900">
                                NSUSLAB
                            </a>
                        </div>
                        <div className="text-sm text-nsus-gray-500 mb-4 ">
                            Copyright 2025 NSUSLAB. All rights reserved.
                        </div>
                        <div className="flex items-center space-x-5 ">
                            <SocialIcon href="https://www.linkedin.com/company/nsusgroup/posts/?feedView=all">
                                <LinkedInIcon />
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Right Section: Links */}
                    <div className="col-span-1 md:col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                            {/* About Us Column */}
                            <div>
                                <h4 className="font-bold text-nsus-gray-900 mb-4">About Us</h4>
                                <ul className="space-y-3">
                                    <FooterLink href="#/about">Who we are</FooterLink>
                                    <FooterLink href="#/history">History</FooterLink>
                                    <FooterLink href="#/contact">Contact</FooterLink>
                                </ul>
                            </div>

                            {/* What We Do Column */}
                            <div>
                                <a href="#/departments">
                                    <h4 className="font-bold text-nsus-gray-900 mb-4">What We Do</h4>
                                </a>
                            </div>

                            {/* Newsroom Column */}
                            <div>
                                <h4 className="font-bold text-nsus-gray-900 mb-4">Newsroom</h4>
                                <ul className="space-y-3">
                                    <FooterLink href="#/news">Press release</FooterLink>
                                    <FooterLink href="#/business-updates">Business updates</FooterLink>
                                </ul>
                            </div>

                            {/* Career Column */}
                            <div>
                                <h4 className="font-bold text-nsus-gray-900 mb-4">Career</h4>
                                <ul className="space-y-3">
                                    <FooterLink href="#/careers">Jobs</FooterLink>
                                    <FooterLink href="#/road-to-nsus">Road to NSUS</FooterLink>
                                    <FooterLink href="#/culture">Culture</FooterLink>
                                    <FooterLink href="#/benefits">Benefits</FooterLink>
                                    {/* 아래 두 링크는 현재 라우팅에 없어 비활성화 처리했습니다. 필요시 href를 추가해주세요. */}
                                    <li><span className="text-nsus-gray-500">Teams@NSUSLAB</span></li>
                                    <li><span className="text-nsus-gray-500">Life@NSUSLAB</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;