import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Dynamic Aurora blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-pastel-pink/60 to-pastel-blue/40 dark:from-teal-900/30 dark:to-emerald-800/20 blur-[130px] animate-aurora-1 mix-blend-multiply dark:mix-blend-lighten transition-colors duration-1000"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-pastel-purple/50 to-pastel-blue/50 dark:from-emerald-900/20 dark:to-teal-800/20 blur-[150px] animate-aurora-2 mix-blend-multiply dark:mix-blend-lighten transition-colors duration-1000"></div>
      
      {/* SVG Noise overlay for premium grain texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] grain-bg mix-blend-overlay"></div>
    </div>
  );
}
