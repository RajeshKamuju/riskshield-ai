package com.riskshield.dto.case;

import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class CaseCreateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String priority = "HIGH";
    private String targetType = "TRANSACTION";

    @NotBlank(message = "Target ID is required")
    private String targetId;

    private BigDecimal totalSuspiciousAmount = BigDecimal.ZERO;
    private String summary;

    public CaseCreateRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getTargetType() { return targetType; }
    public void setTargetType(String targetType) { this.targetType = targetType; }
    public String getTargetId() { return targetId; }
    public void setTargetId(String targetId) { this.targetId = targetId; }
    public BigDecimal getTotalSuspiciousAmount() { return totalSuspiciousAmount; }
    public void setTotalSuspiciousAmount(BigDecimal totalSuspiciousAmount) { this.totalSuspiciousAmount = totalSuspiciousAmount; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
}
