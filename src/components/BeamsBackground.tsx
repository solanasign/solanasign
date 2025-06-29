import React from 'react';

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

export default function BeamsBackground({
    className,
    intensity = "subtle",
    children
}: AnimatedGradientBackgroundProps) {
    const opacityMap = {
        subtle: 0.3,
        medium: 0.5,
        strong: 0.7,
    };

    return (
        <div className={`relative min-h-screen w-full overflow-hidden bg-neutral-950 ${className || ''}`}>
            {/* Static gradient background */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/20 to-blue-900/20"
                style={{
                    opacity: opacityMap[intensity]
                }}
            />
            
            {/* Animated gradient overlay */}
            <div 
                className="absolute inset-0"
                style={{
                    background: `
                        linear-gradient(45deg, 
                            rgba(76, 29, 149, ${opacityMap[intensity] * 0.3}) 0%,
                            rgba(124, 58, 237, ${opacityMap[intensity] * 0.2}) 25%,
                            rgba(99, 102, 241, ${opacityMap[intensity] * 0.3}) 50%,
                            rgba(124, 58, 237, ${opacityMap[intensity] * 0.2}) 75%,
                            rgba(76, 29, 149, ${opacityMap[intensity] * 0.3}) 100%
                        )
                    `,
                    backgroundSize: '400% 400%',
                    animation: 'gradient 15s ease infinite',
                }}
            />

            {/* Subtle noise texture */}
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            <style>
                {`
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}
            </style>
        </div>
    );
} 