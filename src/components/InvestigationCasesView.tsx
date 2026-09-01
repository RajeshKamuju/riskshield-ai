import React, { useState } from 'react';
import {
  Briefcase,
  AlertTriangle,
  Send,
  CheckCircle2,
  Clock,
  User,
  ShieldAlert,
  ArrowRight,
  FileText,
  Plus
} from 'lucide-react';
import { InvestigationCase, CaseStatus } from '../types';

interface InvestigationCasesViewProps {
  cases: InvestigationCase[];
  selectedCaseId: string | null;
  onSelectCase: (caseId: string) => void;
  onAddNote: (caseId: string, noteText: string, noteType: any) => void;
  onUpdateStatus: (caseId: string, status: CaseStatus, disposition?: any) => void;
}

export const InvestigationCasesView: React.FC<InvestigationCasesViewProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  onAddNote,
  onUpdateStatus,
}) => {
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteType, setNewNoteType] = useState<'GENERAL' | 'DECISION' | 'EVIDENCE'>('GENERAL');

  const activeCase = cases.find((c) => c.caseId === selectedCaseId) || cases[0] || null;

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteText.trim() && activeCase) {
      onAddNote(activeCase.caseId, newNoteText.trim(), newNoteType);
      setNewNoteText('');
    }
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'CRITICAL':
        return 'bg-rose-100 text-rose-800 border-rose-200 font-bold';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200 font-bold';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800 border-amber-200 font-bold';
      case 'LOW':
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold';
    }
  };

  const getStatusBadge = (s: CaseStatus) => {
    switch (s) {
      case 'IN_REVIEW':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'OPEN':
      case 'NEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'RESOLVED':
      case 'CLOSED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="flex-1 flex p-4 md:p-6 gap-5 overflow-hidden bg-slate-50">
      {/* Left List of Cases */}
      <div className="w-80 md:w-96 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-sm text-slate-900">Cases &amp; Syndicates</h3>
          </div>
          <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            {cases.length} active
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {cases.map((c) => {
            const isSelected = activeCase?.caseId === c.caseId;
            return (
              <div
                key={c.caseId}
                onClick={() => onSelectCase(c.caseId)}
                className={`p-3.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-indigo-50/90 border-l-4 border-indigo-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-800">{c.caseId}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded border uppercase ${getPriorityBadge(
                      c.priority
                    )}`}
                  >
                    {c.priority}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-slate-900 mt-1 line-clamp-1">{c.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                  {c.summary}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px]">
                  <span className="text-slate-500 font-medium">Analyst: {c.leadAnalyst}</span>
                  <span className="font-mono font-bold text-slate-800">
                    ₹{c.totalSuspiciousAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Case Detail Workbench */}
      {activeCase ? (
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          {/* Case Detail Header */}
          <div className="p-5 bg-slate-900 text-white flex items-start justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-base font-bold text-indigo-400">
                  {activeCase.caseId}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getStatusBadge(
                    activeCase.status
                  )}`}
                >
                  {activeCase.status}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getPriorityBadge(
                    activeCase.priority
                  )}`}
                >
                  {activeCase.priority} Priority
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1.5">{activeCase.title}</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                {activeCase.summary}
              </p>
            </div>

            {/* Quick Status Disposition selector */}
            <div className="text-right space-y-1 shrink-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">Case Disposition</p>
              <select
                value={activeCase.disposition || ''}
                onChange={(e) =>
                  onUpdateStatus(activeCase.caseId, 'RESOLVED', e.target.value as any)
                }
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Pending Final Decision</option>
                <option value="CONFIRMED_FRAUD">🚨 Confirmed Fraud</option>
                <option value="FALSE_POSITIVE">✅ False Positive</option>
                <option value="ACCOUNT_TAKEOVER">🛡️ Account Takeover</option>
                <option value="SUSPICIOUS_CLEARED">✨ Suspicious Cleared</option>
              </select>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Column: Target Entities & Linked Transactions */}
            <div className="w-72 border-r border-slate-200 p-4 space-y-4 overflow-y-auto bg-slate-50/50 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Target Entity</p>
                <p className="font-bold text-slate-900">{activeCase.targetType}</p>
                <p className="font-mono text-slate-700 text-[11px] bg-slate-100 p-1.5 rounded truncate">
                  {activeCase.targetId}
                </p>
                <div className="pt-1 text-[11px] text-slate-600 flex justify-between">
                  <span>Suspicious Volume:</span>
                  <span className="font-mono font-bold text-rose-600">
                    ₹{activeCase.totalSuspiciousAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Linked Transactions */}
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2 shadow-2xs">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Linked Transactions ({activeCase.linkedTransactions.length})
                </p>
                <div className="space-y-1.5">
                  {activeCase.linkedTransactions.map((txId) => (
                    <div
                      key={txId}
                      className="p-1.5 bg-slate-50 rounded border border-slate-200/80 font-mono text-[11px] text-indigo-600 font-bold flex items-center justify-between"
                    >
                      <span>{txId}</span>
                      <span className="text-[10px] text-slate-400 font-normal">Inspected</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Case Timeline & Notes Thread */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Thread header */}
              <div className="p-3.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-bold">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Investigation Evidence &amp; Notes
                </span>
                <span className="text-[11px] text-slate-400 font-normal font-mono">
                  Lead: {activeCase.leadAnalyst}
                </span>
              </div>

              {/* Notes List */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {activeCase.notes.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    No investigation notes recorded yet. Add your initial findings below.
                  </p>
                ) : (
                  activeCase.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-slate-800">{note.author}</span>
                        <span className="text-slate-400 font-mono">
                          {new Date(note.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-sans">{note.noteText}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Note input box */}
              <form
                onSubmit={handleNoteSubmit}
                className="p-3 border-t border-slate-200 bg-slate-50/80 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Type investigation note, forensic artifact, or decision..."
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Select a case to inspect
        </div>
      )}
    </div>
  );
};
