package com.riskshield.dto.risk;

import com.riskshield.entity.Customer;
import com.riskshield.entity.Device;
import com.riskshield.entity.IpAddress;
import com.riskshield.entity.Merchant;
import java.math.BigDecimal;

public class RiskEvaluationContext {
    private String transactionId;
    private Customer customer;
    private Merchant merchant;
    private Device device;
    private IpAddress ipAddress;
    private BigDecimal amount;
    private String currency;
    private String locationCity;
    private String locationCountry;
    private long recentCustomerTxCount10m;
    private long recentCustomerTxCount24h;
    private long recentDeviceTxCount1h;
    private long recentIpTxCount1h;
    private long failedAttemptsLast24h;
    private boolean isDeviceNovelForCustomer;
    private boolean isGeographicAnomaly;
    private boolean isCardTestingPattern;

    public RiskEvaluationContext() {}

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public Merchant getMerchant() { return merchant; }
    public void setMerchant(Merchant merchant) { this.merchant = merchant; }
    public Device getDevice() { return device; }
    public void setDevice(Device device) { this.device = device; }
    public IpAddress getIpAddress() { return ipAddress; }
    public void setIpAddress(IpAddress ipAddress) { this.ipAddress = ipAddress; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public String getLocationCity() { return locationCity; }
    public void setLocationCity(String locationCity) { this.locationCity = locationCity; }
    public String getLocationCountry() { return locationCountry; }
    public void setLocationCountry(String locationCountry) { this.locationCountry = locationCountry; }
    public long getRecentCustomerTxCount10m() { return recentCustomerTxCount10m; }
    public void setRecentCustomerTxCount10m(long recentCustomerTxCount10m) { this.recentCustomerTxCount10m = recentCustomerTxCount10m; }
    public long getRecentCustomerTxCount24h() { return recentCustomerTxCount24h; }
    public void setRecentCustomerTxCount24h(long recentCustomerTxCount24h) { this.recentCustomerTxCount24h = recentCustomerTxCount24h; }
    public long getRecentDeviceTxCount1h() { return recentDeviceTxCount1h; }
    public void setRecentDeviceTxCount1h(long recentDeviceTxCount1h) { this.recentDeviceTxCount1h = recentDeviceTxCount1h; }
    public long getRecentIpTxCount1h() { return recentIpTxCount1h; }
    public void setRecentIpTxCount1h(long recentIpTxCount1h) { this.recentIpTxCount1h = recentIpTxCount1h; }
    public long getFailedAttemptsLast24h() { return failedAttemptsLast24h; }
    public void setFailedAttemptsLast24h(long failedAttemptsLast24h) { this.failedAttemptsLast24h = failedAttemptsLast24h; }
    public boolean isDeviceNovelForCustomer() { return isDeviceNovelForCustomer; }
    public void setDeviceNovelForCustomer(boolean deviceNovelForCustomer) { isDeviceNovelForCustomer = deviceNovelForCustomer; }
    public boolean isGeographicAnomaly() { return isGeographicAnomaly; }
    public void setGeographicAnomaly(boolean geographicAnomaly) { isGeographicAnomaly = geographicAnomaly; }
    public boolean isCardTestingPattern() { return isCardTestingPattern; }
    public void setCardTestingPattern(boolean cardTestingPattern) { isCardTestingPattern = cardTestingPattern; }
}
