package com.riskshield.repository;

import com.riskshield.entity.InvestigationCase;
import com.riskshield.enums.CaseStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InvestigationCaseRepository extends JpaRepository<InvestigationCase, Long> {
    Optional<InvestigationCase> findByCaseId(String caseId);
    Page<InvestigationCase> findByStatus(CaseStatus status, Pageable pageable);
    Page<InvestigationCase> findByPriority(String priority, Pageable pageable);
    Page<InvestigationCase> findByLeadAnalyst(String leadAnalyst, Pageable pageable);

    @Query("SELECT COUNT(c) FROM InvestigationCase c WHERE c.status IN ('OPEN', 'UNDER_INVESTIGATION', 'ESCALATED')")
    long countActiveCases();
}
