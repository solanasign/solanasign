import React from 'react';

interface ProgressProps {
    value: number;
    className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
    return (
        <div className={`w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden ${className}`}>
            <div
                className="h-full bg-purple-600 transition-all duration-300 ease-in-out"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}; 