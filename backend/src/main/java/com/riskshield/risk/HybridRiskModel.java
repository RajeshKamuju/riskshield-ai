package com.riskshield.risk;

import com.riskshield.dto.risk.RiskEvaluationContext;
import com.riskshield.entity.RiskFactor;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Hybrid Risk Model:
 * Combines Rule-Based Scoring (45% weight), Behavioral Profiling (35% weight), and ML Anomaly Classifier (20% weight)
 * into a single, calibrated, explainable Risk Score (0-100).
 */
@Component
public class HybridRiskModel {

    private final RuleBasedRiskModel ruleBasedRiskModel;
    private final MLRiskModel mlRiskModel;

    public HybridRiskModel(RuleBasedRiskModel ruleBasedRiskModel, MLRiskModel mlRiskModel) {
        this.ruleBasedRiskModel = ruleBasedRiskModel;
        this.mlRiskModel = mlRiskModel;
    }

    public ScoringBreakdown calculate(RiskEvaluationContext ctx, List<RiskFactor> factors, int behavioralScore) {
        int ruleScore = ruleBasedRiskModel.evaluate(ctx, factors);
        int mlScore = mlRiskModel.evaluate(ctx, factors);

        // Weighted Hybrid Combination
        // Rule: 0.45, Behavioral: 0.35, ML: 0.20
        double combined = (ruleScore * 0.45) + (behavioralScore * 0.35) + (mlScore * 0.20);
        
        // Critical overrides: If explicit severe rule triggered or high velocity attack, elevate floor
        if (ruleScore >= 70 || behavioralScore >= 75) {
            combined = Math.max(combined, Math.max(ruleScore, behavioralScore));
        }

        int finalScore = Math.max(0, Math.min(100, (int) Math.round(combined)));

        return new ScoringBreakdown(finalScore, ruleScore, behavioralScore, mlScore, "v1.4-hybrid");
    }

    public static class ScoringBreakdown {
        private final int finalScore;
        private final int ruleScore;
        private final int behavioralScore;
        private final int mlScore;
        private final String modelVersion;

        public ScoringBreakdown(int finalScore, int ruleScore, int behavioralScore, int mlScore, String modelVersion) {
            this.finalScore = finalScore;
            this.ruleScore = ruleScore;
            this.behavioralScore = behavioralScore;
            this.mlScore = mlScore;
            this.modelVersion = modelVersion;
        }

        public int getFinalScore() { return finalScore; }
        public int getRuleScore() { return ruleScore; }
        public int getBehavioralScore() { return behavioralScore; }
        public int getMlScore() { return mlScore; }
        public String getModelVersion() { return modelVersion; }
    }
}
