package com.riskshield.dto.case;

import com.riskshield.enums.CaseStatus;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

public class CaseDto {
    private String caseId;
    private String title;
    private String priority;
    private CaseStatus status;
    private String leadAnalyst;
    private String targetType;
    private String targetId;
    private BigDecimal totalSuspiciousAmount;
    private String summary;
    private String disposition;
    private List<CaseNoteDto> notes = new ArrayList<>();
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
    private ZonedDateTime closedAt;

    public CaseDto() {}

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public CaseStatus getStatus() { return status; }
    public void setStatus(CaseStatus status) { this.status = status; }
    public String getLeadAnalyst() { return leadAnalyst; }
    public void setLeadAnalyst(String leadAnalyst) { this.leadAnalyst = leadAnalyst; }
    public String getTargetType() { return targetType; }
    public void setTargetType(String targetType) { this.targetType = targetType; }
    public String getTargetId() { return targetId; }
    public void setTargetId(String targetId) { this.targetId = targetId; }
    public BigDecimal getTotalSuspiciousAmount() { return totalSuspiciousAmount; }
    public void setTotalSuspiciousAmount(BigDecimal totalSuspiciousAmount) { this.totalSuspiciousAmount = totalSuspiciousAmount; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getDisposition() { return disposition; }
    public void setDisposition(String disposition) { this.disposition = disposition; }
    public List<CaseNoteDto> getNotes() { return notes; }
    public void setNotes(List<CaseNoteDto> notes) { this.notes = notes; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
    public ZonedDateTime getClosedAt() { return closedAt; }
    public void setClosedAt(ZonedDateTime closedAt) { this.closedAt = closedAt; }
}
