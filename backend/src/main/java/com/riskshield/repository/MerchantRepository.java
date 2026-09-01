package com.riskshield.repository;

import com.riskshield.entity.Merchant;
import com.riskshield.enums.RiskLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MerchantRepository extends JpaRepository<Merchant, Long> {
    Optional<Merchant> findByMerchantId(String merchantId);
    Page<Merchant> findByRiskLevel(RiskLevel riskLevel, Pageable pageable);
    
    @Query("SELECT m FROM Merchant m WHERE LOWER(m.businessName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(m.merchantId) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Merchant> searchMerchants(String query, Pageable pageable);
}
