import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'ghost';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'default',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variantStyles = {
        default: 'bg-[#14244d] text-white font-bold hover:bg-[#b88a3f]',
        ghost: 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}; 