package com.riskshield.repository;

import com.riskshield.entity.FraudAlert;
import com.riskshield.enums.AlertStatus;
import com.riskshield.enums.RiskLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FraudAlertRepository extends JpaRepository<FraudAlert, Long> {
    Optional<FraudAlert> findByAlertId(String alertId);
    Optional<FraudAlert> findByTransactionId(String transactionId);
    Page<FraudAlert> findByStatus(AlertStatus status, Pageable pageable);
    Page<FraudAlert> findByRiskLevel(RiskLevel riskLevel, Pageable pageable);
    Page<FraudAlert> findByAssignedTo(String assignedTo, Pageable pageable);

    @Query("SELECT COUNT(a) FROM FraudAlert a WHERE a.status = 'OPEN'")
    long countOpenAlerts();

    List<FraudAlert> findTop10ByOrderByCreatedAtDesc();
}
