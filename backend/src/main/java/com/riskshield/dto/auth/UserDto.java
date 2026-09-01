package com.riskshield.dto.auth;

import com.riskshield.enums.RoleType;
import java.time.ZonedDateTime;

public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private RoleType role;
    private Boolean isActive;
    private ZonedDateTime lastLoginAt;

    public UserDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public RoleType getRole() { return role; }
    public void setRole(RoleType role) { this.role = role; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean active) { isActive = active; }
    public ZonedDateTime getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(ZonedDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; }
}
