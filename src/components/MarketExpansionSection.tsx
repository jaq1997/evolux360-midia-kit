import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TARGET_MARKETS, 
  FECOMERCIO_SECTORS_SUMMARY 
} from '../data/mediaKitData';
import { 
  Globe, 
  Building2, 
  Users, 
  Store, 
  Truck, 
  Briefcase, 
  UtensilsCrossed
} from 'lucide-react';

export const MarketExpansionSection: React.FC = () => {
  const [activeMarketId, setActiveMarketId] = useState<string>('paraguai');

  const activeMarket = TARGET_MARKETS.find((m) => m.id === activeMarketId) || TARGET_MARKETS[0];

  return (
    <section id="mercados" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5932EA]/20 border border-[#5932EA]/40 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <span>Onde Quero Atuar</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
          Pra Quem Eu Quero Vender o Evolux Catálogo
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          Defini 3 grandes frentes para levar o catálogo ao mercado de forma prática e com alta probabilidade de sucesso.
        </p>
      </div>

      {/* 3 Market Tabs with Hover/Click Animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {TARGET_MARKETS.map((m) => {
          const isSelected = m.id === activeMarketId;
          const Icon = m.id === 'paraguai' ? Globe : m.id === 'fecomercio' ? Building2 : Users;

          return (
            <motion.button
              key={m.id}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveMarketId(m.id)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-[#5932EA] shadow-lg ring-1 ring-[#5932EA]/40'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#5932EA] text-white shadow-md' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-purple-300">
                  {m.highlightTag}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">
                {m.title}
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                {m.subtitle}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Detailed Content with AnimatePresence for Smooth Tab Switching */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeMarket.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#A78BFA] uppercase">
                  {activeMarket.highlightTag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {activeMarket.title} — {activeMarket.subtitle}
                </h3>
              </div>
              <div className="text-xs text-slate-400">
                {activeMarket.relevance}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Por que este mercado?
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeMarket.whyThisMarket}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#5932EA]/10 border border-[#5932EA]/30 space-y-1.5">
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">
                  Como vamos entrar:
                </span>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                  {activeMarket.howWeEnter}
                </p>
              </div>
            </div>
          </div>

          {/* If Fecomércio, show the 4 macro sectors cleanly */}
          {activeMarketId === 'fecomercio' && (
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Os 4 Setores do Fecomércio-RS que Vamos Atender:
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FECOMERCIO_SECTORS_SUMMARY.map((sec, idx) => {
                  const Icon =
                    idx === 0
                      ? Store
                      : idx === 1
                      ? Truck
                      : idx === 2
                      ? Briefcase
                      : UtensilsCrossed;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <div className="w-6 h-6 rounded-lg bg-[#5932EA]/20 text-[#A78BFA] flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{sec.sector}</span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Exemplos:</strong> {sec.desc}
                      </p>

                      <p className="text-[11px] text-purple-200 bg-[#5932EA]/10 p-2 rounded-xl border border-[#5932EA]/20">
                        <strong>Como o catálogo ajuda:</strong> {sec.solution}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
