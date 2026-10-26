import React from 'react';
import { EcosystemModule } from '../data/mediaKitData';
import { 
  X, 
  Check, 
  Sparkles, 
  Layers
} from 'lucide-react';

interface EcosystemDetailModalProps {
  module: EcosystemModule | null;
  onClose: () => void;
}

export const EcosystemDetailModal: React.FC<EcosystemDetailModalProps> = ({
  module,
  onClose,
}) => {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0B0F19] border border-slate-700 max-w-lg w-full rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Glow behind modal */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: module.color }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: module.color }}
            >
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-purple-300">
                  {module.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {module.status}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {module.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              {module.tagline}
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              {module.description}
            </p>
          </div>

          {/* Role in Business Box */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Papel no Negócio:
            </span>
            <p className="text-xs text-slate-200">
              {module.roleInBusiness}
            </p>
          </div>

          {/* How it works */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Como funciona na prática:
            </h5>
            <div className="space-y-2">
              {module.howItWorks.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-3.5 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#5932EA] hover:bg-[#6b44f2] text-white text-xs font-bold transition-all shadow-md"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
