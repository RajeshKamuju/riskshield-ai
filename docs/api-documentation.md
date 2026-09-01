# RiskShield AI — REST API Documentation

### Base URL: `/api/v1`

## 1. Authentication Endpoints
- `POST /auth/login` — Authenticates analyst/manager credentials and returns signed JWT token.
- `POST /auth/register` — Registers new analyst request (requires admin approval).
- `GET /auth/me` — Returns authenticated user profile and roles.

## 2. Risk Evaluation Engine
- `POST /risk/evaluate` — Primary authorization webhook endpoint.
  - **Input Payload**:
    ```json
    {
      "transactionId": "TXN-92841",
      "amount": 75000.00,
      "currency": "INR",
      "paymentMethod": "UPI",
      "customerId": "CUST-84920",
      "merchantId": "MERCH-1002",
      "deviceFingerprint": "d9817a7e8f...",
      "ipAddress": "185.220.101.99"
    }
    ```
  - **Output Response**:
    ```json
    {
      "transactionId": "TXN-92841",
      "riskScore": 92,
      "riskLevel": "CRITICAL",
      "decision": "BLOCK",
      "evaluationLatencyMs": 11,
      "factors": [
        { "code": "AMOUNT_ANOMALY", "points": 20, "explanation": "8.4x baseline deviation" },
        { "code": "VELOCITY_SPIKE", "points": 25, "explanation": "6 txns within 180s" },
        { "code": "TOR_NODE", "points": 20, "explanation": "IP matches active exit node" }
      ]
    }
    ```

## 3. Operations & Analytics
- `GET /dashboard/summary` — Key performance metrics, loss prevention totals, and volume statistics.
- `GET /transactions` — Paginated list of real-time evaluated transactions with filtering.
- `GET /alerts` — High-priority unresolved fraud alerts.
- `GET /cases` — Active investigation case management queue.
- `GET /rules` — Active risk policy rules and configurations.
