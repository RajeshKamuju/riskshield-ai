package com.riskshield.entity;

import com.riskshield.enums.Decision;
import com.riskshield.enums.RiskLevel;
import jakarta.persistence.*;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "risk_assessments", indexes = {
    @Index(name = "idx_ra_tx_id", columnList = "transaction_id")
})
public class RiskAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_id", nullable = false, unique = true, length = 64)
    private String transactionId;

    @Column(name = "risk_score", nullable = false)
    private Integer riskScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 20)
    private RiskLevel riskLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Decision decision;

    @Column(name = "rule_score", nullable = false)
    private Integer ruleScore = 0;

    @Column(name = "behavioral_score", nullable = false)
    private Integer behavioralScore = 0;

    @Column(name = "ml_score", nullable = false)
    private Integer mlScore = 0;

    @Column(name = "model_version", nullable = false, length = 50)
    private String modelVersion = "v1.4-hybrid";

    @Column(nullable = false, columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "recommended_action", nullable = false, length = 100)
    private String recommendedAction;

    @Column(name = "evaluation_time_ms", nullable = false)
    private Integer evaluationTimeMs = 18;

    @OneToMany(mappedBy = "riskAssessment", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<RiskFactor> riskFactors = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    public RiskAssessment() {}

    public void addRiskFactor(RiskFactor factor) {
        riskFactors.add(factor);
        factor.setRiskAssessment(this);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public Integer getEvaluationTimeMs() { return evaluationTimeMs; }
    public void setEvaluationTimeMs(Integer evaluationTimeMs) { this.evaluationTimeMs = evaluationTimeMs; }
    public List<RiskFactor> getRiskFactors() { return riskFactors; }
    public void setRiskFactors(List<RiskFactor> riskFactors) { this.riskFactors = riskFactors; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
