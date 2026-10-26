import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

export const HeaderNav: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Official Evolux Logo with SVG text in white */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/assets/logo-evolux-white.svg"
            alt="Evolux360"
            className="h-7 sm:h-9 w-auto object-contain"
          />
        </a>

        {/* Clean, Focused Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#projeto" className="hover:text-purple-300 transition-colors">
            O que é a Evolux360
          </a>
          <a href="#ecossistema360" className="hover:text-purple-300 transition-colors">
            Visão 360°
          </a>
          <a href="#catalogo" className="hover:text-purple-300 transition-colors flex items-center gap-1.5 text-purple-300 font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            Evolux Catálogo (Foco)
          </a>
          <a href="#mercados" className="hover:text-purple-300 transition-colors">
            Pra Quem Vender
          </a>
        </nav>

        {/* Action button straight to the core focus */}
        <div className="flex items-center gap-2">
          <a
            href="#catalogo"
            className="py-2 px-3.5 sm:px-4 rounded-xl bg-[#5932EA] hover:bg-[#6e46ff] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ver Catálogo</span>
          </a>
        </div>
      </div>

      {/* Smooth Scroll Progress Bar */}
      <motion.div
        className="h-[2.5px] bg-gradient-to-r from-[#5932EA] via-[#7C5CFC] to-purple-400 origin-left"
        style={{ scaleX }}
      />
    </header>
  );
};
