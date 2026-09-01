package com.riskshield.repository;

import com.riskshield.entity.Customer;
import com.riskshield.enums.RiskLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByCustomerId(String customerId);
    Optional<Customer> findByEmail(String email);
    Page<Customer> findByRiskLevel(RiskLevel riskLevel, Pageable pageable);

    @Query("SELECT c FROM Customer c WHERE LOWER(c.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.email) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.customerId) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Customer> searchCustomers(String query, Pageable pageable);
}
