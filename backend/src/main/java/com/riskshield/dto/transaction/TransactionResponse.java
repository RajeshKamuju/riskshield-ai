package com.riskshield.dto.transaction;

import com.riskshield.dto.risk.RiskFactorDto;
import com.riskshield.enums.Decision;
import com.riskshield.enums.RiskLevel;
import com.riskshield.enums.TransactionStatus;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

public class TransactionResponse {

    private String transactionId;
    private String customerId;
    private String customerName;
    private String merchantId;
    private String merchantName;
    private BigDecimal amount;
    private String currency;
    private String paymentMethod;
    private String cardBin;
    private String cardLast4;
    private String deviceId;
    private String ipAddress;
    private String locationCity;
    private String locationCountry;
    private TransactionStatus status;
    private Integer riskScore;
    private RiskLevel riskLevel;
    private Decision decision;
    private String explanation;
    private String recommendedAction;
    private List<RiskFactorDto> riskFactors;
    private ZonedDateTime createdAt;

    public TransactionResponse() {}

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getMerchantId() { return merchantId; }
    public void setMerchantId(String merchantId) { this.merchantId = merchantId; }
    public String getMerchantName() { return merchantName; }
    public void setMerchantName(String merchantName) { this.merchantName = merchantName; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getCardBin() { return cardBin; }
    public void setCardBin(String cardBin) { this.cardBin = cardBin; }
    public String getCardLast4() { return cardLast4; }
    public void setCardLast4(String cardLast4) { this.cardLast4 = cardLast4; }
    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getLocationCity() { return locationCity; }
    public void setLocationCity(String locationCity) { this.locationCity = locationCity; }
    public String getLocationCountry() { return locationCountry; }
    public void setLocationCountry(String locationCountry) { this.locationCountry = locationCountry; }
    public TransactionStatus getStatus() { return status; }
    public void setStatus(TransactionStatus status) { this.status = status; }
    public Integer getRiskScore() { return riskScore; }
    public void setRiskScore(Integer riskScore) { this.riskScore = riskScore; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public Decision getDecision() { return decision; }
    public void setDecision(Decision decision) { this.decision = decision; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }
    public List<RiskFactorDto> getRiskFactors() { return riskFactors; }
    public void setRiskFactors(List<RiskFactorDto> riskFactors) { this.riskFactors = riskFactors; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
