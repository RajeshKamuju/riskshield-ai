import React from 'react';
import { 
  CreditCard, 
  UserX, 
  Repeat, 
  Zap, 
  Smartphone, 
  Globe2, 
  AlertOctagon, 
  CheckCircle2,
  TrendingDown,
  ShieldAlert
} from 'lucide-react';

interface ProblemItem {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  icon: React.ComponentType<{ className?: string }>;
  metric: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'fraudulent-txns',
    title: 'Fraudulent Transactions',
    category: 'Payment Authorization',
    description: 'Stolen card credentials, compromised UPI VPA handles, and synthetic identities bypassing standard rule gates during checkouts.',
    impact: 'Direct chargeback liability and processing fee penalties.',
    icon: CreditCard,
    metric: '₹1.8L avg loss/attack',
  },
  {
    id: 'account-takeover',
    title: 'Account Takeover (ATO)',
    category: 'Identity & Session',
    description: 'Attackers compromising legitimate customer accounts through credential stuffing, phishing, or SIM-swap, rapidly draining balances.',
    impact: 'Severe cardholder trust erosion & regulatory scrutiny.',
    icon: UserX,
    metric: '72% occur on new devices',
  },
  {
    id: 'card-testing',
    title: 'Card Testing Micro-Probes',
    category: 'Automated Botnets',
    description: 'Automated scripts launching bursts of sub-₹200 micro-charges across hundreds of cards to validate stolen CVVs before major fraud.',
    impact: 'Gateway throttling & heavy bank network penalty fees.',
    icon: Repeat,
    metric: '400+ hits / minute',
  },
  {
    id: 'velocity-attacks',
    title: 'Transaction Velocity Attacks',
    category: 'Rapid Exploits',
    description: 'High-frequency transaction bursts split across multiple merchants or payment links before legacy nightly batch jobs run.',
    impact: 'Full credit limit exhaustion in under 8 minutes.',
    icon: Zap,
    metric: 'Sub-minute burst velocity',
  },
  {
    id: 'suspicious-devices',
    title: 'Suspicious Device Fingerprints',
    category: 'Hardware & OS Signals',
    description: 'Emulators, rooted handsets, spoofed user-agents, and automated headless browsers masking fraudulent automation tools.',
    impact: 'Undetected synthetic bot activity at checkout.',
    icon: Smartphone,
    metric: '94% masking rate',
  },
  {
    id: 'geographic-anomalies',
    title: 'Geographic Anomalies',
    category: 'Geo-Velocity Analysis',
    description: 'Payments originating from impossible transit speeds (e.g. Mumbai to Frankfurt within 15 minutes) or known Tor exit nodes.',
    impact: 'Cross-border syndicate fraud without physical footprint.',
    icon: Globe2,
    metric: 'Airspeed > 800 km/h anomaly',
  },
  {
    id: 'payment-abuse',
    title: 'Payment Abuse & Friendly Fraud',
    category: 'Merchant & Promotion Abuse',
    description: 'First-party fraud where customers falsely claim unauthorized debit, or exploit promotional cashback and discount refund loops.',
    impact: 'Merchant inventory drain & revenue shrinkage.',
    icon: AlertOctagon,
    metric: '35% of total disputed volume',
  },
  {
    id: 'false-positives',
    title: 'Costly False Positives',
    category: 'Customer Friction',
    description: 'Overly aggressive legacy rigid rules blocking high-value VIP customers due to simple travelling or new phone purchases.',
    impact: 'Immediate checkout abandonment and lost customer LTV.',
    icon: CheckCircle2,
    metric: '18% drop-off from blunt blocks',
  },
];

export function LandingProblems() {
  return (
    <section id="product-overview" className="py-24 bg-[#FDFCFA] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <span>The Reality of Modern Payments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            Payments move fast.{' '}
            <span className="text-stone-700 block">Risk moves faster.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            Legacy fraud rules rely on rigid static thresholds and delayed batch processing. In modern payment flows, attack vectors evolve in milliseconds across UPI, cards, and instant settlements.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="group relative bg-white p-6 rounded-xl border border-stone-200/90 hover:border-stone-400 transition-all duration-200 hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Top Category & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-emerald-50 text-stone-700 group-hover:text-emerald-800 flex items-center justify-center transition-colors border border-stone-200/80 group-hover:border-emerald-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      {problem.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-stone-900 mb-2 group-hover:text-emerald-950 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {problem.description}
                  </p>
                </div>

                {/* Bottom Impact & Metric */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-stone-700 font-semibold">{problem.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Takeaway Banner */}
        <div className="mt-12 p-6 rounded-xl bg-stone-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border border-stone-800">
          <div className="space-y-1 max-w-2xl">
            <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              The Fundamental Challenge
            </div>
            <p className="text-sm text-stone-300">
              Blunt rules block legitimate customers. Passive gateways let syndicates slip through. Payment platforms need real-time, explainable risk intelligence at the millisecond authorization boundary.
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-stone-400 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span>Autonomous Risk Evaluation</span>
          </div>
        </div>

      </div>
    </section>
  );
}
