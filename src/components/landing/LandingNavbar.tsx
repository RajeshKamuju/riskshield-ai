import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Activity, Terminal, Lock, ChevronRight, Sparkles, Layers, Cpu } from 'lucide-react';

interface LandingNavbarProps {
  onOpenDashboard: (tab?: string) => void;
}

export function LandingNavbar({ onOpenDashboard }: LandingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs'
          : 'bg-[#FAF8F5] border-b border-stone-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shadow-xs border border-emerald-800">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-stone-900">
                RiskShield <span className="text-emerald-700 font-semibold">AI</span>
              </span>
              <span className="text-[10px] font-mono font-medium uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                v3.4
              </span>
            </div>
            <span className="text-[10px] text-stone-700 font-medium tracking-wide">
              Payment Risk &amp; Fraud Decisioning
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => scrollToSection('product-overview')}
            className="hover:text-stone-900 transition-colors text-left cursor-pointer"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection('risk-intelligence')}
            className="hover:text-stone-900 transition-colors text-left cursor-pointer"
          >
            Risk Intelligence
          </button>
          <button
            onClick={() => scrollToSection('payment-ecosystem')}
            className="hover:text-stone-900 transition-colors text-left cursor-pointer"
          >
            Solutions
          </button>
          <button
            onClick={() => scrollToSection('fraud-scenarios')}
            className="hover:text-stone-900 transition-colors text-left cursor-pointer"
          >
            Scenarios
          </button>
          <button
            onClick={() => scrollToSection('risk-simulator')}
            className="hover:text-stone-900 transition-colors text-left cursor-pointer"
          >
            Simulator
          </button>
          <button
            onClick={() => scrollToSection('security-specs')}
            className="hover:text-stone-900 transition-colors text-left cursor-pointer"
          >
            Security
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenDashboard('simulator')}
            className="text-xs font-mono font-semibold text-stone-700 hover:text-stone-900 px-3 py-2 rounded-md hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            Try Simulator
          </button>
          <button
            onClick={() => onOpenDashboard('dashboard')}
            className="inline-flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all hover:shadow-sm cursor-pointer border border-emerald-800"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('product-overview')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-700"
          >
            Product Overview
          </button>
          <button
            onClick={() => scrollToSection('risk-intelligence')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-700"
          >
            Risk Intelligence
          </button>
          <button
            onClick={() => scrollToSection('payment-ecosystem')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-700"
          >
            Payment Ecosystem
          </button>
          <button
            onClick={() => scrollToSection('fraud-scenarios')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-700"
          >
            Real-World Scenarios
          </button>
          <button
            onClick={() => scrollToSection('risk-simulator')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-700"
          >
            Interactive Simulator
          </button>
          <button
            onClick={() => scrollToSection('security-specs')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-700"
          >
            Security &amp; Architecture
          </button>
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => onOpenDashboard('dashboard')}
              className="w-full justify-center inline-flex items-center gap-2 bg-emerald-950 text-white text-xs font-semibold py-2.5 rounded-lg"
            >
              <span>Open Risk Operations Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
