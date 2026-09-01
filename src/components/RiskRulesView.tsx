import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Plus,
  CheckCircle2,
  AlertOctagon,
  Shield,
  Zap,
  ToggleLeft,
  ToggleRight,
  Info,
  X,
  Code
} from 'lucide-react';
import { RiskRule, Decision } from '../types';

interface RiskRulesViewProps {
  rules: RiskRule[];
  onToggleRule: (id: string) => void;
  onAddRule: (rule: Omit<RiskRule, 'id' | 'totalTriggeredCount'>) => void;
}

export const RiskRulesView: React.FC<RiskRulesViewProps> = ({
  rules,
  onToggleRule,
  onAddRule,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRuleCode, setNewRuleCode] = useState('RULE_CUSTOM_VELOCITY_5M');
  const [newName, setNewName] = useState('Custom Velocity Alert');
  const [newCategory, setNewCategory] = useState<RiskRule['category']>('VELOCITY');
  const [newSeverity, setNewSeverity] = useState<RiskRule['severity']>('HIGH');
  const [newImpactScore, setNewImpactScore] = useState(30);
  const [newAction, setNewAction] = useState<Decision>('REVIEW');
  const [newDescription, setNewDescription] = useState('Flag rapid micro-transactions on newly issued cards.');
  const [newExpression, setNewExpression] = useState('count(tx, 5m) >= 4 && isNewCard == true');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRule({
      ruleCode: newRuleCode,
      name: newName,
      category: newCategory,
      severity: newSeverity,
      impactScore: Number(newImpactScore),
      description: newDescription,
      isActive: true,
      decisionAction: newAction,
      conditionExpression: newExpression,
    });
    setIsCreateModalOpen(false);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'VELOCITY':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'AMOUNT_ANOMALY':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'NETWORK_SECURITY':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'DEVICE_INTEGRITY':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'BEHAVIOR':
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-rose-100 text-rose-800 font-bold';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 font-bold';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800 font-bold';
      case 'LOW':
      default:
        return 'bg-emerald-100 text-emerald-800 font-bold';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 gap-4 overflow-hidden bg-slate-50">
      {/* Top summary card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            Deterministic &amp; Anomaly Rules Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configurable real-time rule pipelines evaluated in parallel with ML model weights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Active Rules</p>
            <p className="font-mono text-sm font-bold text-slate-800">
              {rules.filter((r) => r.isActive).length} / {rules.length}
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Rule</span>
          </button>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 text-[11px]">
              <tr>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Status
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Rule Code &amp; Name
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Category
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Severity
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200 text-center">
                  Score Weight
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Trigger Action
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200">
                  Condition Expression
                </th>
                <th className="px-4 py-2.5 font-bold text-slate-600 border-b border-slate-200 text-right">
                  Triggers (30d)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rules.map((rule) => {
                return (
                  <tr
                    key={rule.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      !rule.isActive ? 'opacity-60 bg-slate-50/40' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onToggleRule(rule.id)}
                        className="flex items-center gap-1.5 focus:outline-none"
                        title={rule.isActive ? 'Deactivate rule' : 'Activate rule'}
                      >
                        {rule.isActive ? (
                          <span className="w-8 h-4 bg-indigo-600 rounded-full flex items-center justify-end px-0.5 transition-colors">
                            <span className="w-3 h-3 bg-white rounded-full shadow-xs"></span>
                          </span>
                        ) : (
                          <span className="w-8 h-4 bg-slate-300 rounded-full flex items-center px-0.5 transition-colors">
                            <span className="w-3 h-3 bg-white rounded-full shadow-xs"></span>
                          </span>
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 text-xs">{rule.name}</div>
                      <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                        {rule.ruleCode}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 max-w-sm">
                        {rule.description}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getCategoryBadge(
                          rule.category
                        )}`}
                      >
                        {rule.category.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getSeverityBadge(
                          rule.severity
                        )}`}
                      >
                        {rule.severity}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="font-mono font-black text-rose-600 text-xs bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        +{rule.impactScore}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                          rule.decisionAction === 'BLOCK'
                            ? 'bg-rose-100 text-rose-700 border-rose-200'
                            : rule.decisionAction === 'MONITOR'
                            ? 'bg-amber-100 text-amber-700 border-amber-200'
                            : rule.decisionAction === 'REVIEW'
                            ? 'bg-orange-100 text-orange-700 border-orange-200'
                            : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {rule.decisionAction}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <code className="text-[10px] font-mono bg-slate-100 text-slate-800 px-2 py-1 rounded border border-slate-200 max-w-xs block truncate">
                        {rule.conditionExpression}
                      </code>
                    </td>

                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-700">
                      {rule.totalTriggeredCount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Rule Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-sm">Create Risk Rule Pipeline</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-3.5 text-xs text-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                    Rule Code
                  </label>
                  <input
                    type="text"
                    value={newRuleCode}
                    onChange={(e) => setNewRuleCode(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="VELOCITY">Velocity</option>
                    <option value="AMOUNT_ANOMALY">Amount Anomaly</option>
                    <option value="NETWORK_SECURITY">Network &amp; IP</option>
                    <option value="DEVICE_INTEGRITY">Device Integrity</option>
                    <option value="BEHAVIOR">Behavioral</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                    Severity
                  </label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                    Score Impact (+pts)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={newImpactScore}
                    onChange={(e) => setNewImpactScore(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                  Condition Expression
                </label>
                <input
                  type="text"
                  value={newExpression}
                  onChange={(e) => setNewExpression(e.target.value)}
                  required
                  placeholder="e.g. count(tx, 5m) >= 4 && isNewCard == true"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                  Description / Fraud Pattern Context
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold text-xs transition-colors shadow-xs"
                >
                  Save &amp; Deploy Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
