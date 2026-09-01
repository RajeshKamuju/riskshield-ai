package com.riskshield.dto.dashboard;

import com.riskshield.dto.alert.AlertDto;
import com.riskshield.dto.transaction.TransactionResponse;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class DashboardSummaryDto {
    private Long totalTransactions;
    private BigDecimal totalTransactionVolume;
    private Long highRiskTransactions;
    private Long fraudDetected;
    private Long openAlerts;
    private Long casesUnderInvestigation;
    private Double averageRiskScore;
    private Double approvalRate;

    // Charts & Distribution
    private Map<String, Long> riskDistribution; // LOW, MEDIUM, HIGH, CRITICAL
    private Map<String, Long> decisionDistribution; // APPROVE, MONITOR, REVIEW, BLOCK
    private Map<String, Long> fraudTypeDistribution;
    private Map<String, BigDecimal> volumeTrends; // date -> volume
    private Map<String, Long> riskFactorCounts;
    private Map<String, Double> merchantRiskAverages;

    // Live Risk Feed
    private List<TransactionResponse> liveRiskFeed;
    private List<AlertDto> recentAlerts;

    public DashboardSummaryDto() {}

    public Long getTotalTransactions() { return totalTransactions; }
    public void setTotalTransactions(Long totalTransactions) { this.totalTransactions = totalTransactions; }
    public BigDecimal getTotalTransactionVolume() { return totalTransactionVolume; }
    public void setTotalTransactionVolume(BigDecimal totalTransactionVolume) { this.totalTransactionVolume = totalTransactionVolume; }
    public Long getHighRiskTransactions() { return highRiskTransactions; }
    public void setHighRiskTransactions(Long highRiskTransactions) { this.highRiskTransactions = highRiskTransactions; }
    public Long getFraudDetected() { return fraudDetected; }
    public void setFraudDetected(Long fraudDetected) { this.fraudDetected = fraudDetected; }
    public Long getOpenAlerts() { return openAlerts; }
    public void setOpenAlerts(Long openAlerts) { this.openAlerts = openAlerts; }
    public Long getCasesUnderInvestigation() { return casesUnderInvestigation; }
    public void setCasesUnderInvestigation(Long casesUnderInvestigation) { this.casesUnderInvestigation = casesUnderInvestigation; }
    public Double getAverageRiskScore() { return averageRiskScore; }
    public void setAverageRiskScore(Double averageRiskScore) { this.averageRiskScore = averageRiskScore; }
    public Double getApprovalRate() { return approvalRate; }
    public void setApprovalRate(Double approvalRate) { this.approvalRate = approvalRate; }
    public Map<String, Long> getRiskDistribution() { return riskDistribution; }
    public void setRiskDistribution(Map<String, Long> riskDistribution) { this.riskDistribution = riskDistribution; }
    public Map<String, Long> getDecisionDistribution() { return decisionDistribution; }
    public void setDecisionDistribution(Map<String, Long> decisionDistribution) { this.decisionDistribution = decisionDistribution; }
    public Map<String, Long> getFraudTypeDistribution() { return fraudTypeDistribution; }
    public void setFraudTypeDistribution(Map<String, Long> fraudTypeDistribution) { this.fraudTypeDistribution = fraudTypeDistribution; }
    public Map<String, BigDecimal> getVolumeTrends() { return volumeTrends; }
    public void setVolumeTrends(Map<String, BigDecimal> volumeTrends) { this.volumeTrends = volumeTrends; }
    public Map<String, Long> getRiskFactorCounts() { return riskFactorCounts; }
    public void setRiskFactorCounts(Map<String, Long> riskFactorCounts) { this.riskFactorCounts = riskFactorCounts; }
    public Map<String, Double> getMerchantRiskAverages() { return merchantRiskAverages; }
    public void setMerchantRiskAverages(Map<String, Double> merchantRiskAverages) { this.merchantRiskAverages = merchantRiskAverages; }
    public List<TransactionResponse> getLiveRiskFeed() { return liveRiskFeed; }
    public void setLiveRiskFeed(List<TransactionResponse> liveRiskFeed) { this.liveRiskFeed = liveRiskFeed; }
    public List<AlertDto> getRecentAlerts() { return recentAlerts; }
    public void setRecentAlerts(List<AlertDto> recentAlerts) { this.recentAlerts = recentAlerts; }
}
