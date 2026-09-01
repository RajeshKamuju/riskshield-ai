package com.riskshield.entity;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "devices", indexes = {
    @Index(name = "idx_dev_fingerprint", columnList = "device_fingerprint")
})
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "device_fingerprint", nullable = false, unique = true, length = 128)
    private String deviceFingerprint;

    @Column(name = "device_type", nullable = false, length = 50)
    private String deviceType = "MOBILE";

    @Column(length = 50)
    private String os = "Android 14";

    @Column(length = 50)
    private String browser = "Chrome Mobile";

    @Column(name = "trust_score", nullable = false)
    private Integer trustScore = 85;

    @Column(name = "is_emulator", nullable = false)
    private Boolean isEmulator = false;

    @Column(name = "is_rooted_or_jailbroken", nullable = false)
    private Boolean isRootedOrJailbroken = false;

    @Column(name = "associated_accounts_count", nullable = false)
    private Integer associatedAccountsCount = 1;

    @Column(name = "first_seen_at", nullable = false)
    private ZonedDateTime firstSeenAt = ZonedDateTime.now();

    @Column(name = "last_seen_at", nullable = false)
    private ZonedDateTime lastSeenAt = ZonedDateTime.now();

    public Device() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDeviceFingerprint() { return deviceFingerprint; }
    public void setDeviceFingerprint(String deviceFingerprint) { this.deviceFingerprint = deviceFingerprint; }
    public String getDeviceType() { return deviceType; }
    public void setDeviceType(String deviceType) { this.deviceType = deviceType; }
    public String getOs() { return os; }
    public void setOs(String os) { this.os = os; }
    public String getBrowser() { return browser; }
    public void setBrowser(String browser) { this.browser = browser; }
    public Integer getTrustScore() { return trustScore; }
    public void setTrustScore(Integer trustScore) { this.trustScore = trustScore; }
    public Boolean getIsEmulator() { return isEmulator; }
    public void setIsEmulator(Boolean isEmulator) { this.isEmulator = isEmulator; }
    public Boolean getIsRootedOrJailbroken() { return isRootedOrJailbroken; }
    public void setIsRootedOrJailbroken(Boolean rooted) { isRootedOrJailbroken = rooted; }
    public Integer getAssociatedAccountsCount() { return associatedAccountsCount; }
    public void setAssociatedAccountsCount(Integer count) { this.associatedAccountsCount = count; }
    public ZonedDateTime getFirstSeenAt() { return firstSeenAt; }
    public void setFirstSeenAt(ZonedDateTime firstSeenAt) { this.firstSeenAt = firstSeenAt; }
    public ZonedDateTime getLastSeenAt() { return lastSeenAt; }
    public void setLastSeenAt(ZonedDateTime lastSeenAt) { this.lastSeenAt = lastSeenAt; }
}
