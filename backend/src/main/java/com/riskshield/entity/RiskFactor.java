package com.riskshield.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "risk_factors")
public class RiskFactor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id", nullable = false)
    @JsonIgnore
    private RiskAssessment riskAssessment;

    @Column(name = "factor_code", nullable = false, length = 100)
    private String factorCode;

    @Column(name = "factor_name", nullable = false, length = 150)
    private String factorName;

    @Column(name = "weight_score", nullable = false)
    private Integer weightScore;

    @Column(nullable = false, length = 50)
    private String category; // VELOCITY, AMOUNT, DEVICE, NETWORK, LOCATION, REPUTATION

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(nullable = false, length = 20)
    private String severity = "MEDIUM";

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    public RiskFactor() {}

    public RiskFactor(String factorCode, String factorName, Integer weightScore, String category, String details, String severity) {
        this.factorCode = factorCode;
        this.factorName = factorName;
        this.weightScore = weightScore;
        this.category = category;
        this.details = details;
        this.severity = severity;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public RiskAssessment getRiskAssessment() { return riskAssessment; }
    public void setRiskAssessment(RiskAssessment riskAssessment) { this.riskAssessment = riskAssessment; }
    public String getFactorCode() { return factorCode; }
    public void setFactorCode(String factorCode) { this.factorCode = factorCode; }
    public String getFactorName() { return factorName; }
    public void setFactorName(String factorName) { this.factorName = factorName; }
    public Integer getWeightScore() { return weightScore; }
    public void setWeightScore(Integer weightScore) { this.weightScore = weightScore; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
