package com.riskshield.dto.merchant;

import com.riskshield.dto.transaction.TransactionResponse;
import com.riskshield.enums.RiskLevel;
import java.math.BigDecimal;
import java.util.List;

public class MerchantRiskProfileDto {
    private String merchantId;
    private String businessName;
    private String category;
    private RiskLevel riskLevel;
    private Integer trustScore;
    private BigDecimal chargebackRate;
    private BigDecimal dailyVolumeLimit;
    private BigDecimal currentDailyVolume;
    private BigDecimal totalProcessedVolume;
    private Long totalTransactions;
    private Long fraudulentTransactionsCount;
    private Double fraudRatioPercentage;
    private List<TransactionResponse> recentTransactions;

    public MerchantRiskProfileDto() {}

    public String getMerchantId() { return merchantId; }
    public void setMerchantId(String merchantId) { this.merchantId = merchantId; }
    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public Integer getTrustScore() { return trustScore; }
    public void setTrustScore(Integer trustScore) { this.trustScore = trustScore; }
    public BigDecimal getChargebackRate() { return chargebackRate; }
    public void setChargebackRate(BigDecimal chargebackRate) { this.chargebackRate = chargebackRate; }
    public BigDecimal getDailyVolumeLimit() { return dailyVolumeLimit; }
    public void setDailyVolumeLimit(BigDecimal dailyVolumeLimit) { this.dailyVolumeLimit = dailyVolumeLimit; }
    public BigDecimal getCurrentDailyVolume() { return currentDailyVolume; }
    public void setCurrentDailyVolume(BigDecimal currentDailyVolume) { this.currentDailyVolume = currentDailyVolume; }
    public BigDecimal getTotalProcessedVolume() { return totalProcessedVolume; }
    public void setTotalProcessedVolume(BigDecimal totalProcessedVolume) { this.totalProcessedVolume = totalProcessedVolume; }
    public Long getTotalTransactions() { return totalTransactions; }
    public void setTotalTransactions(Long totalTransactions) { this.totalTransactions = totalTransactions; }
    public Long getFraudulentTransactionsCount() { return fraudulentTransactionsCount; }
    public void setFraudulentTransactionsCount(Long fraudulentTransactionsCount) { this.fraudulentTransactionsCount = fraudulentTransactionsCount; }
    public Double getFraudRatioPercentage() { return fraudRatioPercentage; }
    public void setFraudRatioPercentage(Double fraudRatioPercentage) { this.fraudRatioPercentage = fraudRatioPercentage; }
    public List<TransactionResponse> getRecentTransactions() { return recentTransactions; }
    public void setRecentTransactions(List<TransactionResponse> recentTransactions) { this.recentTransactions = recentTransactions; }
}
