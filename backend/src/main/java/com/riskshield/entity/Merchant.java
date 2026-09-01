package com.riskshield.entity;

import com.riskshield.enums.RiskLevel;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "merchants", indexes = {
    @Index(name = "idx_merch_merchant_id", columnList = "merchant_id"),
    @Index(name = "idx_merch_risk_level", columnList = "risk_level")
})
public class Merchant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "merchant_id", nullable = false, unique = true, length = 50)
    private String merchantId;

    @Column(name = "business_name", nullable = false, length = 200)
    private String businessName;

    @Column(nullable = false, length = 100)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 20)
    private RiskLevel riskLevel = RiskLevel.LOW;

    @Column(nullable = false, length = 30)
    private String status = "ACTIVE";

    @Column(name = "trust_score", nullable = false)
    private Integer trustScore = 95;

    @Column(name = "chargeback_rate", precision = 5, scale = 4, nullable = false)
    private BigDecimal chargebackRate = new BigDecimal("0.0020");

    @Column(name = "daily_volume_limit", precision = 15, scale = 2, nullable = false)
    private BigDecimal dailyVolumeLimit = new BigDecimal("5000000.00");

    @Column(name = "current_daily_volume", precision = 15, scale = 2, nullable = false)
    private BigDecimal currentDailyVolume = BigDecimal.ZERO;

    @Column(name = "registered_country", nullable = false, length = 10)
    private String registeredCountry = "IND";

    @Column(name = "contact_email", length = 150)
    private String contactEmail;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt = ZonedDateTime.now();

    public Merchant() {}

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMerchantId() { return merchantId; }
    public void setMerchantId(String merchantId) { this.merchantId = merchantId; }
    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getTrustScore() { return trustScore; }
    public void setTrustScore(Integer trustScore) { this.trustScore = trustScore; }
    public BigDecimal getChargebackRate() { return chargebackRate; }
    public void setChargebackRate(BigDecimal chargebackRate) { this.chargebackRate = chargebackRate; }
    public BigDecimal getDailyVolumeLimit() { return dailyVolumeLimit; }
    public void setDailyVolumeLimit(BigDecimal dailyVolumeLimit) { this.dailyVolumeLimit = dailyVolumeLimit; }
    public BigDecimal getCurrentDailyVolume() { return currentDailyVolume; }
    public void setCurrentDailyVolume(BigDecimal currentDailyVolume) { this.currentDailyVolume = currentDailyVolume; }
    public String getRegisteredCountry() { return registeredCountry; }
    public void setRegisteredCountry(String registeredCountry) { this.registeredCountry = registeredCountry; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
}
