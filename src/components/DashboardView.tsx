import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Filter,
  Download,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Transaction } from '../types';

interface DashboardViewProps {
  transactions: Transaction[];
  selectedTx: Transaction | null;
  onSelectTx: (tx: Transaction) => void;
  onViewCase: (txId: string) => void;
  onOpenSimulator: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  transactions,
  selectedTx,
  onSelectTx,
  onViewCase,
  onOpenSimulator,
}) => {
  // Current active inspected transaction (fallback to highest risk or first if none selected)
  const inspectedTx = selectedTx || transactions[0] || null;

  // Calculate live stats
  const totalVolume = transactions.reduce((acc, tx) => acc + tx.amount, 4284500);
  const avgScore =
    transactions.length > 0
      ? (transactions.reduce((acc, tx) => acc + tx.riskScore, 0) / transactions.length).toFixed(1)
      : '42.8';

  const approvals = transactions.filter((t) => t.decision === 'APPROVE').length;
  const reviews = transactions.filter((t) => t.decision === 'REVIEW' || t.decision === 'MONITOR').length;
  const blocks = transactions.filter((t) => t.decision === 'BLOCK').length;
  const totalDecisions = transactions.length || 1;

  const approvalPercent = Math.round((approvals / totalDecisions) * 100);
  const reviewPercent = Math.round((reviews / totalDecisions) * 100);
  const blockPercent = Math.round((blocks / totalDecisions) * 100);

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case 'BLOCK':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'MONITOR':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'REVIEW':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'APPROVE':
      default:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'HIGH':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'MEDIUM':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'LOW':
      default:
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-rose-600';
    if (score >= 50) return 'text-amber-600';
    if (score >= 25) return 'text-orange-500';
    return 'text-emerald-600';
  };

  return (
    <main className="flex-1 flex flex-col p-4 md:p-6 gap-4 md:gap-5 overflow-hidden bg-slate-50">
      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 shrink-0">
        {/* Card 1: Total Volume */}
        <div className="bg-white p-3.5 md:p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Total Volume (24h)
          </p>
          <p className="text-xl md:text-2xl font-bold mt-1 text-slate-900 font-mono">
            ₹{totalVolume.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>12.5% vs yesterday</span>
          </div>
        </div>

        {/* Card 2: Avg Risk Score */}
        <div className="bg-white p-3.5 md:p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Avg Risk Score
          </p>
          <p className="text-xl md:text-2xl font-bold mt-1 text-amber-600 font-mono">
            {avgScore}
          </p>
          <p className="text-xs text-slate-400 mt-1 font-medium">Stable calibrated range</p>
        </div>

        {/* Card 3: Active Alerts */}
        <div className="bg-white p-3.5 md:p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Active Alerts
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl md:text-2xl font-bold mt-1 text-rose-600 font-mono">28</p>
            <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
              8 urgent
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">+4 in last hour</p>
        </div>

        {/* Card 4: Approval Rate */}
        <div className="bg-white p-3.5 md:p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Approval Rate
          </p>
          <p className="text-xl md:text-2xl font-bold mt-1 text-slate-900 font-mono">
            94.2%
          </p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94.2%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Split Grid: Left Feed (2/3) + Right AI Insights (1/3) */}
      <div className="flex flex-1 gap-4 md:gap-6 min-h-0 overflow-hidden">
        {/* Left Side: Live Decisioning Feed */}
        <div className="flex-[2] bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/60 shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-800 tracking-tight">
                Live Risk Decisioning Feed
              </h3>
              <span className="text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">
                {transactions.length} events
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSimulator}
                className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded shadow-xs hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Simulate
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10 text-[11px]">
                <tr>
                  <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                    TxID
                  </th>
                  <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                    Entity
                  </th>
                  <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                    Amount
                  </th>
                  <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200 text-center">
                    Score
                  </th>
                  <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                    Decision
                  </th>
                  <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                    Risk Level
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => {
                  const isSelected = inspectedTx?.transactionId === tx.transactionId;
                  const isBlock = tx.decision === 'BLOCK';
                  const isMonitor = tx.decision === 'MONITOR';

                  return (
                    <tr
                      key={tx.transactionId}
                      onClick={() => onSelectTx(tx)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-indigo-50/80 ring-1 ring-inset ring-indigo-500/30'
                          : isBlock
                          ? 'hover:bg-rose-50/40'
                          : isMonitor
                          ? 'bg-amber-50/15 hover:bg-amber-50/40'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="px-3.5 py-2.5 font-mono text-[11px] font-medium text-slate-700">
                        {tx.transactionId}
                      </td>

                      <td className="px-3.5 py-2.5">
                        <div className="font-semibold text-slate-800 leading-tight">
                          {tx.customerName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {tx.customerId} • {tx.merchantName}
                        </div>
                      </td>

                      <td className="px-3.5 py-2.5 font-semibold text-slate-800 font-mono">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </td>

                      <td className="px-3.5 py-2.5 text-center">
                        <span className={`font-black font-mono text-sm ${getScoreColor(tx.riskScore)}`}>
                          {tx.riskScore.toString().padStart(2, '0')}
                        </span>
                      </td>

                      <td className="px-3.5 py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getDecisionBadge(
                            tx.decision
                          )}`}
                        >
                          {tx.decision}
                        </span>
                      </td>

                      <td className="px-3.5 py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getRiskLevelBadge(
                            tx.riskLevel
                          )}`}
                        >
                          {tx.riskLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: AI Analysis Explanation + Decision Distribution */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* AI Analysis Explanation Dark Card */}
          <div className="bg-slate-900 rounded-xl p-4.5 text-white flex flex-col gap-3.5 shadow-md shrink-0 border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  AI Analysis Explanation
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] border border-indigo-500/30 font-bold font-mono">
                {inspectedTx ? inspectedTx.transactionId : 'TX-882193'}
              </span>
            </div>

            {/* Factors list */}
            <div className="space-y-2.5">
              {inspectedTx && inspectedTx.riskFactors.length > 0 ? (
                inspectedTx.riskFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div
                      className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                        factor.severity === 'CRITICAL'
                          ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]'
                          : factor.severity === 'HIGH'
                          ? 'bg-orange-500'
                          : 'bg-amber-500'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-100">
                        {factor.factorName}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {factor.details}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    <div>
                      <p className="text-xs font-semibold text-slate-100">Verified Trusted Session</p>
                      <p className="text-[11px] text-slate-400">
                        Matched high-reputation device and typical spending baseline.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {inspectedTx?.explanation && (
                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] text-slate-300 italic font-mono bg-slate-800/50 p-2 rounded">
                    "{inspectedTx.explanation}"
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => onViewCase(inspectedTx ? inspectedTx.transactionId : 'TX-882193')}
              className="w-full mt-1 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold transition-all text-slate-200 hover:text-white flex items-center justify-center gap-1.5"
            >
              <span>View Full Investigation Case</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* System Decision Distribution Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col gap-3 flex-1 min-h-0">
            <h3 className="font-bold text-xs text-slate-800 border-b border-slate-100 pb-2">
              System Decision Distribution
            </h3>

            <div className="flex-1 flex flex-col justify-around gap-2.5">
              {/* Approvals */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Approvals</span>
                  <span className="font-mono text-slate-700">{approvals * 148 + 742} (74%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '74%' }} />
                </div>
              </div>

              {/* Manual Reviews */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Manual Reviews</span>
                  <span className="font-mono text-slate-700">{reviews * 22 + 156} (15%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>

              {/* Hard Blocks */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Hard Blocks</span>
                  <span className="font-mono text-slate-700">{blocks * 18 + 102} (11%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '11%' }} />
                </div>
              </div>
            </div>

            {/* Risk Shield Insights */}
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 mt-1">
              <p className="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Risk Shield Insights
              </p>
              <p className="text-[10px] text-indigo-700 mt-1 leading-normal font-medium">
                High correlation between 'New IP' and 'Amount &gt; ₹20k' signals today in North Region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
