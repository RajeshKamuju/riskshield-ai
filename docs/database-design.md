# RiskShield AI — Database Design & Schema Specification

## PostgreSQL Relational Structure (14 Core Tables)

1. **`roles`**: System role definitions (`ROLE_ANALYST`, `ROLE_MANAGER`, `ROLE_ADMIN`, `ROLE_AUDITOR`).
2. **`users`**: Platform security identities with BCrypt credential hashes and audit timestamps.
3. **`merchants`**: Merchant accounts, merchant categories (MCC), baseline volume limits, and trust metrics.
4. **`customers`**: Consumer profiles, historical average ticket sizes, KYC status, and risk flags.
5. **`devices`**: Canvas, WebGL, and OS hardware entropy fingerprints.
6. **`ip_addresses`**: Autonomous system metadata, Tor exit node flags, VPN/datacenter identifiers.
7. **`transactions`**: High-volume payment records across UPI, Card, and NetBanking methods.
8. **`risk_assessments`**: Immutable risk calculation records linked 1-to-1 with transactions.
9. **`risk_factors`**: Itemized point attribution breakdowns (`+20`, `+25`) explaining each assessment.
10. **`risk_rules`**: Dynamic boolean rule policies and condition expressions.
11. **`fraud_alerts`**: High-priority threat triggers routed to analyst worklists.
12. **`investigation_cases`**: Operational case files for suspicious activity reporting.
13. **`case_notes`**: Chronological evidence notes and analyst logs.
14. **`audit_logs`**: Tamper-evident logs of all system decisions, rule modifications, and manual overrides.
