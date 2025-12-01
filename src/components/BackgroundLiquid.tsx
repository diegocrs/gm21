import React from 'react';

const BackgroundLiquid: React.FC = () => (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400/30 dark:bg-brand-500/20 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/30 dark:bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400/30 dark:bg-pink-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-normal"></div>
    </div>
);

export default BackgroundLiquid;
