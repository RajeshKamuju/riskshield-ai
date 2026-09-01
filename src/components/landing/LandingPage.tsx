import React from 'react';
import { LandingNavbar } from './LandingNavbar';
import { LandingHero } from './LandingHero';
import { LandingProblems } from './LandingProblems';
import { LandingSolutionWorkflow } from './LandingSolutionWorkflow';
import { LandingPaymentEcosystem } from './LandingPaymentEcosystem';
import { LandingRiskSignals } from './LandingRiskSignals';
import { LandingRiskDecisionScale } from './LandingRiskDecisionScale';
import { LandingFraudScenarios } from './LandingFraudScenarios';
import { LandingExplainableAI } from './LandingExplainableAI';
import { LandingDashboardPreview } from './LandingDashboardPreview';
import { LandingMiniSimulator } from './LandingMiniSimulator';
import { LandingSecurity } from './LandingSecurity';
import { LandingTechStack } from './LandingTechStack';
import { LandingFinalCTA } from './LandingFinalCTA';
import { LandingFooter } from './LandingFooter';
import { NavTab } from '../Sidebar';

interface LandingPageProps {
  onOpenDashboard: (tab?: NavTab) => void;
}

export function LandingPage({ onOpenDashboard }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 overflow-y-auto">
      {/* Top Sticky Navigation */}
      <LandingNavbar onOpenDashboard={(tab) => onOpenDashboard((tab as NavTab) || 'dashboard')} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive Risk Intelligence Engine */}
        <LandingHero
          onExplore={() => onOpenDashboard('dashboard')}
          onSimulate={() => onOpenDashboard('simulator')}
        />

        {/* 2. Problem Section */}
        <LandingProblems />

        {/* 3. Solution Workflow (DETECT -> SCORE -> EXPLAIN -> DECIDE -> INVESTIGATE -> RESOLVE) */}
        <LandingSolutionWorkflow />

        {/* 4. Modern Payment Ecosystem Section */}
        <LandingPaymentEcosystem />

        {/* 5. Risk Signals Section (8 Core Intelligence Signals) */}
        <LandingRiskSignals />

        {/* 6. Risk Decision Scale (0-29 Low, 30-59 Med, 60-79 High, 80-100 Critical) */}
        <LandingRiskDecisionScale />

        {/* 7. Real-World Fraud Scenarios (Interactive Cards) */}
        <LandingFraudScenarios />

        {/* 8. Explainable AI Feature Section (Why was this flagged?) */}
        <LandingExplainableAI />

        {/* 9. Live Risk Intelligence Operations Preview */}
        <LandingDashboardPreview onOpenDashboard={(tab) => onOpenDashboard((tab as NavTab) || 'dashboard')} />

        {/* 10. Risk Simulator Promotion & Mini Simulator */}
        <LandingMiniSimulator onOpenFullSimulator={() => onOpenDashboard('simulator')} />

        {/* 11. Security Section (8 Security Pillars) */}
        <LandingSecurity />

        {/* 12. Technology Architecture Stack */}
        <LandingTechStack />

        {/* 13. Final Emerald CTA */}
        <LandingFinalCTA
          onExploreDashboard={() => onOpenDashboard('dashboard')}
          onTrySimulator={() => onOpenDashboard('simulator')}
        />
      </main>

      {/* Footer */}
      <LandingFooter onOpenDashboard={(tab) => onOpenDashboard((tab as NavTab) || 'dashboard')} />
    </div>
  );
}
