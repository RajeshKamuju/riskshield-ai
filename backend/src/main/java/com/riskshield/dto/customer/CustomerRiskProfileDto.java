package com.riskshield.dto.customer;

import com.riskshield.dto.transaction.TransactionResponse;
import com.riskshield.enums.RiskLevel;
import java.math.BigDecimal;
import java.util.List;

public class CustomerRiskProfileDto {
    private String customerId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private RiskLevel riskLevel;
    private Integer trustScore;
    private Integer accountAgeDays;
    private Boolean kycVerified;
    private BigDecimal historicalAverageAmount;
    private Integer totalTransactions;
    private Integer failedAttemptsLast24h;
    private String lastKnownLocation;
    private List<String> associatedDevices;
    private List<String> recentIpAddresses;
    private List<TransactionResponse> recentTransactions;
    private List<String> flaggedRiskFactors;

    public CustomerRiskProfileDto() {}

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public Integer getTrustScore() { return trustScore; }
    public void setTrustScore(Integer trustScore) { this.trustScore = trustScore; }
    public Integer getAccountAgeDays() { return accountAgeDays; }
    public void setAccountAgeDays(Integer accountAgeDays) { this.accountAgeDays = accountAgeDays; }
    public Boolean getKycVerified() { return kycVerified; }
    public void setKycVerified(Boolean kycVerified) { this.kycVerified = kycVerified; }
    public BigDecimal getHistoricalAverageAmount() { return historicalAverageAmount; }
    public void setHistoricalAverageAmount(BigDecimal historicalAverageAmount) { this.historicalAverageAmount = historicalAverageAmount; }
    public Integer getTotalTransactions() { return totalTransactions; }
    public void setTotalTransactions(Integer totalTransactions) { this.totalTransactions = totalTransactions; }
    public Integer getFailedAttemptsLast24h() { return failedAttemptsLast24h; }
    public void setFailedAttemptsLast24h(Integer failedAttemptsLast24h) { this.failedAttemptsLast24h = failedAttemptsLast24h; }
    public String getLastKnownLocation() { return lastKnownLocation; }
    public void setLastKnownLocation(String lastKnownLocation) { this.lastKnownLocation = lastKnownLocation; }
    public List<String> getAssociatedDevices() { return associatedDevices; }
    public void setAssociatedDevices(List<String> associatedDevices) { this.associatedDevices = associatedDevices; }
    public List<String> getRecentIpAddresses() { return recentIpAddresses; }
    public void setRecentIpAddresses(List<String> recentIpAddresses) { this.recentIpAddresses = recentIpAddresses; }
    public List<TransactionResponse> getRecentTransactions() { return recentTransactions; }
    public void setRecentTransactions(List<TransactionResponse> recentTransactions) { this.recentTransactions = recentTransactions; }
    public List<String> getFlaggedRiskFactors() { return flaggedRiskFactors; }
    public void setFlaggedRiskFactors(List<String> flaggedRiskFactors) { this.flaggedRiskFactors = flaggedRiskFactors; }
}
