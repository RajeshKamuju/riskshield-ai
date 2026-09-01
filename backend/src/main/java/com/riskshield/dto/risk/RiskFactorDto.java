package com.riskshield.dto.risk;

public class RiskFactorDto {
    private String factorCode;
    private String factorName;
    private Integer weightScore;
    private String category;
    private String details;
    private String severity;

    public RiskFactorDto() {}

    public RiskFactorDto(String factorCode, String factorName, Integer weightScore, String category, String details, String severity) {
        this.factorCode = factorCode;
        this.factorName = factorName;
        this.weightScore = weightScore;
        this.category = category;
        this.details = details;
        this.severity = severity;
    }

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
}
