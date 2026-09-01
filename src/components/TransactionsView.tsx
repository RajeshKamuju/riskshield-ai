import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Radio,
  SlidersHorizontal,
  Flame,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  Ban
} from 'lucide-react';
import { Transaction, RiskLevel, Decision } from '../types';

interface TransactionsViewProps {
  transactions: Transaction[];
  onSelectTx: (tx: Transaction) => void;
  onInjectScenario: (scenario: 'CARD_TESTING' | 'ATO_SPIKE' | 'GEO_JUMP' | 'CLEAN_TX') => void;
  onOpenSimulator: () => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onSelectTx,
  onInjectScenario,
  onOpenSimulator,
}) => {
  const [filterDecision, setFilterDecision] = useState<string>('ALL');
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'time' | 'score' | 'amount'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (filterDecision !== 'ALL' && tx.decision !== filterDecision) return false;
        if (filterRiskLevel !== 'ALL' && tx.riskLevel !== filterRiskLevel) return false;
        if (searchTerm) {
          const s = searchTerm.toLowerCase();
          const matchId = tx.transactionId.toLowerCase().includes(s);
          const matchCust = tx.customerName.toLowerCase().includes(s) || tx.customerId.toLowerCase().includes(s);
          const matchMerch = tx.merchantName.toLowerCase().includes(s);
          const matchIp = tx.ipAddress.toLowerCase().includes(s);
          const matchBin = tx.cardBin.includes(s) || tx.cardLast4.includes(s);
          if (!matchId && !matchCust && !matchMerch && !matchIp && !matchBin) return false;
        }
        return true;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortBy === 'time') {
          diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortBy === 'score') {
          diff = b.riskScore - a.riskScore;
        } else if (sortBy === 'amount') {
          diff = b.amount - a.amount;
        }
        return sortOrder === 'desc' ? diff : -diff;
      });
  }, [transactions, filterDecision, filterRiskLevel, searchTerm, sortBy, sortOrder]);

  const handleExportCSV = () => {
    const headers = [
      'TxID',
      'CustomerId',
      'CustomerName',
      'MerchantName',
      'Amount',
      'Currency',
      'PaymentMethod',
      'RiskScore',
      'RiskLevel',
      'Decision',
      'IP',
      'CreatedAt'
    ];
    const rows = filteredTransactions.map((t) => [
      t.transactionId,
      t.customerId,
      `"${t.customerName}"`,
      `"${t.merchantName}"`,
      t.amount,
      t.currency,
      `"${t.paymentMethod}"`,
      t.riskScore,
      t.riskLevel,
      t.decision,
      t.ipAddress,
      t.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RiskShield_Transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDecisionBadge = (decision: Decision) => {
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

  const getRiskLevelBadge = (level: RiskLevel) => {
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

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 gap-4 overflow-hidden bg-slate-50">
      {/* Action bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter transactions..."
              className="bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Decision filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600">
            {['ALL', 'APPROVE', 'MONITOR', 'REVIEW', 'BLOCK'].map((d) => (
              <button
                key={d}
                onClick={() => setFilterDecision(d)}
                className={`px-2.5 py-1 rounded text-[11px] uppercase transition-all ${
                  filterDecision === d
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Risk Level filter */}
          <select
            value={filterRiskLevel}
            onChange={(e) => setFilterRiskLevel(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="CRITICAL">Critical Risk</option>
          </select>
        </div>

        {/* Action buttons on right */}
        <div className="flex items-center gap-2">
          {/* Quick Scenario Injectors */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-500" /> Inject:
            </span>
            <button
              onClick={() => onInjectScenario('ATO_SPIKE')}
              className="text-[10px] font-bold px-2 py-1 bg-white hover:bg-rose-50 text-rose-700 rounded border border-slate-200 shadow-2xs transition-colors"
              title="Inject high-value account takeover attack"
            >
              ATO Spike
            </button>
            <button
              onClick={() => onInjectScenario('CARD_TESTING')}
              className="text-[10px] font-bold px-2 py-1 bg-white hover:bg-amber-50 text-amber-700 rounded border border-slate-200 shadow-2xs transition-colors"
              title="Inject card testing micro-burst"
            >
              Card Testing
            </button>
            <button
              onClick={() => onInjectScenario('GEO_JUMP')}
              className="text-[10px] font-bold px-2 py-1 bg-white hover:bg-indigo-50 text-indigo-700 rounded border border-slate-200 shadow-2xs transition-colors"
              title="Inject impossible geo-velocity jump"
            >
              Geo-Jump
            </button>
            <button
              onClick={() => onInjectScenario('CLEAN_TX')}
              className="text-[10px] font-bold px-2 py-1 bg-white hover:bg-emerald-50 text-emerald-700 rounded border border-slate-200 shadow-2xs transition-colors"
              title="Inject clean authenticated purchase"
            >
              Clean
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Eval</span>
          </button>
        </div>
      </div>

      {/* Main Dense Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Showing <strong className="text-slate-800 font-mono">{filteredTransactions.length}</strong> of{' '}
            <strong className="text-slate-800 font-mono">{transactions.length}</strong> transactions
          </span>
          <span className="text-[11px]">Click any row for deep-dive inspection &amp; override drawer</span>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 text-[11px]">
              <tr>
                <th
                  onClick={() => {
                    if (sortBy === 'time') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else {
                      setSortBy('time');
                      setSortOrder('desc');
                    }
                  }}
                  className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>TxID &amp; Timestamp</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Customer Entity
                </th>
                <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Merchant / Category
                </th>
                <th
                  onClick={() => {
                    if (sortBy === 'amount') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else {
                      setSortBy('amount');
                      setSortOrder('desc');
                    }
                  }}
                  className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Payment / BIN
                </th>
                <th
                  onClick={() => {
                    if (sortBy === 'score') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else {
                      setSortBy('score');
                      setSortOrder('desc');
                    }
                  }}
                  className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200 text-center cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Risk Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Decision
                </th>
                <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Risk Level
                </th>
                <th className="px-3.5 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  IP &amp; Device
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => {
                const isBlock = tx.decision === 'BLOCK';
                const isMonitor = tx.decision === 'MONITOR';

                return (
                  <tr
                    key={tx.transactionId}
                    onClick={() => onSelectTx(tx)}
                    className={`cursor-pointer transition-colors ${
                      isBlock
                        ? 'hover:bg-rose-50/50'
                        : isMonitor
                        ? 'hover:bg-amber-50/50'
                        : 'hover:bg-indigo-50/40'
                    }`}
                  >
                    <td className="px-3.5 py-2.5">
                      <div className="font-mono text-[11px] font-bold text-slate-900">
                        {tx.transactionId}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {new Date(tx.createdAt).toLocaleTimeString()}
                      </div>
                    </td>

                    <td className="px-3.5 py-2.5">
                      <div className="font-semibold text-slate-900">{tx.customerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{tx.customerId}</div>
                    </td>

                    <td className="px-3.5 py-2.5">
                      <div className="font-semibold text-slate-800">{tx.merchantName}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-tight">
                        {tx.merchantCategory.replace('_', ' ')}
                      </div>
                    </td>

                    <td className="px-3.5 py-2.5 font-mono font-bold text-slate-900">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>

                    <td className="px-3.5 py-2.5">
                      <div className="text-slate-700 font-medium">{tx.paymentMethod}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        BIN: {tx.cardBin} •••• {tx.cardLast4}
                      </div>
                    </td>

                    <td className="px-3.5 py-2.5 text-center">
                      <span
                        className={`font-mono font-black text-sm ${
                          tx.riskScore >= 75
                            ? 'text-rose-600'
                            : tx.riskScore >= 50
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
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

                    <td className="px-3.5 py-2.5">
                      <div className="font-mono text-[10px] text-slate-700">{tx.ipAddress}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                        {tx.deviceName || tx.deviceId}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
