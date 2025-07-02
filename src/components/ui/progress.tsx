import React from 'react';

interface ProgressProps {
    value: number;
    className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
    return (
        <div className={`w-full bg-[#14244d] dark:bg-[#14244d]/30 rounded-full overflow-hidden ${className}`}>
            <div
                className="h-full bg-[#14244d] transition-all duration-300 ease-in-out"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}; 