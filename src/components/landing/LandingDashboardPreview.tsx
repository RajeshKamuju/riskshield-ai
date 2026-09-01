import React from 'react';
import { 
  ArrowRight, 
  Activity, 
  ShieldAlert, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldX, 
  Layers,
  Clock,
  Eye,
  Sliders
} from 'lucide-react';

interface LandingDashboardPreviewProps {
  onOpenDashboard: (tab?: string) => void;
}

export function LandingDashboardPreview({ onOpenDashboard }: LandingDashboardPreviewProps) {
  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              <span>Operations Console</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
              Live risk intelligence{' '}
              <span className="text-emerald-900 block">at your fingertips.</span>
            </h2>
            <p className="mt-4 text-lg text-stone-600 leading-relaxed">
              Experience the full Risk Operations platform built for fraud analysts, risk engineering teams, and compliance officers to monitor, investigate, and prevent losses in real time.
            </p>
          </div>

          <button
            onClick={() => onOpenDashboard('dashboard')}
            className="inline-flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white text-sm font-semibold px-6 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer border border-emerald-800 shrink-0 group"
          >
            <span>Open Risk Operations</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Embedded Interactive Dashboard Preview Frame */}
        <div className="bg-white rounded-2xl border border-stone-300 shadow-xl overflow-hidden">
          
          {/* Top Fake Window Bar */}
          <div className="bg-stone-900 text-white px-5 py-3.5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-stone-400 font-semibold pl-2 border-l border-stone-700">
                RiskShield Operations Console • Live Telemetry Feed
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">STREAMING</span>
            </div>
          </div>

          {/* Mini Dashboard Workspace */}
          <div className="p-6 sm:p-8 space-y-6 bg-stone-50/50">
            
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                <div className="text-xs text-stone-500 font-medium">24h Transaction Volume</div>
                <div className="text-2xl font-extrabold font-mono text-stone-900 mt-1">₹4.82 Cr</div>
                <div className="text-[11px] text-emerald-700 font-mono flex items-center gap-1 mt-1 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12.4% vs yesterday</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                <div className="text-xs text-stone-500 font-medium">Average Risk Score</div>
                <div className="text-2xl font-extrabold font-mono text-stone-900 mt-1">14.2 / 100</div>
                <div className="text-[11px] text-emerald-700 font-mono flex items-center gap-1 mt-1 font-semibold">
                  <TrendingDown className="w-3 h-3" />
                  <span>-1.8pts lower risk baseline</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                <div className="text-xs text-stone-500 font-medium">Active High-Risk Alerts</div>
                <div className="text-2xl font-extrabold font-mono text-rose-600 mt-1">3 Urgent</div>
                <div className="text-[11px] text-rose-700 font-mono flex items-center gap-1 mt-1 font-semibold">
                  <ShieldAlert className="w-3 h-3" />
                  <span>Auto-triaged to queue</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                <div className="text-xs text-stone-500 font-medium">Zero-Friction Approval Rate</div>
                <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">98.4%</div>
                <div className="text-[11px] text-stone-500 font-mono mt-1">
                  1.2% Block • 0.4% Review
                </div>
              </div>
            </div>

            {/* Distribution Bar & Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Risk Distribution Visual */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-700">
                  <span>RISK DISTRIBUTION (TODAY)</span>
                  <span>14,290 TOTAL EVALUATIONS</span>
                </div>

                <div className="h-3.5 w-full rounded-full flex overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '84%' }} title="Low: 84%" />
                  <div className="bg-stone-400 h-full" style={{ width: '10%' }} title="Medium: 10%" />
                  <div className="bg-amber-500 h-full" style={{ width: '4%' }} title="High: 4%" />
                  <div className="bg-rose-600 h-full" style={{ width: '2%' }} title="Critical: 2%" />
                </div>

                <div className="grid grid-cols-4 gap-2 text-[11px] font-mono pt-1">
                  <div className="text-emerald-700 font-bold">84% Low (Approve)</div>
                  <div className="text-stone-600 font-bold">10% Medium (Monitor)</div>
                  <div className="text-amber-700 font-bold">4% High (Review)</div>
                  <div className="text-rose-700 font-bold">2% Critical (Block)</div>
                </div>
              </div>

              {/* Fraud Trend Visual */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-700">
                  <span>24H ANOMALY SURGE TREND</span>
                  <span className="text-emerald-700">99.8% FRAUD MITIGATED</span>
                </div>

                {/* Subtle Bar Sparkline */}
                <div className="flex items-end gap-1.5 h-12 pt-2">
                  {[12, 18, 14, 22, 19, 38, 85, 42, 28, 16, 14, 11, 9, 15, 20, 18].map((val, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-xs transition-all ${
                        val > 50 ? 'bg-rose-500' : val > 30 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ height: `${(val / 85) * 100}%` }}
                      title={`Hour ${i + 1}: ${val} anomaly points`}
                    />
                  ))}
                </div>

                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>00:00</span>
                  <span>08:00 (Attack Burst Mitigated)</span>
                  <span>Now</span>
                </div>
              </div>

            </div>

            {/* High-Risk Live Ledger Preview */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="px-5 py-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-700 uppercase">
                  Recent High-Priority Interceptions
                </span>
                <span className="text-xs text-stone-500 font-mono">Real-Time Decision Stream</span>
              </div>

              <div className="divide-y divide-stone-100 font-mono text-xs">
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                      BLOCK (92)
                    </span>
                    <span className="font-bold text-stone-900">TXN-92841</span>
                    <span className="text-stone-600 font-sans">Rahul Verma • Tor Exit Node Anomaly</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-stone-900">₹75,000</span>
                    <span className="text-stone-400 text-[11px]">11ms</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                      BLOCK (94)
                    </span>
                    <span className="font-bold text-stone-900">TXN-10928</span>
                    <span className="text-stone-600 font-sans">Scripted Client • 14x Micro Card Test</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-stone-900">₹120</span>
                    <span className="text-stone-400 text-[11px]">8ms</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                      REVIEW (74)
                    </span>
                    <span className="font-bold text-stone-900">TXN-55912</span>
                    <span className="text-stone-600 font-sans">Rohan Sengupta • Geo Velocity Jump</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-stone-900">₹14,500</span>
                    <span className="text-stone-400 text-[11px]">14ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Callout Bar to Open Workbench */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                Includes full Rule Engine manager, Fraud Alerts triage, and Investigation Case dossiers.
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenDashboard('rules')}
                  className="text-xs font-mono text-stone-700 hover:text-stone-900 px-3 py-2 rounded-md hover:bg-stone-200/60 transition-colors cursor-pointer"
                >
                  View Rule Manager →
                </button>
                <button
                  onClick={() => onOpenDashboard('cases')}
                  className="text-xs font-mono text-stone-700 hover:text-stone-900 px-3 py-2 rounded-md hover:bg-stone-200/60 transition-colors cursor-pointer"
                >
                  View Case Dossiers →
                </button>
                <button
                  onClick={() => onOpenDashboard('dashboard')}
                  className="inline-flex items-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  <span>Launch Live Operations</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
