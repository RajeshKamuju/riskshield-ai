import React from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  SlidersHorizontal,
  ShieldAlert,
  Briefcase,
  Cpu,
  Activity,
  Zap,
  TerminalSquare
} from 'lucide-react';

export type NavTab = 'dashboard' | 'transactions' | 'rules' | 'alerts' | 'cases' | 'simulator';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  openAlertsCount: number;
  openCasesCount: number;
  activeRulesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  openAlertsCount,
  openCasesCount,
  activeRulesCount,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'transactions' as NavTab,
      label: 'Transactions',
      icon: ArrowLeftRight,
    },
    {
      id: 'rules' as NavTab,
      label: 'Risk Rules',
      icon: SlidersHorizontal,
      badge: `${activeRulesCount} Active`,
      badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700',
    },
    {
      id: 'alerts' as NavTab,
      label: 'Fraud Alerts',
      icon: ShieldAlert,
      badge: openAlertsCount > 0 ? `${openAlertsCount}` : undefined,
      badgeColor: 'bg-rose-500 text-white font-bold',
    },
    {
      id: 'cases' as NavTab,
      label: 'Investigation Cases',
      icon: Briefcase,
      badge: openCasesCount > 0 ? `${openCasesCount}` : undefined,
      badgeColor: 'bg-amber-500 text-slate-950 font-bold',
    },
    {
      id: 'simulator' as NavTab,
      label: 'Risk Simulator',
      icon: Cpu,
    },
  ];

  return (
    <nav className="w-56 bg-slate-900 text-slate-300 flex flex-col shrink-0 select-none border-r border-slate-800/80">
      <div className="p-3 space-y-1">
        <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider font-bold text-slate-500">
          Risk Management
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick engine metrics */}
      <div className="px-4 py-3 mx-3 my-2 bg-slate-800/60 rounded-lg border border-slate-700/60 text-[11px] space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            Decision Latency
          </span>
          <span className="font-mono text-emerald-400 font-bold">12ms</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5">
            <TerminalSquare className="w-3.5 h-3.5 text-indigo-400" />
            Hybrid Model
          </span>
          <span className="font-mono text-slate-200">v3.4-GBDT</span>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="mt-auto p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-200">
            System Healthy
          </span>
        </div>
        <p className="text-[10px] text-slate-500 font-mono">Engine v3.4.1-stable (99.99%)</p>
      </div>
    </nav>
  );
};
