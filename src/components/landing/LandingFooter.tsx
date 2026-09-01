import React from 'react';
import { ShieldCheck, ArrowUpRight, Terminal, Globe, Heart } from 'lucide-react';

interface LandingFooterProps {
  onOpenDashboard: (tab?: string) => void;
}

export function LandingFooter({ onOpenDashboard }: LandingFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                RiskShield <span className="text-emerald-400 font-semibold">AI</span>
              </span>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs max-w-sm">
              Intelligent Payment Risk &amp; Fraud Decisioning Platform. Engineered with explainable factor scoring, multi-signal anomaly detection, and interactive analyst operations.
            </p>

            {/* Status Beacon */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Decision Engine Kernel: Online (p99 &lt; 15ms)</span>
            </div>
          </div>

          {/* Col 2: Platform Modules */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono font-bold text-white uppercase text-[11px] tracking-wider">
              Platform Modules
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenDashboard('dashboard')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Live Operations Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard('transactions')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Transaction Ledger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard('rules')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Rule Engine Manager
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard('alerts')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Fraud Alert Queue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard('cases')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Investigation Workbench
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Risk Intelligence & Scenarios */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono font-bold text-white uppercase text-[11px] tracking-wider">
              Scenarios &amp; Labs
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenDashboard('simulator')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Risk Simulation Lab
                </button>
              </li>
              <li>
                <span className="text-stone-500">Card Testing Defense</span>
              </li>
              <li>
                <span className="text-stone-500">Account Takeover (ATO)</span>
              </li>
              <li>
                <span className="text-stone-500">Geo Velocity Analysis</span>
              </li>
              <li>
                <span className="text-stone-500">Device Fingerprinting</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Architecture & Portfolio */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono font-bold text-white uppercase text-[11px] tracking-wider">
              Architecture &amp; Portfolio
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              RiskShield AI is an independent software engineering portfolio project demonstrating real-world fintech payment risk, sub-15ms pre-auth decisioning, and explainable AI paradigms.
            </p>
            <div className="pt-1">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
              >
                <span>↑ Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-mono">
          <div>
            © 2026 RiskShield AI • Intelligent Payment Risk &amp; Fraud Decisioning Platform.
          </div>
          <div>
            Built with modern fintech engineering &amp; high-density design principles.
          </div>
        </div>

      </div>
    </footer>
  );
}
