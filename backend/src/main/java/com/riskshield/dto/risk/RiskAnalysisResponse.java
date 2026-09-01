package com.riskshield.dto.risk;

import com.riskshield.enums.Decision;
import com.riskshield.enums.RiskLevel;
import java.util.ArrayList;
import java.util.List;

public class RiskAnalysisResponse {

    private String transactionId;
    private Integer riskScore;
    private RiskLevel riskLevel;
    private Decision decision;
    private Integer ruleScore;
    private Integer behavioralScore;
    private Integer mlScore;
    private String modelVersion;
    private String explanation;
    private String recommendedAction;
    private List<RiskFactorDto> riskFactors = new ArrayList<>();
    private Integer evaluationTimeMs;

    public RiskAnalysisResponse() {}

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public Integer getRiskScore() { return riskScore; }
    public void setRiskScore(Integer riskScore) { this.riskScore = riskScore; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public Decision getDecision() { return decision; }
    public void setDecision(Decision decision) { this.decision = decision; }
    public Integer getRuleScore() { return ruleScore; }
    public void setRuleScore(Integer ruleScore) { this.ruleScore = ruleScore; }
    public Integer getBehavioralScore() { return behavioralScore; }
    public void setBehavioralScore(Integer behavioralScore) { this.behavioralScore = behavioralScore; }
    public Integer getMlScore() { return mlScore; }
    public void setMlScore(Integer mlScore) { this.mlScore = mlScore; }
    public String getModelVersion() { return modelVersion; }
    public void setModelVersion(String modelVersion) { this.modelVersion = modelVersion; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }
    public List<RiskFactorDto> getRiskFactors() { return riskFactors; }
    public void setRiskFactors(List<RiskFactorDto> riskFactors) { this.riskFactors = riskFactors; }
    public Integer getEvaluationTimeMs() { return evaluationTimeMs; }
    public void setEvaluationTimeMs(Integer evaluationTimeMs) { this.evaluationTimeMs = evaluationTimeMs; }
}
