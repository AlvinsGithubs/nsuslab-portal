
import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void; }> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > 4) {
                pageNumbers.push('...');
            }
            let start = Math.max(2, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);

            if (currentPage <= 4) {
                start = 2;
                end = 5;
            }
            if (currentPage > totalPages - 4) {
                start = totalPages - 4;
                end = totalPages - 1;
            }

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
            if (currentPage <= totalPages - 4) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }
        return pageNumbers;
    };

    const pages = getPageNumbers();
    
    if (totalPages <= 1) return null;

    return (
        <nav className="flex items-center justify-center space-x-1 mt-16">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-full hover:bg-nsus-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous Page"
            >
                <ArrowLeftIcon className="w-4 h-4" />
            </button>
            {pages.map((page, index) => (
                <div key={index}>
                {typeof page === 'number' ? (
                    <button
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-full text-sm font-bold ${
                            currentPage === page
                            ? 'bg-nsus-gray-900 text-white'
                            : 'bg-white text-nsus-gray-700 hover:bg-nsus-gray-100'
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span className="w-10 h-10 flex items-center justify-center text-sm font-medium text-nsus-gray-500">...</span>
                )}
                </div>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full hover:bg-nsus-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next Page"
            >
                <ArrowRightIcon className="w-4 h-4" />
            </button>
        </nav>
    );
};

export default Pagination;
