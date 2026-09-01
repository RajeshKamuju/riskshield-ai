package com.riskshield.dto.alert;

import com.riskshield.enums.AlertStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AlertResolutionRequest {

    @NotNull(message = "Status is required")
    private AlertStatus status;

    @NotBlank(message = "Resolution notes are required")
    private String resolutionNotes;

    public AlertResolutionRequest() {}

    public AlertStatus getStatus() { return status; }
    public void setStatus(AlertStatus status) { this.status = status; }
    public String getResolutionNotes() { return resolutionNotes; }
    public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }
}
