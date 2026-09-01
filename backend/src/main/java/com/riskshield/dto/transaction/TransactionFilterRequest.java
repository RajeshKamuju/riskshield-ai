package com.riskshield.dto.transaction;

import com.riskshield.enums.Decision;
import com.riskshield.enums.RiskLevel;
import java.time.ZonedDateTime;

public class TransactionFilterRequest {
    private String customerId;
    private String merchantId;
    private RiskLevel riskLevel;
    private Decision decision;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
    private int page = 0;
    private int size = 20;

    public TransactionFilterRequest() {}

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public String getMerchantId() { return merchantId; }
    public void setMerchantId(String merchantId) { this.merchantId = merchantId; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public Decision getDecision() { return decision; }
    public void setDecision(Decision decision) { this.decision = decision; }
    public ZonedDateTime getStartDate() { return startDate; }
    public void setStartDate(ZonedDateTime startDate) { this.startDate = startDate; }
    public ZonedDateTime getEndDate() { return endDate; }
    public void setEndDate(ZonedDateTime endDate) { this.endDate = endDate; }
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }
    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }
}
