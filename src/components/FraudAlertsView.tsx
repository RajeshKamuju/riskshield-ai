import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserCheck,
  Briefcase,
  X,
  Send,
  Filter
} from 'lucide-react';
import { FraudAlert, AlertStatus } from '../types';

interface FraudAlertsViewProps {
  alerts: FraudAlert[];
  onUpdateAlertStatus: (alertId: string, newStatus: AlertStatus, notes?: string) => void;
  onCreateCaseFromAlert: (alert: FraudAlert) => void;
}

export const FraudAlertsView: React.FC<FraudAlertsViewProps> = ({
  alerts,
  onUpdateAlertStatus,
  onCreateCaseFromAlert,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [resolvingAlert, setResolvingAlert] = useState<FraudAlert | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  const filteredAlerts = alerts.filter((a) => {
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    return true;
  });

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resolvingAlert) {
      onUpdateAlertStatus(resolvingAlert.alertId, 'RESOLVED', resolutionNote);
      setResolvingAlert(null);
      setResolutionNote('');
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case 'OPEN':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'INVESTIGATING':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'ESCALATED':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'RESOLVED':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'DISMISSED':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 gap-4 overflow-hidden bg-slate-50">
      {/* Top filter header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Fraud Alert Triage &amp; Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Prioritized operational queue for anomalous payment signals requiring analyst decisioning.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          {['ALL', 'OPEN', 'INVESTIGATING', 'ESCALATED', 'RESOLVED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded text-[11px] uppercase transition-all ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Grid / Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 text-[11px]">
              <tr>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Alert ID &amp; Time
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Alert Trigger Type
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Customer &amp; Merchant
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Amount
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200 text-center">
                  Score
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Status
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Assigned Analyst
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAlerts.map((alert) => {
                return (
                  <tr key={alert.alertId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono text-[11px] font-bold text-slate-900">
                        {alert.alertId}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Tx: {alert.transactionId}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 text-xs">{alert.alertType}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {alert.riskFactorsSummary.map((f, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.2 rounded font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{alert.customerName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {alert.merchantName}
                      </div>
                    </td>

                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      ₹{alert.amount.toLocaleString('en-IN')}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`font-mono font-black text-xs px-2 py-0.5 rounded border ${
                          alert.riskScore >= 75
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {alert.riskScore}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(
                          alert.status
                        )}`}
                      >
                        {alert.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-slate-700 font-medium text-xs">
                        {alert.assignedTo || 'Unassigned'}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {alert.status !== 'RESOLVED' && (
                          <button
                            onClick={() => {
                              setResolvingAlert(alert);
                              setResolutionNote('');
                            }}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[11px] font-bold transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                        <button
                          onClick={() => onCreateCaseFromAlert(alert)}
                          className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold transition-colors flex items-center gap-1"
                        >
                          <Briefcase className="w-3 h-3 text-indigo-400" />
                          <span>Case</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolution Modal */}
      {resolvingAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm">Resolve Fraud Alert</h3>
              </div>
              <button
                onClick={() => setResolvingAlert(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="p-5 space-y-3.5 text-xs text-slate-800">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <p className="font-mono font-bold text-slate-900">{resolvingAlert.alertId}</p>
                <p className="text-slate-600">
                  {resolvingAlert.alertType} • ₹{resolvingAlert.amount.toLocaleString('en-IN')}
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Analyst Disposition &amp; Verification Notes
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Cardholder contacted via SMS OTP. Confirmed legitimate payment authorization."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setResolvingAlert(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs transition-colors shadow-xs"
                >
                  Confirm Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
