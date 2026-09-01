package com.riskshield.dto.risk;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class RiskAnalysisRequest {

    private String transactionId;
    private String customerId;
    private String merchantId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private BigDecimal amount;

    private String deviceId;
    private String ipAddress;
    private String locationCity;
    private String locationCountry = "IND";
    private Integer recentTransactionsCount;
    private Integer failedTransactionsCount;
    private Integer customerAccountAgeDays;
    private BigDecimal historicalAverageAmount;
    private Boolean isNewDevice;
    private Boolean isVpnOrProxy;

    public RiskAnalysisRequest() {}

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getMerchantId() { return merchantId; }
    public void setMerchantId(String merchantId) { this.merchantId = merchantId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getLocationCity() { return locationCity; }
    public void setLocationCity(String locationCity) { this.locationCity = locationCity; }
    public String getLocationCountry() { return locationCountry; }
    public void setLocationCountry(String locationCountry) { this.locationCountry = locationCountry; }
    public Integer getRecentTransactionsCount() { return recentTransactionsCount; }
    public void setRecentTransactionsCount(Integer recentTransactionsCount) { this.recentTransactionsCount = recentTransactionsCount; }
    public Integer getFailedTransactionsCount() { return failedTransactionsCount; }
    public void setFailedTransactionsCount(Integer failedTransactionsCount) { this.failedTransactionsCount = failedTransactionsCount; }
    public Integer getCustomerAccountAgeDays() { return customerAccountAgeDays; }
    public void setCustomerAccountAgeDays(Integer customerAccountAgeDays) { this.customerAccountAgeDays = customerAccountAgeDays; }
    public BigDecimal getHistoricalAverageAmount() { return historicalAverageAmount; }
    public void setHistoricalAverageAmount(BigDecimal historicalAverageAmount) { this.historicalAverageAmount = historicalAverageAmount; }
    public Boolean getIsNewDevice() { return isNewDevice; }
    public void setIsNewDevice(Boolean isNewDevice) { this.isNewDevice = isNewDevice; }
    public Boolean getIsVpnOrProxy() { return isVpnOrProxy; }
    public void setIsVpnOrProxy(Boolean isVpnOrProxy) { this.isVpnOrProxy = isVpnOrProxy; }
}
