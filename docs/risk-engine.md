# RiskShield AI — Risk Decisioning Engine & Scoring Model

## 1. Multi-Model Architecture
The decision engine calculates a deterministic `0 – 100` score using a 3-layer hybrid formula:
$$\text{RiskScore} = \min(100, W_{\text{rule}} \cdot S_{\text{rule}} + W_{\text{behavior}} \cdot S_{\text{behavior}} + W_{\text{reputation}} \cdot S_{\text{reputation}})$$

### Core Weights:
- **Heuristic Rule Violations ($W_{\text{rule}} = 0.40$)**: Velocity thresholds, blacklisted identifiers, emulator flags.
- **Behavioral Anomaly ($W_{\text{behavior}} = 0.35$)**: Amount deviation from 30-day moving average, impossible travel speed.
- **Network & Device Reputation ($W_{\text{reputation}} = 0.25$)**: IP risk, Tor/VPN exit node detection, canvas entropy.

## 2. Decision Thresholds & Actions

| Score Range | Risk Level | Engine Decision | Action Description |
| :--- | :--- | :--- | :--- |
| **0 – 29** | **LOW** | `APPROVE` | Frictionless payment authorization |
| **30 – 59** | **MEDIUM** | `MONITOR` | Authorized with telemetry logging |
| **60 – 79** | **HIGH** | `REVIEW` | 2FA Step-up challenge / Analyst review |
| **80 – 100** | **CRITICAL** | `BLOCK` | Hard decline authorization immediately |
