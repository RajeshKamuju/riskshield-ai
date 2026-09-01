package com.riskshield.risk;

import com.riskshield.dto.risk.RiskEvaluationContext;
import com.riskshield.entity.RiskFactor;
import com.riskshield.entity.RiskRule;
import com.riskshield.repository.RiskRuleRepository;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class RuleBasedRiskModel implements RiskModel {

    private final RiskRuleRepository riskRuleRepository;

    public RuleBasedRiskModel(RiskRuleRepository riskRuleRepository) {
        this.riskRuleRepository = riskRuleRepository;
    }

    @Override
    public int evaluate(RiskEvaluationContext ctx, List<RiskFactor> factors) {
        int accumulatedRuleScore = 0;

        List<RiskRule> activeRules = riskRuleRepository.findByIsActiveTrue();
        for (RiskRule rule : activeRules) {
            boolean triggered = evaluateRule(rule, ctx);
            if (triggered) {
                accumulatedRuleScore += rule.getImpactScore();
                rule.setTotalTriggeredCount(rule.getTotalTriggeredCount() + 1);
                riskRuleRepository.save(rule);

                factors.add(new RiskFactor(
                        rule.getRuleCode(),
                        rule.getName(),
                        rule.getImpactScore(),
                        rule.getCategory(),
                        rule.getDescription(),
                        rule.getSeverity()
                ));
            }
        }

        // Cap rule score at 100
        return Math.min(100, accumulatedRuleScore);
    }

    private boolean evaluateRule(RiskRule rule, RiskEvaluationContext ctx) {
        String code = rule.getRuleCode();
        if (code == null) return false;

        switch (code) {
            case "RULE_HIGH_VELOCITY_BURST":
                return ctx.getRecentCustomerTxCount10m() >= 5;

            case "RULE_CARD_TESTING_BURST":
                return ctx.isCardTestingPattern() || (ctx.getRecentCustomerTxCount10m() >= 4 && ctx.getAmount().compareTo(new BigDecimal("200.00")) <= 0);

            case "RULE_EXTREME_AMOUNT_ANOMALY":
                if (ctx.getCustomer() != null && ctx.getCustomer().getHistoricalAverageAmount() != null) {
                    BigDecimal avg = ctx.getCustomer().getHistoricalAverageAmount();
                    if (avg.compareTo(BigDecimal.ZERO) > 0) {
                        BigDecimal multiplier = ctx.getAmount().divide(avg, 2, java.math.RoundingMode.HALF_UP);
                        return multiplier.compareTo(new BigDecimal("6.0")) >= 0;
                    }
                }
                return false;

            case "RULE_SUSPICIOUS_DEVICE_CLUSTER":
                return ctx.getDevice() != null && ctx.getDevice().getAssociatedAccountsCount() >= 4;

            case "RULE_TOR_PROXY_ATTACK":
                return ctx.getIpAddress() != null && (ctx.getIpAddress().getIsTor() || ctx.getIpAddress().getIsProxy());

            case "RULE_FAILED_BURST_TAKEOVER":
                return ctx.getFailedAttemptsLast24h() >= 3 && ctx.getAmount().compareTo(new BigDecimal("10000.00")) >= 0;

            case "RULE_GEO_VELOCITY_IMPOSSIBLE":
                return ctx.isGeographicAnomaly();

            default:
                return false;
        }
    }

    @Override
    public String getModelName() {
        return "RuleEngine-Deterministic";
    }

    @Override
    public String getVersion() {
        return "v2.1";
    }
}
