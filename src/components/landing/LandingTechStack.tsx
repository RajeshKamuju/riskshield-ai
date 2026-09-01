import React from 'react';
import { Terminal, Cpu, Database, Server, Code2, ShieldCheck, BarChart3, Binary } from 'lucide-react';

interface TechItem {
  name: string;
  role: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TECH_STACK: TechItem[] = [
  {
    name: 'Java 17 LTS',
    role: 'Core Runtime',
    details: 'Pattern matching, records, and high-performance JVM execution for sub-15ms throughput.',
    icon: Binary,
  },
  {
    name: 'Spring Boot 3',
    role: 'Application Framework',
    details: 'Enterprise dependency injection, transaction management, and actuator health telemetry.',
    icon: Cpu,
  },
  {
    name: 'Spring Security 6',
    role: 'Identity & Access',
    details: 'Stateless JWT filters, CORS protection, and method-level role authorization.',
    icon: ShieldCheck,
  },
  {
    name: 'PostgreSQL 16',
    role: 'Relational Store',
    details: 'ACID transactional persistence with indexed foreign keys for transaction ledgers & audit records.',
    icon: Database,
  },
  {
    name: 'Spring Data JPA & Hibernate',
    role: 'ORM Layer',
    details: 'Optimistic locking, criteria queries, and clean entity relational mappings.',
    icon: Server,
  },
  {
    name: 'High-Throughput REST APIs',
    role: 'Gateway Interceptor',
    details: 'Low-latency JSON contract for pre-auth payment risk interception with rate limiting.',
    icon: Terminal,
  },
  {
    name: 'Client Decision Engine',
    role: 'Real-Time Interface',
    details: 'Interactive stateful decision stream with millisecond factor recalculation & simulation.',
    icon: Code2,
  },
  {
    name: 'Data Visualizers & Metrics',
    role: 'Analytics Engine',
    details: 'High-density risk distribution bar charts, anomaly sparklines, and radar factor graphs.',
    icon: BarChart3,
  },
];

export function LandingTechStack() {
  return (
    <section className="py-20 bg-[#FDFCFA] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-2 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-700" />
            <span>Underlying Engine Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
            Engineered with enterprise foundations.
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            A resilient stack prioritizing deterministic latency, clean separation of concerns, and robust transactional integrity.
          </p>
        </div>

        {/* 8 Subtle Tech Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TECH_STACK.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-stone-200/80 hover:border-stone-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center border border-stone-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                      {tech.role}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-stone-900">{tech.name}</div>
                  <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                    {tech.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
