import React from 'react';
import { ShieldCheck, Search, Bell, Radio, Activity, RefreshCw, Plus } from 'lucide-react';
import { Transaction } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLiveStreaming: boolean;
  setIsLiveStreaming: (val: boolean | ((prev: boolean) => boolean)) => void;
  onSimulateClick: () => void;
  onBackToLanding?: () => void;
  transactions: Transaction[];
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isLiveStreaming,
  setIsLiveStreaming,
  onSimulateClick,
  onBackToLanding,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-2.5 bg-white border-b border-stone-200 shrink-0 z-20">
      {/* Brand & Landing Back Link */}
      <div className="flex items-center gap-4">
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition-colors cursor-pointer"
            title="Return to Product Landing Page"
          >
            <span>← Product Landing Page</span>
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-950 p-1.5 rounded-lg shadow-2xs flex items-center justify-center text-emerald-400 border border-emerald-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-stone-900">
                RiskShield <span className="text-emerald-700 font-bold">AI</span>
              </h1>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Ops Console v3.4
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Search & Live controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search TxID, Customer, IP, Card..."
            className="bg-stone-100 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 pl-9 pr-3 py-1.5 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
            >
              ×
            </button>
          )}
        </div>

        {/* Live Streaming Toggle */}
        <button
          onClick={() => setIsLiveStreaming((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isLiveStreaming
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
          }`}
          title={isLiveStreaming ? 'Live transaction ingestion stream running' : 'Live stream paused'}
        >
          <span className={`w-2 h-2 rounded-full ${isLiveStreaming ? 'bg-emerald-600 animate-pulse' : 'bg-stone-400'}`} />
          <Radio className="w-3.5 h-3.5" />
          <span>{isLiveStreaming ? 'Live Stream: Active' : 'Stream: Paused'}</span>
        </button>

        {/* Quick Simulate Button */}
        <button
          onClick={onSimulateClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950 hover:bg-emerald-900 text-white shadow-2xs transition-colors border border-emerald-800"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>Test Transaction</span>
        </button>

        {/* User Identity */}
        <div className="flex items-center gap-2.5 border-l border-stone-200 pl-4 ml-1">
          <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-emerald-500/30">
            JD
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-semibold text-xs text-stone-900 leading-tight">John Doe</p>
            <p className="text-[10px] text-stone-500 font-medium">Lead Risk Analyst</p>
          </div>
        </div>
      </div>
    </header>
  );
};
