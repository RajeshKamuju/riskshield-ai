import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldX, 
  Sliders, 
  RotateCcw,
  Sparkles,
  Server
} from 'lucide-react';

interface LandingMiniSimulatorProps {
  onOpenFullSimulator: () => void;
}

export function LandingMiniSimulator({ onOpenFullSimulator }: LandingMiniSimulatorProps) {
  // Mini simulator state
  const [amount, setAmount] = useState<number>(35000);
  const [velocityCount, setVelocityCount] = useState<number>(3);
  const [isProxyTor, setIsProxyTor] = useState<boolean>(true);
  const [isNewDevice, setIsNewDevice] = useState<boolean>(true);
  const [isHighRiskCategory, setIsHighRiskCategory] = useState<boolean>(false);

  // Dynamic score calculation
  let score = 10;
  const factors: { name: string; pts: number }[] = [];

  if (amount > 50000) {
    score += 35;
    factors.push({ name: 'Amount > ₹50,000 (Anomaly)', pts: 35 });
  } else if (amount > 20000) {
    score += 18;
    factors.push({ name: 'Amount > ₹20,000', pts: 18 });
  }

  if (velocityCount >= 5) {
    score += 30;
    factors.push({ name: `Velocity: ${velocityCount} txns in 10m`, pts: 30 });
  } else if (velocityCount >= 3) {
    score += 15;
    factors.push({ name: `Velocity: ${velocityCount} txns in 10m`, pts: 15 });
  }

  if (isProxyTor) {
    score += 25;
    factors.push({ name: 'Tor Exit Node / Datacenter Proxy', pts: 25 });
  }

  if (isNewDevice) {
    score += 15;
    factors.push({ name: 'Novel Hardware Canvas Fingerprint', pts: 15 });
  }

  if (isHighRiskCategory) {
    score += 15;
    factors.push({ name: 'High-Risk Category (Crypto / Gaming)', pts: 15 });
  }

  const finalScore = Math.min(99, score);
  const decision =
    finalScore >= 80
      ? 'BLOCK'
      : finalScore >= 60
      ? 'REVIEW'
      : finalScore >= 30
      ? 'MONITOR'
      : 'APPROVE';

  return (
    <section id="risk-simulator" className="py-24 bg-[#FDFCFA] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-700" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            See the risk engine{' '}
            <span className="text-stone-700 block">think.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            Change transaction conditions and see how risk signals influence the final decision in real time.
          </p>
        </div>

        {/* Mini Simulator Interactive Box */}
        <div className="bg-white rounded-2xl border border-stone-300 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-stone-950 text-white px-6 py-4 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-stone-200">
                LIVE KERNEL SIMULATION SANDBOX
              </span>
            </div>
            <button
              onClick={() => {
                setAmount(4500);
                setVelocityCount(1);
                setIsProxyTor(false);
                setIsNewDevice(false);
                setIsHighRiskCategory(false);
              }}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Clean Baseline</span>
            </button>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Transaction Amount */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label htmlFor="amount-slider" className="font-bold text-stone-700">TRANSACTION AMOUNT (INR)</label>
                  <span className="font-extrabold text-stone-900 text-sm">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  id="amount-slider"
                  type="range"
                  min={500}
                  max={100000}
                  step={500}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>₹500 (Clean)</span>
                  <span>₹25,000 (Elevated)</span>
                  <span>₹1,00,000 (Critical)</span>
                </div>
              </div>

              {/* Slider 2: Transaction Velocity in 10m */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label htmlFor="velocity-slider" className="font-bold text-stone-700">10-MINUTE ATTEMPT VELOCITY</label>
                  <span className="font-extrabold text-stone-900 text-sm">
                    {velocityCount} attempts
                  </span>
                </div>
                <input
                  id="velocity-slider"
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={velocityCount}
                  onChange={(e) => setVelocityCount(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>1 attempt (Normal)</span>
                  <span>3 attempts (Warning)</span>
                  <span>10 attempts (Attack Burst)</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={isProxyTor}
                    onChange={(e) => setIsProxyTor(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
                  />
                  <span className="text-xs font-medium text-stone-800">
                    Tor / VPN Proxy (+25)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={isNewDevice}
                    onChange={(e) => setIsNewDevice(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
                  />
                  <span className="text-xs font-medium text-stone-800">
                    Novel Device (+15)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={isHighRiskCategory}
                    onChange={(e) => setIsHighRiskCategory(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
                  />
                  <span className="text-xs font-medium text-stone-800">
                    Crypto / Gaming (+15)
                  </span>
                </label>
              </div>

            </div>

            {/* Right Live Computed Output */}
            <div className="lg:col-span-5 bg-stone-900 text-white p-6 rounded-xl border border-stone-800 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>REAL-TIME OUTPUT</span>
                  <span>LATENCY: 9ms</span>
                </div>

                <div className="flex items-baseline gap-2 mt-3">
                  <span
                    className={`text-5xl font-extrabold font-mono tracking-tight ${
                      finalScore >= 80
                        ? 'text-rose-400'
                        : finalScore >= 60
                        ? 'text-amber-400'
                        : finalScore >= 30
                        ? 'text-stone-300'
                        : 'text-emerald-400'
                    }`}
                  >
                    {finalScore}
                  </span>
                  <span className="text-sm font-mono text-stone-500 font-bold">/ 100</span>
                </div>

                <div className="mt-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-mono text-xs font-extrabold uppercase ${
                      decision === 'BLOCK'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : decision === 'REVIEW'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : decision === 'MONITOR'
                        ? 'bg-stone-800 text-stone-200 border border-stone-700'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {decision === 'BLOCK' && <ShieldX className="w-3.5 h-3.5" />}
                    {decision === 'REVIEW' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {decision === 'MONITOR' && <ShieldCheck className="w-3.5 h-3.5" />}
                    {decision === 'APPROVE' && <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>DECISION: {decision}</span>
                  </span>
                </div>
              </div>

              {/* Active Factors List */}
              <div className="space-y-1.5 text-xs font-mono pt-3 border-t border-stone-800">
                <div className="text-[10px] text-stone-400 uppercase font-semibold">
                  Attributed Factor Points:
                </div>
                {factors.length === 0 ? (
                  <div className="text-stone-500 italic">No elevated risk factors detected. Baseline clearance.</div>
                ) : (
                  factors.map((f, i) => (
                    <div key={i} className="flex justify-between text-stone-300 text-[11px]">
                      <span>{f.name}</span>
                      <span className="text-rose-400 font-bold">+{f.pts}</span>
                    </div>
                  ))
                )}
              </div>

              {/* CTA to Full Simulator */}
              <button
                onClick={onOpenFullSimulator}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs py-3 rounded-lg transition-colors cursor-pointer"
              >
                <span>Launch Full Risk Simulator Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
