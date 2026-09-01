import React from 'react';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Globe,
  CreditCard,
  User,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Ban,
  Activity,
  Layers
} from 'lucide-react';
import { Transaction, Decision } from '../types';

interface TransactionDetailModalProps {
  tx: Transaction | null;
  onClose: () => void;
  onOverrideDecision: (txId: string, newDecision: Decision) => void;
  onCreateCase: (tx: Transaction) => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  tx,
  onClose,
  onOverrideDecision,
  onCreateCase,
}) => {
  if (!tx) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-indigo-400">
                {tx.transactionId}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                  tx.decision === 'BLOCK'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : tx.decision === 'MONITOR'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : tx.decision === 'REVIEW'
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {tx.decision}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluated in {tx.evaluationTimeMs}ms • {new Date(tx.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50 text-slate-800 text-xs">
          {/* Score breakdown card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Composite</p>
              <p
                className={`text-2xl font-black font-mono mt-0.5 ${
                  tx.riskScore >= 75
                    ? 'text-rose-600'
                    : tx.riskScore >= 50
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {tx.riskScore}
              </p>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Rule Engine</p>
              <p className="text-lg font-bold font-mono text-slate-800 mt-1">{tx.ruleScore}</p>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Behavioral</p>
              <p className="text-lg font-bold font-mono text-slate-800 mt-1">{tx.behavioralScore}</p>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase">ML Ensemble</p>
              <p className="text-lg font-bold font-mono text-slate-800 mt-1">{tx.mlScore}</p>
            </div>
          </div>

          {/* AI Explanation Banner */}
          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl shadow-xs border border-slate-800">
            <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
              AI Decision Rationale
            </p>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">{tx.explanation}</p>
            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Recommendation:</span>
              <span className="text-indigo-300 font-semibold">{tx.recommendedAction}</span>
            </div>
          </div>

          {/* Triggered Risk Factors */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-xs text-slate-900 flex items-center justify-between">
              <span>Risk Factor Breakdown</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {tx.riskFactors.length} signals triggered
              </span>
            </h4>

            {tx.riskFactors.length === 0 ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero anomalous risk signals triggered for this transaction.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {tx.riskFactors.map((f, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-xs">{f.factorName}</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                          {f.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight">{f.details}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-xs text-rose-600">
                        +{f.weightScore} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Transaction Metadata Grid */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-xs text-slate-900">Entity &amp; Telemetry Signals</h4>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[9px] flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-500" /> Customer
                </p>
                <p className="font-bold text-slate-800">{tx.customerName}</p>
                <p className="font-mono text-slate-500 text-[10px]">{tx.customerId}</p>
                {tx.customerEmail && <p className="text-slate-500 text-[10px]">{tx.customerEmail}</p>}
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[9px] flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-slate-500" /> Payment &amp; Amount
                </p>
                <p className="font-bold text-slate-800 font-mono text-xs">
                  ₹{tx.amount.toLocaleString('en-IN')} {tx.currency}
                </p>
                <p className="text-slate-600 text-[10px]">{tx.paymentMethod}</p>
                <p className="font-mono text-slate-500 text-[10px]">
                  BIN: {tx.cardBin} •••• {tx.cardLast4}
                </p>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[9px] flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-slate-500" /> Device Fingerprint
                </p>
                <p className="font-bold text-slate-800">{tx.deviceName || 'Standard Client'}</p>
                <p className="font-mono text-slate-500 text-[10px]">{tx.deviceId}</p>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[9px] flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-500" /> Network / IP
                </p>
                <p className="font-mono font-bold text-slate-800">{tx.ipAddress}</p>
                <p className="text-slate-500 text-[10px]">
                  {tx.ipLocation || `${tx.locationCity}, ${tx.locationCountry}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Footer */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Analyst Manual Override Actions
          </p>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => onOverrideDecision(tx.transactionId, 'APPROVE')}
              className={`py-2 rounded-lg font-bold text-xs border transition-colors flex items-center justify-center gap-1 ${
                tx.decision === 'APPROVE'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve</span>
            </button>

            <button
              onClick={() => onOverrideDecision(tx.transactionId, 'MONITOR')}
              className={`py-2 rounded-lg font-bold text-xs border transition-colors flex items-center justify-center gap-1 ${
                tx.decision === 'MONITOR'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Monitor</span>
            </button>

            <button
              onClick={() => onOverrideDecision(tx.transactionId, 'REVIEW')}
              className={`py-2 rounded-lg font-bold text-xs border transition-colors flex items-center justify-center gap-1 ${
                tx.decision === 'REVIEW'
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Review</span>
            </button>

            <button
              onClick={() => onOverrideDecision(tx.transactionId, 'BLOCK')}
              className={`py-2 rounded-lg font-bold text-xs border transition-colors flex items-center justify-center gap-1 ${
                tx.decision === 'BLOCK'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Block</span>
            </button>
          </div>

          <button
            onClick={() => onCreateCase(tx)}
            className="w-full mt-2 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
            <span>Escalate &amp; Open Investigation Case</span>
          </button>
        </div>
      </div>
    </div>
  );
};
