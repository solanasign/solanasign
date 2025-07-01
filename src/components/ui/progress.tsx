import React from 'react';

interface ProgressProps {
    value: number;
    className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
    return (
        <div className={`w-full bg-[#ce9f53] dark:bg-[#ce9f53]/30 rounded-full overflow-hidden ${className}`}>
            <div
                className="h-full bg-[#ce9f53] transition-all duration-300 ease-in-out"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}; 