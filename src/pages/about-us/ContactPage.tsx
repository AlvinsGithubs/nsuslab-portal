
import { NavbarThemeContext } from '@/App';
import React, { useContext, useEffect } from 'react';

const InfoRow: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
    <div className={`flex flex-col md:flex-row items-start ${className}`}>
        <h6 className="w-full md:w-28 flex-shrink-0 font-bold text-nsus-gray-700 uppercase mr-24">{label}</h6>
        <h6 className="mt-1 md:mt-0 text-nsus-gray-900">{children}</h6>
    </div>
);

const ContactPage: React.FC = () => {
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
        if (navbarContext) {
            navbarContext.setNavbarTheme("light");
        }
    }, [navbarContext]);

  return (
    <div className="bg-white">
        <div className="w-full mx-auto py-12">
            
            <h2 className="max-w-screen-xl mx-auto px-4 md:px-8  text-nsus-gray-900 py-12 md:py-24">Contact</h2>
            
            <section>
                <div className="w-full h-[400px] md:h-[560px] bg-nsus-gray-200 rounded-lg overflow-hidden shadow-md">
                    <iframe
                        src="https://maps.google.com/maps?q=4F%20NSUSLAB,%20Eonju-ro%20609,%20Gangnam-gu,%20Seoul&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="NSUSLAB Location"
                    ></iframe>
                </div>
            </section>

            <section>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-12">
                    <div className="md:col-span-1">
                        <h4 className="text-nsus-gray-900 py-4">(유)앤서스랩코리아</h4>
                    </div>
                    <div className="md:col-span-2">
                        <dl className="divide-y divide-nsus-gray-200">
                            <InfoRow className="py-4" label="ADRESS">
                                서울시 강남구 언주로 609 (논현동, 팍스타워) 4층 NSUSLAB<br/>
                                4F NSUSLAB, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea
                            </InfoRow>
                            <InfoRow className="py-4" label="MAIL">info@nsuslab.com</InfoRow>
                            <InfoRow className="py-4" label="TEL">+82 070-8233-1248</InfoRow>
                        </dl>
                    </div>
                </div>
            </section>

        </div>
    </div>
);
};

export default ContactPage;
