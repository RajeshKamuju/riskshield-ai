package com.riskshield.entity;

import com.riskshield.enums.RiskLevel;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "ip_addresses", indexes = {
    @Index(name = "idx_ip_address_val", columnList = "ip_address")
})
public class IpAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address", nullable = false, unique = true, length = 45)
    private String ipAddress;

    @Column(nullable = false, length = 10)
    private String country = "IND";

    @Column(nullable = false, length = 100)
    private String city = "Mumbai";

    @Column(length = 150)
    private String isp = "Jio Fiber";

    @Column(name = "is_vpn", nullable = false)
    private Boolean isVpn = false;

    @Column(name = "is_proxy", nullable = false)
    private Boolean isProxy = false;

    @Column(name = "is_tor", nullable = false)
    private Boolean isTor = false;

    @Column(name = "reputation_score", nullable = false)
    private Integer reputationScore = 90;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 20)
    private RiskLevel riskLevel = RiskLevel.LOW;

    @Column(name = "first_seen_at", nullable = false)
    private ZonedDateTime firstSeenAt = ZonedDateTime.now();

    @Column(name = "last_seen_at", nullable = false)
    private ZonedDateTime lastSeenAt = ZonedDateTime.now();

    public IpAddress() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getIsp() { return isp; }
    public void setIsp(String isp) { this.isp = isp; }
    public Boolean getIsVpn() { return isVpn; }
    public void setIsVpn(Boolean vpn) { isVpn = vpn; }
    public Boolean getIsProxy() { return isProxy; }
    public void setIsProxy(Boolean proxy) { isProxy = proxy; }
    public Boolean getIsTor() { return isTor; }
    public void setIsTor(Boolean tor) { isTor = tor; }
    public Integer getReputationScore() { return reputationScore; }
    public void setReputationScore(Integer reputationScore) { this.reputationScore = reputationScore; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public ZonedDateTime getFirstSeenAt() { return firstSeenAt; }
    public void setFirstSeenAt(ZonedDateTime firstSeenAt) { this.firstSeenAt = firstSeenAt; }
    public ZonedDateTime getLastSeenAt() { return lastSeenAt; }
    public void setLastSeenAt(ZonedDateTime lastSeenAt) { this.lastSeenAt = lastSeenAt; }
}
