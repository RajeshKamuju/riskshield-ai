package com.riskshield.dto.merchant;

import com.riskshield.enums.RiskLevel;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

public class MerchantDto {
    private String merchantId;
    private String businessName;
    private String category;
    private RiskLevel riskLevel;
    private String status;
    private Integer trustScore;
    private BigDecimal chargebackRate;
    private BigDecimal dailyVolumeLimit;
    private BigDecimal currentDailyVolume;
    private String registeredCountry;
    private String contactEmail;
    private ZonedDateTime createdAt;

    public MerchantDto() {}

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
}
