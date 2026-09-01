package com.riskshield.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "case_notes")
public class CaseNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_fk_id")
    @JsonIgnore
    private InvestigationCase investigationCase;

    @Column(name = "case_id", nullable = false, length = 64)
    private String caseId;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(name = "note_text", nullable = false, columnDefinition = "TEXT")
    private String noteText;

    @Column(name = "note_type", nullable = false, length = 50)
    private String noteType = "INVESTIGATION_UPDATE";

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    public CaseNote() {}

    public CaseNote(String caseId, String author, String noteText, String noteType) {
        this.caseId = caseId;
        this.author = author;
        this.noteText = noteText;
        this.noteType = noteType;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public InvestigationCase getInvestigationCase() { return investigationCase; }
    public void setInvestigationCase(InvestigationCase investigationCase) { this.investigationCase = investigationCase; }
    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getNoteText() { return noteText; }
    public void setNoteText(String noteText) { this.noteText = noteText; }
    public String getNoteType() { return noteType; }
    public void setNoteType(String noteType) { this.noteType = noteType; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
