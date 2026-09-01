package com.riskshield.repository;

import com.riskshield.entity.Transaction;
import com.riskshield.enums.Decision;
import com.riskshield.enums.RiskLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByTransactionId(String transactionId);
    
    Page<Transaction> findByCustomerIdOrderByCreatedAtDesc(String customerId, Pageable pageable);
    Page<Transaction> findByMerchantIdOrderByCreatedAtDesc(String merchantId, Pageable pageable);
    Page<Transaction> findByRiskLevel(RiskLevel riskLevel, Pageable pageable);
    Page<Transaction> findByDecision(Decision decision, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE " +
           "(:customerId IS NULL OR t.customerId = :customerId) AND " +
           "(:merchantId IS NULL OR t.merchantId = :merchantId) AND " +
           "(:riskLevel IS NULL OR t.riskLevel = :riskLevel) AND " +
           "(:decision IS NULL OR t.decision = :decision) AND " +
           "(:startDate IS NULL OR t.createdAt >= :startDate) AND " +
           "(:endDate IS NULL OR t.createdAt <= :endDate) " +
           "ORDER BY t.createdAt DESC")
    Page<Transaction> filterTransactions(
            @Param("customerId") String customerId,
            @Param("merchantId") String merchantId,
            @Param("riskLevel") RiskLevel riskLevel,
            @Param("decision") Decision decision,
            @Param("startDate") ZonedDateTime startDate,
            @Param("endDate") ZonedDateTime endDate,
            Pageable pageable);

    // Recent velocity queries
    long countByCustomerIdAndCreatedAtAfter(String customerId, ZonedDateTime after);
    long countByDeviceIdAndCreatedAtAfter(String deviceId, ZonedDateTime after);
    long countByIpAddressAndCreatedAtAfter(String ipAddress, ZonedDateTime after);

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.customerId = :customerId AND t.status = 'FAILED' AND t.createdAt >= :after")
    long countFailedByCustomerAfter(@Param("customerId") String customerId, @Param("after") ZonedDateTime after);

    // Aggregations for Dashboard
    @Query("SELECT COUNT(t) FROM Transaction t")
    long countTotalTransactions();

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t")
    BigDecimal sumTotalVolume();

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.riskLevel IN ('HIGH', 'CRITICAL')")
    long countHighRiskTransactions();

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.decision = 'BLOCK'")
    long countBlockedFraudTransactions();

    @Query("SELECT COALESCE(AVG(t.riskScore), 0.0) FROM Transaction t")
    Double getAverageRiskScore();

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.decision = 'APPROVE'")
    long countApprovedTransactions();

    List<Transaction> findTop15ByOrderByCreatedAtDesc();
}
