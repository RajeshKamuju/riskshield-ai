package com.riskshield.risk;

import com.riskshield.dto.risk.RiskEvaluationContext;
import com.riskshield.entity.RiskFactor;

import java.util.List;

public interface RiskModel {
    /**
     * Calculates the risk score contribution for the given evaluation context.
     * @param context the transaction context
     * @param factors accumulator list for explainability
     * @return partial score between 0 and 100
     */
    int evaluate(RiskEvaluationContext context, List<RiskFactor> factors);

    String getModelName();
    String getVersion();
}
