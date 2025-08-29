
import React, { useState } from 'react';
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import PageWrapper from "@/components/PageWrapper";

const faqs = [
    { q: 'What is the application process like?', a: 'The process typically includes an initial application review, one or more interviews with the hiring team, and a final decision. The specifics can vary by role.' },
    { q: 'What kind of benefits do you offer?', a: 'We offer a comprehensive benefits package including health insurance, wellness programs, generous paid time off, and opportunities for professional development. Visit our Benefits page for more details.' },
    { q: 'Do you offer remote work options?', a: 'Many of our roles offer flexibility, including hybrid and remote work options, depending on the team and role requirements.' },
    { q: 'How can I prepare for an interview at NSUS LAB?', a: 'We recommend reviewing the job description thoroughly, preparing examples of your past work that align with the role, and thinking about how your skills and experience can contribute to our team. Be prepared to discuss your technical skills and problem-solving abilities.' },
];

const FaqItem: React.FC<{q: string; a: string}> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-nsus-gray-200 py-6">
            <dt>
                <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left text-nsus-gray-700">
                    <span className="text-lg font-medium">{q}</span>
                    <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
                    </span>
                </button>
            </dt>
            {isOpen && (
                <dd className="mt-2 pr-12">
                    <p className="text-base text-nsus-gray-500">{a}</p>
                </dd>
            )}
        </div>
    );
};

const FaqPage: React.FC = () => {
  return (
    <PageWrapper 
      title="Frequently Asked Questions" 
      subtitle="Find answers to common questions about applying and working at NSUS LAB."
      containerClassName="max-w-4xl"
    >
        <dl className="space-y-4">
            {faqs.map(faq => <FaqItem key={faq.q} {...faq} />)}
        </dl>
    </PageWrapper>
  );
};

export default FaqPage;
