package com.riskshield.mapper;

import com.riskshield.dto.alert.AlertDto;
import com.riskshield.dto.auth.UserDto;
import com.riskshield.dto.case.CaseDto;
import com.riskshield.dto.case.CaseNoteDto;
import com.riskshield.dto.customer.CustomerDto;
import com.riskshield.dto.merchant.MerchantDto;
import com.riskshield.dto.risk.RiskAnalysisResponse;
import com.riskshield.dto.risk.RiskFactorDto;
import com.riskshield.dto.transaction.TransactionResponse;
import com.riskshield.entity.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class EntityDtoMapper {

    public UserDto toUserDto(User user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setRole(user.getRole());
        dto.setIsActive(user.getIsActive());
        dto.setLastLoginAt(user.getLastLoginAt());
        return dto;
    }

    public TransactionResponse toTransactionResponse(Transaction tx, Customer cust, Merchant merch, RiskAssessment assessment) {
        if (tx == null) return null;
        TransactionResponse res = new TransactionResponse();
        res.setTransactionId(tx.getTransactionId());
        res.setCustomerId(tx.getCustomerId());
        res.setCustomerName(cust != null ? (cust.getFirstName() + " " + cust.getLastName()) : tx.getCustomerId());
        res.setMerchantId(tx.getMerchantId());
        res.setMerchantName(merch != null ? merch.getBusinessName() : tx.getMerchantId());
        res.setAmount(tx.getAmount());
        res.setCurrency(tx.getCurrency());
        res.setPaymentMethod(tx.getPaymentMethod());
        res.setCardBin(tx.getCardBin());
        res.setCardLast4(tx.getCardLast4());
        res.setDeviceId(tx.getDeviceId());
        res.setIpAddress(tx.getIpAddress());
        res.setLocationCity(tx.getLocationCity());
        res.setLocationCountry(tx.getLocationCountry());
        res.setStatus(tx.getStatus());
        res.setRiskScore(tx.getRiskScore());
        res.setRiskLevel(tx.getRiskLevel());
        res.setDecision(tx.getDecision());
        res.setCreatedAt(tx.getCreatedAt());

        if (assessment != null) {
            res.setExplanation(assessment.getExplanation());
            res.setRecommendedAction(assessment.getRecommendedAction());
            if (assessment.getRiskFactors() != null) {
                res.setRiskFactors(assessment.getRiskFactors().stream()
                        .map(this::toRiskFactorDto)
                        .collect(Collectors.toList()));
            }
        }
        return res;
    }

    public RiskFactorDto toRiskFactorDto(RiskFactor f) {
        if (f == null) return null;
        return new RiskFactorDto(
                f.getFactorCode(),
                f.getFactorName(),
                f.getWeightScore(),
                f.getCategory(),
                f.getDetails(),
                f.getSeverity()
        );
    }

    public RiskAnalysisResponse toRiskAnalysisResponse(RiskAssessment ra) {
        if (ra == null) return null;
        RiskAnalysisResponse res = new RiskAnalysisResponse();
        res.setTransactionId(ra.getTransactionId());
        res.setRiskScore(ra.getRiskScore());
        res.setRiskLevel(ra.getRiskLevel());
        res.setDecision(ra.getDecision());
        res.setRuleScore(ra.getRuleScore());
        res.setBehavioralScore(ra.getBehavioralScore());
        res.setMlScore(ra.getMlScore());
        res.setModelVersion(ra.getModelVersion());
        res.setExplanation(ra.getExplanation());
        res.setRecommendedAction(ra.getRecommendedAction());
        res.setEvaluationTimeMs(ra.getEvaluationTimeMs());
        if (ra.getRiskFactors() != null) {
            res.setRiskFactors(ra.getRiskFactors().stream().map(this::toRiskFactorDto).collect(Collectors.toList()));
        }
        return res;
    }

    public AlertDto toAlertDto(FraudAlert alert) {
        if (alert == null) return null;
        AlertDto dto = new AlertDto();
        dto.setAlertId(alert.getAlertId());
        dto.setTransactionId(alert.getTransactionId());
        dto.setCustomerId(alert.getCustomerId());
        dto.setMerchantId(alert.getMerchantId());
        dto.setAmount(alert.getAmount());
        dto.setRiskScore(alert.getRiskScore());
        dto.setRiskLevel(alert.getRiskLevel());
        dto.setAlertType(alert.getAlertType());
        dto.setStatus(alert.getStatus());
        dto.setAssignedTo(alert.getAssignedTo());
        dto.setResolutionNotes(alert.getResolutionNotes());
        dto.setCreatedAt(alert.getCreatedAt());
        dto.setResolvedAt(alert.getResolvedAt());
        return dto;
    }

    public CaseDto toCaseDto(InvestigationCase ic) {
        if (ic == null) return null;
        CaseDto dto = new CaseDto();
        dto.setCaseId(ic.getCaseId());
        dto.setTitle(ic.getTitle());
        dto.setPriority(ic.getPriority());
        dto.setStatus(ic.getStatus());
        dto.setLeadAnalyst(ic.getLeadAnalyst());
        dto.setTargetType(ic.getTargetType());
        dto.setTargetId(ic.getTargetId());
        dto.setTotalSuspiciousAmount(ic.getTotalSuspiciousAmount());
        dto.setSummary(ic.getSummary());
        dto.setDisposition(ic.getDisposition());
        dto.setCreatedAt(ic.getCreatedAt());
        dto.setUpdatedAt(ic.getUpdatedAt());
        dto.setClosedAt(ic.getClosedAt());
        if (ic.getNotes() != null) {
            dto.setNotes(ic.getNotes().stream().map(this::toCaseNoteDto).collect(Collectors.toList()));
        }
        return dto;
    }

    public CaseNoteDto toCaseNoteDto(CaseNote note) {
        if (note == null) return null;
        return new CaseNoteDto(
                note.getCaseId(),
                note.getAuthor(),
                note.getNoteText(),
                note.getNoteType(),
                note.getCreatedAt()
        );
    }

    public CustomerDto toCustomerDto(Customer c) {
        if (c == null) return null;
        CustomerDto dto = new CustomerDto();
        dto.setCustomerId(c.getCustomerId());
        dto.setFirstName(c.getFirstName());
        dto.setLastName(c.getLastName());
        dto.setEmail(c.getEmail());
        dto.setPhoneNumber(c.getPhoneNumber());
        dto.setRiskLevel(c.getRiskLevel());
        dto.setStatus(c.getStatus());
        dto.setTrustScore(c.getTrustScore());
        dto.setAccountAgeDays(c.getAccountAgeDays());
        dto.setKycVerified(c.getKycVerified());
        dto.setHistoricalAverageAmount(c.getHistoricalAverageAmount());
        dto.setLifetimeTransactionCount(c.getLifetimeTransactionCount());
        dto.setFailedAttemptsLast24h(c.getFailedAttemptsLast24h());
        dto.setLastKnownLocation(c.getLastKnownLocation());
        dto.setCreatedAt(c.getCreatedAt());
        return dto;
    }

    public MerchantDto toMerchantDto(Merchant m) {
        if (m == null) return null;
        MerchantDto dto = new MerchantDto();
        dto.setMerchantId(m.getMerchantId());
        dto.setBusinessName(m.getBusinessName());
        dto.setCategory(m.getCategory());
        dto.setRiskLevel(m.getRiskLevel());
        dto.setStatus(m.getStatus());
        dto.setTrustScore(m.getTrustScore());
        dto.setChargebackRate(m.getChargebackRate());
        dto.setDailyVolumeLimit(m.getDailyVolumeLimit());
        dto.setCurrentDailyVolume(m.getCurrentDailyVolume());
        dto.setRegisteredCountry(m.getRegisteredCountry());
        dto.setContactEmail(m.getContactEmail());
        dto.setCreatedAt(m.getCreatedAt());
        return dto;
    }
}
