package com.riskshield.entity;

import com.riskshield.enums.RiskLevel;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "customers", indexes = {
    @Index(name = "idx_cust_customer_id", columnList = "customer_id"),
    @Index(name = "idx_cust_email", columnList = "email"),
    @Index(name = "idx_cust_risk_level", columnList = "risk_level")
})
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id", nullable = false, unique = true, length = 50)
    private String customerId;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "phone_number", nullable = false, length = 30)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 20)
    private RiskLevel riskLevel = RiskLevel.LOW;

    @Column(nullable = false, length = 30)
    private String status = "ACTIVE";

    @Column(name = "trust_score", nullable = false)
    private Integer trustScore = 90;

    @Column(name = "account_age_days", nullable = false)
    private Integer accountAgeDays = 180;

    @Column(name = "kyc_verified", nullable = false)
    private Boolean kycVerified = true;

    @Column(name = "historical_average_amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal historicalAverageAmount = new BigDecimal("1200.00");

    @Column(name = "lifetime_transaction_count", nullable = false)
    private Integer lifetimeTransactionCount = 45;

    @Column(name = "failed_attempts_last_24h", nullable = false)
    private Integer failedAttemptsLast24h = 0;

    @Column(name = "last_known_location", length = 100)
    private String lastKnownLocation = "Mumbai, India";

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt = ZonedDateTime.now();

    public Customer() {}

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
}
