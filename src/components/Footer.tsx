import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-6 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <img
            src="/public/assets/logo-evolux-white.svg"
            alt="Evolux360"
            className="h-6 w-auto object-contain"
          />
          <span className="text-slate-500 text-[11px] hidden md:inline">
            • Ecossistema de gestão para pequenos e médios negócios
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-[#5932EA]" />
          <span>Evolux360 • Apresentação do Projeto & Foco em Catálogo</span>
        </div>
      </div>
    </footer>
  );
};
