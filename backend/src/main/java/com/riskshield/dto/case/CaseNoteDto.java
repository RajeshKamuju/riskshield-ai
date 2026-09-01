package com.riskshield.dto.case;

import java.time.ZonedDateTime;

public class CaseNoteDto {
    private Long id;
    private String caseId;
    private String author;
    private String noteText;
    private String noteType;
    private ZonedDateTime createdAt;

    public CaseNoteDto() {}

    public CaseNoteDto(String caseId, String author, String noteText, String noteType, ZonedDateTime createdAt) {
        this.caseId = caseId;
        this.author = author;
        this.noteText = noteText;
        this.noteType = noteType;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
