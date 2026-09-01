package com.riskshield.entity;

import com.riskshield.enums.CaseStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "investigation_cases", indexes = {
    @Index(name = "idx_case_id", columnList = "case_id"),
    @Index(name = "idx_case_status", columnList = "status"),
    @Index(name = "idx_case_priority", columnList = "priority")
})
public class InvestigationCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "case_id", nullable = false, unique = true, length = 64)
    private String caseId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 20)
    private String priority = "HIGH"; // LOW, MEDIUM, HIGH, CRITICAL

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CaseStatus status = CaseStatus.UNDER_INVESTIGATION;

    @Column(name = "lead_analyst", nullable = false, length = 100)
    private String leadAnalyst = "analyst_sarah";

    @Column(name = "target_type", nullable = false, length = 30)
    private String targetType = "TRANSACTION"; // TRANSACTION, CUSTOMER, MERCHANT, DEVICE_CLUSTER

    @Column(name = "target_id", nullable = false, length = 64)
    private String targetId;

    @Column(name = "total_suspicious_amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal totalSuspiciousAmount = BigDecimal.ZERO;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(length = 50)
    private String disposition;

    @OneToMany(mappedBy = "investigationCase", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CaseNote> notes = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt = ZonedDateTime.now();

    @Column(name = "closed_at")
    private ZonedDateTime closedAt;

    public InvestigationCase() {}

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }

    public void addNote(CaseNote note) {
        notes.add(note);
        note.setInvestigationCase(this);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public List<CaseNote> getNotes() { return notes; }
    public void setNotes(List<CaseNote> notes) { this.notes = notes; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
    public ZonedDateTime getClosedAt() { return closedAt; }
    public void setClosedAt(ZonedDateTime closedAt) { this.closedAt = closedAt; }
}
