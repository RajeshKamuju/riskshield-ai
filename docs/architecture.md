# RiskShield AI — Enterprise System Architecture

## Overview
**RiskShield AI** is an intelligent, high-throughput payment risk and fraud decisioning platform designed to safeguard payment gateways, merchant aggregators, and fintechs.

```
+-----------------------------------------------------------------------------------+
|                            CLIENT / MERCHANT CHECKOUT                            |
|             (UPI Intent, Card Checkout, NetBanking, Subscriptions)                |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v  REST JSON (/api/risk/evaluate)
+-----------------------------------------------------------------------------------+
|                           SPRING BOOT 3 RISK ENGINE                               |
|                                                                                   |
|  +---------------------+   +---------------------+   +-------------------------+  |
|  | Multi-Signal Ingest |-->| Rule Engine (v3.2)  |-->| Explainable Scorer (0-100)|  |
|  +---------------------+   +---------------------+   +-------------------------+  |
|                                                                 |                 |
|                                                                 v                 |
|                                                    +---------------------------+  |
|                                                    | Automated Verdict Action  |  |
|                                                    | (APPROVE/MONITOR/REVIEW/  |  |
|                                                    |  BLOCK)                   |  |
|                                                    +---------------------------+  |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                             POSTGRESQL 16 PERSISTENCE                             |
|  (Transactions, Assessments, Factors, Rules, Alerts, Cases, Audit Trails, RBAC)   |
+-----------------------------------------------------------------------------------+
```

## Latency SLA & Determinism
- **P99 Evaluation Latency**: `< 15ms`
- **Scoring Scale**: `0 – 100` (Deterministic, reproducible, and explainable)
- **Security**: JWT Authentication, Role-Based Access Control, SHA-256 Audit Integrity
