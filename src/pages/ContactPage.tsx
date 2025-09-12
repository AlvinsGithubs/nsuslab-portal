import React, { useContext, useEffect } from "react";
import { NavbarThemeContext } from '@/App';

const InfoRow: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className }) => (
  <div className={`flex flex-col md:flex-row items-start ${className}`}>
    <dt className="w-full md:w-28 flex-shrink-0 font-bold text-nsus-gray-700 uppercase">
      {label}
    </dt>
    <dd className="mt-1 md:mt-0 text-nsus-gray-900">{children}</dd>
  </div>
);

const GroupInfo: React.FC<{ name: string; address: string; mail: string }> = ({
  name,
  address,
  mail,
}) => (
  <div className="py-6">
    <h3 className="text-xl font-bold text-nsus-gray-900 mb-2">{name}</h3>
    <InfoRow label="ADRESS" className="py-2">
      {address}
    </InfoRow>
    <InfoRow label="MAIL" className="py-2">
      {mail}
    </InfoRow>
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-5xl font-bold text-nsus-gray-900 mb-20">Contact</h1>

        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold text-nsus-gray-900">
                엔서스랩코리아
              </h2>
            </div>
            <div className="md:col-span-2">
              <dl className="divide-y divide-nsus-gray-200">
                <InfoRow className="py-4" label="ADRESS">
                  서울시 강남구 언주로 609 (논현동, 팍스타워) 4층 NSUSLAB
                  <br />
                  4F NSUSLAB, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea
                </InfoRow>
                <InfoRow className="py-4" label="MAIL">
                  info@nsuslab.com
                </InfoRow>
                <InfoRow className="py-4" label="TEL">
                  +82 070-8233-1248
                </InfoRow>
              </dl>
            </div>
          </div>
        </section>

        <section className="my-20">
          <div className="w-full h-[400px] md:h-[500px] bg-nsus-gray-200 rounded-lg overflow-hidden shadow-md">
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
          <h2 className="text-3xl font-bold text-nsus-gray-900 mb-4">
            NSUSGROUP
          </h2>
          <div className="divide-y divide-nsus-gray-200">
            <GroupInfo
              name="NSUS Group Inc."
              address="4F NSUSLAB, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea"
              mail="info@nsuslab.com"
            />
            <GroupInfo
              name="NSUS Ltd."
              address="4F NSUSLAB, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea"
              mail="info@nsuslab.com"
            />
            <GroupInfo
              name="NSUS Malta Ltd."
              address="4F NSUSLAB, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea"
              mail="info@nsuslab.com"
            />
            <GroupInfo
              name="GGProduction"
              address="4F NSUSLAB, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea"
              mail="info@nsuslab.com"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
