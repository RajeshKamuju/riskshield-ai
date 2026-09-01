import React from 'react';
import { 
  ArrowRight, 
  Smartphone, 
  CreditCard, 
  Building2, 
  Repeat, 
  Link2, 
  SendHorizontal, 
  Store, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  XCircle,
  Network
} from 'lucide-react';

interface EcosystemCategory {
  id: string;
  name: string;
  shortDesc: string;
  riskVectors: string;
  intelligenceSignals: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: EcosystemCategory[] = [
  {
    id: 'upi',
    name: 'UPI (Unified Payments Interface)',
    shortDesc: 'Instant account-to-account micro and high-value payments via QR and collect requests.',
    riskVectors: 'VPA spoofing, collect request phishing, rapid multi-account fan-out velocity.',
    intelligenceSignals: 'VPA age, device binding hash, collect-time response velocity.',
    icon: Smartphone,
  },
  {
    id: 'cards',
    name: 'Credit & Debit Cards',
    shortDesc: 'Domestic & cross-border card payments across Visa, Mastercard, RuPay & Amex.',
    riskVectors: 'Stolen card CVV testing bursts, synthetic identities, international carding syndicates.',
    intelligenceSignals: 'BIN country alignment, 3DS authentication telemetry, card velocity.',
    icon: CreditCard,
  },
  {
    id: 'netbanking',
    name: 'NetBanking & Direct Debits',
    shortDesc: 'Direct retail and corporate banking authorizations across major banking institutions.',
    riskVectors: 'Compromised internet banking credentials, session hijacking, unexpected corporate debit.',
    intelligenceSignals: 'Bank portal referrer integrity, customer usual debit schedule, ASN verification.',
    icon: Building2,
  },
  {
    id: 'subscriptions',
    name: 'Recurring Subscriptions & Mandates',
    shortDesc: 'Automated recurring billing cycles via e-Mandates, standing instructions, and auto-debits.',
    riskVectors: 'Mandate failure cascades, high churn fraud, stolen card renewal exploitation.',
    intelligenceSignals: 'Card lifecycle changes, issuer soft decline patterns, mandate renewal history.',
    icon: Repeat,
  },
  {
    id: 'payment-links',
    name: 'Payment Links & Invoices',
    shortDesc: 'Dynamic shareable payment links sent via WhatsApp, SMS, email, and social channels.',
    riskVectors: 'Phishing link generation, social engineering exploits, rapid single-use link draining.',
    intelligenceSignals: 'Link creation IP vs customer payment IP, time-to-pay velocity, merchant reputation.',
    icon: Link2,
  },
  {
    id: 'payouts',
    name: 'Instant Payouts & Transfers',
    shortDesc: 'Disbursements to vendor bank accounts, gig-worker wallets, and instant refunds.',
    riskVectors: 'Sudden vendor account swaps, compromised admin credentials, instant fund siphoning.',
    intelligenceSignals: 'Beneficiary account age, payout amount deviation, cooling-off window checks.',
    icon: SendHorizontal,
  },
  {
    id: 'marketplace',
    name: 'Marketplace & Split Settlements',
    shortDesc: 'Multi-party merchant platform flows with automated escrow split and commissions.',
    riskVectors: 'Seller-buyer collusion, fraudulent vendor onboarding, rapid chargeback abandonment.',
    intelligenceSignals: 'Seller transaction velocity, dispute history ratio, merchant delivery proof.',
    icon: Store,
  },
];

export function LandingPaymentEcosystem() {
  return (
    <section id="payment-ecosystem" className="py-24 bg-[#FDFCFA] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-700" />
            <span>Infrastructure Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            Built for the modern{' '}
            <span className="text-stone-700 block">payment ecosystem.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            RiskShield AI is designed to integrate alongside payment gateways, switches, and checkout infrastructure — evaluating risk non-invasively at the authorization boundary without introducing user friction.
          </p>
        </div>

        {/* Visual Payment Flow Architecture Banner */}
        <div className="bg-stone-950 text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-stone-800 shadow-xl mb-16 overflow-hidden relative">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-stone-800 pb-5">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                REAL-TIME AUTHORIZATION TOPOLOGY
              </span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">
                Sub-15ms Payment Gateway Risk Interceptor
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero Checkout Lag (&lt;15ms p99)</span>
            </div>
          </div>

          {/* Flow Diagram (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center relative">
            
            {/* Step 1: Customer */}
            <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-mono text-xs mb-2">
                01
              </div>
              <div className="text-xs font-mono font-bold text-stone-200">Customer</div>
              <div className="text-[10px] text-stone-500 mt-1">Initiates payment via mobile / web</div>
            </div>

            {/* Step 2: Checkout */}
            <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-mono text-xs mb-2">
                02
              </div>
              <div className="text-xs font-mono font-bold text-stone-200">Checkout / SDK</div>
              <div className="text-[10px] text-stone-500 mt-1">Gathers payment &amp; device tokens</div>
            </div>

            {/* Step 3: Payment Gateway */}
            <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-mono text-xs mb-2">
                03
              </div>
              <div className="text-xs font-mono font-bold text-stone-200">Payment Gateway</div>
              <div className="text-[10px] text-stone-500 mt-1">Dispatches pre-auth risk hook</div>
            </div>

            {/* Step 4: RiskShield AI (Highlighted) */}
            <div className="bg-emerald-950 p-4 rounded-xl border-2 border-emerald-500 text-center flex flex-col items-center shadow-lg relative">
              <div className="absolute -top-2.5 bg-emerald-500 text-stone-950 text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                CORE ENGINE
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center font-mono text-xs mb-2">
                04
              </div>
              <div className="text-xs font-mono font-extrabold text-emerald-300">RiskShield AI</div>
              <div className="text-[10px] text-emerald-200/80 mt-1">Evaluates rules, ML &amp; velocity</div>
            </div>

            {/* Step 5: Risk Decision */}
            <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-mono text-xs mb-2">
                05
              </div>
              <div className="text-xs font-mono font-bold text-stone-200">Risk Decision</div>
              <div className="text-[10px] text-stone-500 mt-1">Score + Explainable Rationale</div>
            </div>

            {/* Step 6: Gateway Action */}
            <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-mono text-xs mb-2">
                06
              </div>
              <div className="text-xs font-mono font-bold text-stone-200">Action Execution</div>
              <div className="text-[10px] text-stone-400 mt-1 font-mono">Approve / Review / Block</div>
            </div>

          </div>

          {/* Decision Outcome Matrix */}
          <div className="mt-8 pt-6 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <div>
                <div className="font-bold">APPROVE</div>
                <div className="text-[10px] text-emerald-400/80">Instant clearance</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
              <div>
                <div className="font-bold">MONITOR</div>
                <div className="text-[10px] text-stone-400">Passive telemetry</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/70 border border-amber-800 text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <div>
                <div className="font-bold">REVIEW</div>
                <div className="text-[10px] text-amber-400/80">Step-up / Analyst queue</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-300 flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0" />
              <div>
                <div className="font-bold">BLOCK</div>
                <div className="text-[10px] text-rose-400/80">Hard rejection &amp; freeze</div>
              </div>
            </div>
          </div>

        </div>

        {/* Ecosystem Categories Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-stone-900">
            Payment Methods &amp; Flow Coverage
          </h3>
          <p className="text-sm text-stone-600">
            Tailored risk rules and behavioural baselines across high-throughput payment vectors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="bg-white p-6 rounded-xl border border-stone-200/90 hover:border-stone-400 transition-all hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200/70">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm">{cat.name}</h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {cat.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-stone-100 text-[11px]">
                    <div>
                      <span className="font-mono font-bold text-rose-700">Attack Vectors: </span>
                      <span className="text-stone-600">{cat.riskVectors}</span>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-emerald-800">Signals Evaluated: </span>
                      <span className="text-stone-600">{cat.intelligenceSignals}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
