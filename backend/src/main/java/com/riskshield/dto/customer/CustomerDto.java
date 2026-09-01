package com.riskshield.dto.customer;

import com.riskshield.enums.RiskLevel;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

public class CustomerDto {
    private String customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private RiskLevel riskLevel;
    private String status;
    private Integer trustScore;
    private Integer accountAgeDays;
    private Boolean kycVerified;
    private BigDecimal historicalAverageAmount;
    private Integer lifetimeTransactionCount;
    private Integer failedAttemptsLast24h;
    private String lastKnownLocation;
    private ZonedDateTime createdAt;

    public CustomerDto() {}

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getTrustScore() { return trustScore; }
    public void setTrustScore(Integer trustScore) { this.trustScore = trustScore; }
    public Integer getAccountAgeDays() { return accountAgeDays; }
    public void setAccountAgeDays(Integer accountAgeDays) { this.accountAgeDays = accountAgeDays; }
    public Boolean getKycVerified() { return kycVerified; }
    public void setKycVerified(Boolean kycVerified) { this.kycVerified = kycVerified; }
    public BigDecimal getHistoricalAverageAmount() { return historicalAverageAmount; }
    public void setHistoricalAverageAmount(BigDecimal historicalAverageAmount) { this.historicalAverageAmount = historicalAverageAmount; }
    public Integer getLifetimeTransactionCount() { return lifetimeTransactionCount; }
    public void setLifetimeTransactionCount(Integer lifetimeTransactionCount) { this.lifetimeTransactionCount = lifetimeTransactionCount; }
    public Integer getFailedAttemptsLast24h() { return failedAttemptsLast24h; }
    public void setFailedAttemptsLast24h(Integer failedAttemptsLast24h) { this.failedAttemptsLast24h = failedAttemptsLast24h; }
    public String getLastKnownLocation() { return lastKnownLocation; }
    public void setLastKnownLocation(String lastKnownLocation) { this.lastKnownLocation = lastKnownLocation; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
