/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion } from 'motion/react';
import { 
  EVOLUX_PROJECT, 
  ECOSYSTEM_MODULES, 
  EcosystemModule 
} from './data/mediaKitData';
import { HeaderNav } from './components/HeaderNav';
import { ThreeEcosystemOrbit } from './components/ThreeEcosystemOrbit';
import { InteractiveCatalogDemo } from './components/InteractiveCatalogDemo';
import { MarketExpansionSection } from './components/MarketExpansionSection';
import { EcosystemDetailModal } from './components/EcosystemDetailModal';
import { Footer } from './components/Footer';
import { 
  ShoppingBag, 
  ArrowDown, 
  Layers, 
  Bot, 
  Database, 
  Sparkles, 
  ScanLine, 
  CreditCard,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

// Reusable scroll animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export default function App() {
  const [selectedModule, setSelectedModule] = useState<EcosystemModule | null>(null);

  // Lenis smooth scrolling for sleek presentation
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-[#5932EA] selection:text-white">
      {/* Top Header with Scroll Progress Bar */}
      <HeaderNav />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* 1. APRESENTAÇÃO DO PROJETO & VISÃO GERAL                                 */}
        {/* ========================================================================= */}
        <motion.section 
          id="projeto" 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="pt-4 sm:pt-8 text-center max-w-3xl mx-auto space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-2"
          >
            <img
              src="/public/assets/logo-evolux-white.svg"
              alt="Evolux360"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5932EA]/20 border border-[#5932EA]/40 text-[#A78BFA] text-xs font-semibold uppercase tracking-wider"
          >
            <span>Apresentação do Projeto</span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
          >
            O que é a <span className="text-[#A78BFA]">Evolux360</span>?
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            A <strong>Evolux360</strong> é um ecossistema de gestão pensado para pequenos e médios negócios. Cada solução trata de uma parte da operação: desde a vitrine digital e o primeiro atendimento, até o estoque, emissão de notas e inteligência de vendas.
          </motion.p>

          {/* 3 Pilares do Meu Momento com animação staggered */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1 transition-colors hover:border-slate-700"
            >
              <div className="w-7 h-7 rounded-lg bg-[#5932EA]/20 text-purple-300 flex items-center justify-center font-bold text-xs mb-2">
                1
              </div>
              <h4 className="text-xs font-bold text-white">A Visão 360°</h4>
              <p className="text-[11px] text-slate-400">
                Uma suíte modular onde cada módulo resolve uma dor sem engessar o lojista.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-[#5932EA]/15 border border-[#5932EA]/40 space-y-1 transition-colors hover:border-[#5932EA]"
            >
              <div className="w-7 h-7 rounded-lg bg-[#5932EA] text-white flex items-center justify-center font-bold text-xs mb-2 shadow-sm">
                2
              </div>
              <h4 className="text-xs font-bold text-white">O Foco: Catálogo</h4>
              <p className="text-[11px] text-purple-200">
                A porta de entrada sem mensalidade e sem taxas. O cliente pede e chega no WhatsApp.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1 transition-colors hover:border-slate-700"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs mb-2">
                3
              </div>
              <h4 className="text-xs font-bold text-white">Pra Quem Vender</h4>
              <p className="text-[11px] text-slate-400">
                Paraguai (mar azul), Rio Grande do Sul (Fecomércio) e reativação da base de clientes.
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-2">
            <a
              href="#ecossistema360"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span>Explorar a visão 360 abaixo</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </motion.section>

        {/* ========================================================================= */}
        {/* 2. VISÃO 360° DO PROJETO COM THREE.JS                                    */}
        {/* ========================================================================= */}
        <motion.section 
          id="ecossistema360" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="scroll-mt-24 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>O Ecossistema Completo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Como as Soluções se Conectam
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              O <strong>Core</strong> fica no centro guardando dados de CRM e estoque, enquanto cada módulo atende uma necessidade da loja.
            </p>
          </div>

          {/* 3D Orbit Interactive */}
          <ThreeEcosystemOrbit onSelectModule={(mod) => setSelectedModule(mod)} />

          {/* 6 Modules Grid com animação suave de revelação em cascata */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2"
          >
            {ECOSYSTEM_MODULES.map((mod) => {
              const Icon =
                mod.id === 'catalogo'
                  ? ShoppingBag
                  : mod.id === 'vendeai'
                  ? Bot
                  : mod.id === 'core'
                  ? Database
                  : mod.id === 'evolux_ai'
                  ? Sparkles
                  : mod.id === 'vision'
                  ? ScanLine
                  : CreditCard;

              return (
                <motion.div
                  key={mod.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedModule(mod)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    mod.id === 'catalogo'
                      ? 'bg-slate-900 border-[#5932EA] shadow-md ring-1 ring-[#5932EA]/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                        style={{ backgroundColor: mod.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-900 text-purple-300 border border-slate-800">
                        {mod.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                      {mod.name}
                    </h4>
                    <span className="text-[11px] text-purple-300 font-medium block mt-0.5">
                      {mod.tagline}
                    </span>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {mod.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold">
                    <span>Ver detalhes</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* ========================================================================= */}
        {/* 3. EVOLUX CATÁLOGO: O FOCO PRINCIPAL AGORA                                */}
        {/* ========================================================================= */}
        <motion.section 
          id="catalogo" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="scroll-mt-24 space-y-8"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5932EA] text-white text-xs font-bold uppercase tracking-wider shadow-md">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>O Meu Foco Principal</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Evolux Catálogo: A Porta de Entrada
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Uma alternativa para micro e pequenos negócios terem sua loja/vitrine virtual <strong>sem mensalidade, sem taxas e sem surpresas</strong>. O cliente faz o pedido no celular e a loja recebe direto no WhatsApp para finalizar.
            </p>
          </div>

          {/* 4 Core Pillars of the Catalog */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
          >
            {EVOLUX_PROJECT.catalogFocus.benefits.map((b, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 transition-colors hover:border-slate-700"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{b.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Live Simulator with Sport Closet, Delivery, and Madeireiras */}
          <InteractiveCatalogDemo />
        </motion.section>

        {/* ========================================================================= */}
        {/* 4. PRA QUEM QUERO VENDER (OS 3 MERCADOS)                                  */}
        {/* ========================================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
        >
          <MarketExpansionSection />
        </motion.div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Module Detail Modal */}
      <EcosystemDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />
    </div>
  );
}
