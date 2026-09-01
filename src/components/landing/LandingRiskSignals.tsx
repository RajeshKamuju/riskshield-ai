import React, { useState } from 'react';
import { 
  DollarSign, 
  Activity, 
  UserCheck, 
  Smartphone, 
  Globe, 
  MapPin, 
  XOctagon, 
  Store,
  Eye,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface Signal {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  whatWeEvaluate: string[];
  sampleTrigger: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SIGNALS: Signal[] = [
  {
    id: 'amount',
    name: 'Transaction Amount',
    category: 'Amount Anomaly',
    tagline: 'Detect abnormal ticket sizes relative to baselines',
    description: 'Compares the incoming transaction value against the cardholder’s 30-day historical mean, standard deviations, and merchant category averages.',
    whatWeEvaluate: ['Customer 30d Mean & Median', 'Z-Score Standard Deviation', 'Merchant Category Max Tolerance'],
    sampleTrigger: '₹85,000 transaction is 7.2x cardholder median (Z-score +3.4)',
    icon: DollarSign,
  },
  {
    id: 'velocity',
    name: 'Transaction Velocity',
    category: 'Velocity Bursts',
    tagline: 'Track burst frequency across time windows',
    description: 'Monitors transaction counts and cumulative volume over sliding windows of 1 minute, 10 minutes, 1 hour, and 24 hours per card, customer, or IP.',
    whatWeEvaluate: ['Sliding 60-second Burst Count', 'Cumulative 10-Minute Spend', 'Cross-Merchant Card Velocity'],
    sampleTrigger: '5 transactions attempted within 90 seconds on same VPA',
    icon: Activity,
  },
  {
    id: 'behaviour',
    name: 'Customer Behaviour',
    category: 'Behavioral Biometrics',
    tagline: 'Analyze typical purchasing habits & timing',
    description: 'Profiles usual purchasing times, recurring merchant categories, typical channels (web vs mobile), and session navigation tempo.',
    whatWeEvaluate: ['Time-of-Day Deviation', 'Merchant Category Affinity', 'Session Dwell & Click Cadence'],
    sampleTrigger: '3:00 AM luxury electronics purchase on dormant customer account',
    icon: UserCheck,
  },
  {
    id: 'device',
    name: 'Device Intelligence',
    category: 'Hardware Fingerprint',
    tagline: 'Unmask spoofed hardware, emulators & bots',
    description: 'Analyzes canvas fingerprint, WebGL rendering hash, screen resolution, battery status, installed fonts, and OS user-agent consistency.',
    whatWeEvaluate: ['Canvas / WebGL Fingerprint Hash', 'Root / Jailbreak Indicators', 'Headless Browser / Automation Flags'],
    sampleTrigger: 'Linux user-agent claiming to be iPhone 15 Pro hardware profile',
    icon: Smartphone,
  },
  {
    id: 'ip',
    name: 'IP Intelligence',
    category: 'Network & Proxy',
    tagline: 'Identify Tor nodes, datacenters & VPN relays',
    description: 'Evaluates Autonomous System Number (ASN), proxy/Tor exit node feeds, residential vs datacenter IP classification, and threat reputation lists.',
    whatWeEvaluate: ['Tor Exit Node Detection', 'Commercial Datacenter Hosting IP', 'IP Fraud & Chargeback History'],
    sampleTrigger: 'Transaction routed via AWS datacenter IP in Frankfurt',
    icon: Globe,
  },
  {
    id: 'geo',
    name: 'Geographic Behaviour',
    category: 'Geo-Velocity',
    tagline: 'Detect impossible transit speeds & border hops',
    description: 'Calculates physical distance and required transit speed between the current payment location and the cardholder’s previous transaction location.',
    whatWeEvaluate: ['Haversine Distance Calculation', 'Implied Airspeed (&gt;800 km/h)', 'Card Issuer Country vs IP Country'],
    sampleTrigger: 'Delhi transaction 15 minutes after physical swipe in London',
    icon: MapPin,
  },
  {
    id: 'failures',
    name: 'Payment Failures',
    category: 'Failure Cascades',
    tagline: 'Flag rapid CVV, OTP, and soft-decline bursts',
    description: 'Tracks sequential failed attempts, wrong OTP submissions, invalid CVV retries, and rapid switching between payment methods.',
    whatWeEvaluate: ['Consecutive Failed Auth Ratio', 'Payment Method Switching Speed', 'OTP Resend / Retry Threshold'],
    sampleTrigger: '4 consecutive incorrect CVV attempts followed by amount reduction',
    icon: XOctagon,
  },
  {
    id: 'merchant',
    name: 'Merchant Risk',
    category: 'Merchant Baseline',
    tagline: 'Assess category sensitivity & dispute exposure',
    description: 'Weights transaction risk against merchant chargeback ratio, category risk tier (e.g. crypto, gaming, luxury), and refund trends.',
    whatWeEvaluate: ['MCC Risk Tiering', 'Merchant Historical Dispute Rate', 'Sudden Volume Spike vs Normalcy'],
    sampleTrigger: 'New seller onboarding experiencing 10x sudden overnight volume',
    icon: Store,
  },
];

export function LandingRiskSignals() {
  const [selectedSignal, setSelectedSignal] = useState(SIGNALS[0]);

  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-700" />
            <span>Multi-Signal Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            See what{' '}
            <span className="text-emerald-900 block">others miss.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            Fraud is never a single data point. RiskShield AI extracts and cross-correlates eight distinct signal dimensions in real time to assemble an undeniable risk fingerprint.
          </p>
        </div>

        {/* 8 Signals Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGNALS.map((sig) => {
            const Icon = sig.icon;
            const isSelected = selectedSignal.id === sig.id;
            return (
              <div
                key={sig.id}
                onClick={() => setSelectedSignal(sig)}
                className={`p-6 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-emerald-800 shadow-md ring-2 ring-emerald-700/20'
                    : 'bg-white border-stone-200/90 hover:border-stone-400 hover:shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors border ${
                        isSelected
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-900'
                          : 'bg-stone-100 text-stone-700 border-stone-200/80'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      {sig.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-1">
                    {sig.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mb-3">
                    {sig.tagline}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {sig.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-mono flex items-center justify-between">
                  <span className="text-emerald-800 font-semibold">Live Extractor</span>
                  <span className="text-stone-700">Click to inspect →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Signal Inspector Panel */}
        <div className="mt-12 bg-stone-950 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  SIGNAL INSPECTOR
                </span>
                <span className="text-xs text-stone-400 font-mono">• {selectedSignal.category}</span>
              </div>
              <h4 className="text-2xl font-extrabold text-white">
                {selectedSignal.name} Telemetry
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedSignal.description}
              </p>
            </div>

            <div className="space-y-3 shrink-0 lg:max-w-md w-full">
              <div className="text-xs font-mono font-bold text-stone-400 uppercase">
                Example Risk Anomaly Flagged:
              </div>
              <div className="bg-stone-900 p-3.5 rounded-lg border border-stone-800 text-xs font-mono text-amber-300">
                ⚠️ {selectedSignal.sampleTrigger}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
