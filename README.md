# RiskShield AI — Intelligent Payment Risk & Fraud Decisioning Platform

> **Detect Fraud. Understand Risk. Protect Every Payment.**

An enterprise-style fintech platform for payment gateways, banks, and merchant platforms. Features real-time risk scoring (<15ms latency), multi-signal fraud detection, explainable decisioning, rule engines, and investigation case management.

---

## Technology Stack

### Backend
- **Language**: Java 17+
- **Framework**: Spring Boot 3.2.3
- **Data Access**: Spring Data JPA / Hibernate
- **Database**: PostgreSQL 16+ (H2 support for standalone profile)
- **Security**: Spring Security & JJWT (JSON Web Token)
- **Validation**: Jakarta Bean Validation
- **Testing**: JUnit 5, Mockito

### Frontend
- **Interface**: Semantic HTML5 & Modern CSS3
- **Theme**: Cinematic Dark, Cybernetic Fintech Design System
- **Scripting**: Vanilla JavaScript (ES6+), Fetch API Client
- **Visualization**: Animated SVG Circular Radar Gauges & Risk Spectrum Meters

---

## Project Structure
```
RiskShield-AI/
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/riskshield/
│       │   │   ├── RiskShieldApplication.java
│       │   │   ├── config/
│       │   │   ├── controller/
│       │   │   ├── service/
│       │   │   ├── repository/
│       │   │   ├── entity/
│       │   │   ├── dto/
│       │   │   ├── mapper/
│       │   │   ├── security/
│       │   │   ├── exception/
│       │   │   ├── risk/
│       │   │   ├── enums/
│       │   │   └── util/
│       │   └── resources/
│       │       ├── application.properties
│       │       └── data.sql
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── transactions.html
│   ├── risk-rules.html
│   ├── investigation-cases.html
│   ├── fraud-alerts.html
│   ├── audit-logs.html
│   ├── risk-simulator.html
│   ├── css/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── global.css
│   │   ├── components.css
│   │   ├── landing.css
│   │   └── responsive.css
│   └── js/
│       ├── config.js
│       ├── mock-data.js
│       ├── api.js
│       ├── components.js
│       ├── navigation.js
│       └── landing.js
├── database/
│   ├── schema.sql
│   └── seed.sql
└── docs/
    ├── architecture.md
    ├── database-design.md
    ├── api-documentation.md
    └── risk-engine.md
```
