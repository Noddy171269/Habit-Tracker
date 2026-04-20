import React from 'react';

export default function Sidebar({ activeSlide, setActiveSlide }) {
  const slides = [
    { id: 'habits', label: 'Habits', icon: '📝' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'insights', label: 'Insights', icon: '💡' },
  ];

  return (
    <div className="w-full md:w-64 shrink-0 p-4 md:p-6 glass rounded-2xl md:min-h-[calc(100vh-120px)] flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto border-none self-start sticky top-24 z-10 box-border">
      <h3 className="hidden md:block text-sm font-bold uppercase tracking-widest text-[#94a3b8] mb-4">Navigation</h3>
      {slides.map(slide => (
        <button
          key={slide.id}
          onClick={() => setActiveSlide(slide.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap overflow-hidden relative group ${
            activeSlide === slide.id
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30'
              : 'text-slate-300 border border-transparent hover:bg-slate-800/40 hover:text-white'
          }`}
        >
          {activeSlide === slide.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none rounded-xl" />
          )}
          <span className="text-xl z-10 drop-shadow-md group-hover:scale-110 transition-transform">{slide.icon}</span>
          <span className="z-10 tracking-wide">{slide.label}</span>
        </button>
      ))}
    </div>
  );
}
