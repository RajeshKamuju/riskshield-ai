import React from 'react';
import { 
  Lock, 
  Users, 
  Server, 
  FileText, 
  CheckSquare, 
  Database, 
  KeyRound, 
  ShieldCheck,
  Shield,
  Code2
} from 'lucide-react';

interface SecurityPillar {
  title: string;
  category: string;
  description: string;
  implementation: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PILLARS: SecurityPillar[] = [
  {
    title: 'JWT Authentication',
    category: 'Session Integrity',
    description: 'Stateless, cryptographically signed JSON Web Tokens securing all operations console routes with strict expiry and refresh rotation.',
    implementation: 'HMAC-SHA512 signed tokens with custom claims validation.',
    icon: Lock,
  },
  {
    title: 'Role-Based Access (RBAC)',
    category: 'Access Control',
    description: 'Strict separation of privileges between Senior Risk Analyst, Compliance Officer, Rule Engineer, and Read-Only Auditor roles.',
    implementation: 'Spring Security method-level authorization with `@PreAuthorize`.',
    icon: Users,
  },
  {
    title: 'Secure REST APIs',
    category: 'Transport & Protocol',
    description: 'Rate-limited, TLS 1.3 enforced REST endpoints with CORS policies restricting cross-origin ingress strictly to verified gateway origins.',
    implementation: 'Token bucket rate-limiting (100 req/sec) per merchant API key.',
    icon: Server,
  },
  {
    title: 'Immutable Audit Logging',
    category: 'Compliance & Forensics',
    description: 'Comprehensive, tamper-resistant logging of all score calculations, manual decision overrides, and rule alterations with timestamps.',
    implementation: 'Structured JSON log streams indexed with SHA-256 integrity hashes.',
    icon: FileText,
  },
  {
    title: 'Strict Input Validation',
    category: 'Data Sanitization',
    description: 'Deep schema validation on every transaction payload, preventing SQL injection, XSS vectors, and malformed telemetry injection.',
    implementation: 'Jakarta Bean Validation (`@Valid`, `@NotNull`, `@Pattern`) on all DTOs.',
    icon: CheckSquare,
  },
  {
    title: 'Database Constraints',
    category: 'Relational Safety',
    description: 'Strict foreign key relationships, unique transaction hashes, and non-null constraints ensuring zero orphaned state or split decisions.',
    implementation: 'PostgreSQL ACID constraints with optimistic locking for concurrency.',
    icon: Database,
  },
  {
    title: 'Encrypted Credentials',
    category: 'Secret Management',
    description: 'Zero plaintext storage of sensitive API tokens, webhook signing secrets, or operator passwords across all environment layers.',
    implementation: 'BCrypt password hashing with work factor 12 & AES-256 credential vaults.',
    icon: KeyRound,
  },
  {
    title: 'Webhook Integrity Validation',
    category: 'Event Security',
    description: 'Cryptographic HMAC signature verification on all inbound and outbound payment webhook payloads, preventing replay attacks.',
    implementation: 'HMAC-SHA256 signature header matching with timestamp replay guard.',
    icon: ShieldCheck,
  },
];

export function LandingSecurity() {
  return (
    <section id="security-specs" className="py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>Defensive Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            Security is part of{' '}
            <span className="text-emerald-900 block">the decision.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            A fraud decision engine must adhere to the highest standards of data integrity, deterministic execution, and cryptographic verification.
          </p>
        </div>

        {/* 8 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-stone-200/90 hover:border-stone-400 transition-all duration-200 hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center border border-stone-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      {pillar.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] font-mono text-emerald-800">
                  <span className="font-bold">Spec: </span>
                  <span className="text-stone-600">{pillar.implementation}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600 text-center font-mono">
          Engineered as a clean, production-grade payment risk decisioning framework with strict defensive programming principles.
        </div>

      </div>
    </section>
  );
}
