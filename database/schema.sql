-- ===================================================================
-- RISKSHIELD AI - PostgreSQL Database Schema
-- Production-Grade Payment Risk & Fraud Decisioning Platform
-- ===================================================================

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'RISK_ANALYST',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Merchants Table
CREATE TABLE IF NOT EXISTS merchants (
    id BIGSERIAL PRIMARY KEY,
    merchant_id VARCHAR(50) NOT NULL UNIQUE,
    business_name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    risk_level VARCHAR(20) NOT NULL DEFAULT 'LOW',
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    trust_score INT NOT NULL DEFAULT 95,
    chargeback_rate DECIMAL(5, 4) NOT NULL DEFAULT 0.0020,
    daily_volume_limit DECIMAL(15, 2) NOT NULL DEFAULT 5000000.00,
    current_daily_volume DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    registered_country VARCHAR(10) NOT NULL DEFAULT 'IND',
    contact_email VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone_number VARCHAR(30) NOT NULL,
    risk_level VARCHAR(20) NOT NULL DEFAULT 'LOW',
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    trust_score INT NOT NULL DEFAULT 90,
    account_age_days INT NOT NULL DEFAULT 180,
    kyc_verified BOOLEAN NOT NULL DEFAULT TRUE,
    historical_average_amount DECIMAL(15, 2) NOT NULL DEFAULT 1200.00,
    lifetime_transaction_count INT NOT NULL DEFAULT 45,
    failed_attempts_last_24h INT NOT NULL DEFAULT 0,
    last_known_location VARCHAR(100) DEFAULT 'Mumbai, India',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Devices Table
CREATE TABLE IF NOT EXISTS devices (
    id BIGSERIAL PRIMARY KEY,
    device_fingerprint VARCHAR(128) NOT NULL UNIQUE,
    device_type VARCHAR(50) NOT NULL, -- MOBILE, DESKTOP, TABLET, BOT_EMULATOR
    os VARCHAR(50),
    browser VARCHAR(50),
    trust_score INT NOT NULL DEFAULT 85,
    is_emulator BOOLEAN NOT NULL DEFAULT FALSE,
    is_rooted_or_jailbroken BOOLEAN NOT NULL DEFAULT FALSE,
    associated_accounts_count INT NOT NULL DEFAULT 1,
    first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. IP Addresses Table
CREATE TABLE IF NOT EXISTS ip_addresses (
    id BIGSERIAL PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL UNIQUE,
    country VARCHAR(10) NOT NULL DEFAULT 'IND',
    city VARCHAR(100) NOT NULL DEFAULT 'Mumbai',
    isp VARCHAR(150),
    is_vpn BOOLEAN NOT NULL DEFAULT FALSE,
    is_proxy BOOLEAN NOT NULL DEFAULT FALSE,
    is_tor BOOLEAN NOT NULL DEFAULT FALSE,
    reputation_score INT NOT NULL DEFAULT 90,
    risk_level VARCHAR(20) NOT NULL DEFAULT 'LOW',
    first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,
    transaction_id VARCHAR(64) NOT NULL UNIQUE,
    customer_id VARCHAR(50) NOT NULL,
    merchant_id VARCHAR(50) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    payment_method VARCHAR(50) NOT NULL, -- UPI, CREDIT_CARD, DEBIT_CARD, NET_BANKING
    card_bin VARCHAR(8),
    card_last4 VARCHAR(4),
    device_id VARCHAR(128),
    ip_address VARCHAR(45),
    location_city VARCHAR(100),
    location_country VARCHAR(10) DEFAULT 'IND',
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED', -- COMPLETED, FAILED, BLOCKED, PENDING_REVIEW
    risk_score INT NOT NULL DEFAULT 15,
    risk_level VARCHAR(20) NOT NULL DEFAULT 'LOW', -- LOW, MEDIUM, HIGH, CRITICAL
    decision VARCHAR(20) NOT NULL DEFAULT 'APPROVE', -- APPROVE, MONITOR, REVIEW, BLOCK
    failure_reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Risk Assessments Table
CREATE TABLE IF NOT EXISTS risk_assessments (
    id BIGSERIAL PRIMARY KEY,
    transaction_id VARCHAR(64) NOT NULL UNIQUE,
    risk_score INT NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    decision VARCHAR(20) NOT NULL,
    rule_score INT NOT NULL DEFAULT 0,
    behavioral_score INT NOT NULL DEFAULT 0,
    ml_score INT NOT NULL DEFAULT 0,
    model_version VARCHAR(50) NOT NULL DEFAULT 'v1.4-hybrid',
    explanation TEXT NOT NULL,
    recommended_action VARCHAR(100) NOT NULL,
    evaluation_time_ms INT NOT NULL DEFAULT 18,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Risk Factors Table
CREATE TABLE IF NOT EXISTS risk_factors (
    id BIGSERIAL PRIMARY KEY,
    assessment_id BIGINT NOT NULL,
    factor_code VARCHAR(100) NOT NULL,
    factor_name VARCHAR(150) NOT NULL,
    weight_score INT NOT NULL,
    category VARCHAR(50) NOT NULL, -- VELOCITY, AMOUNT, DEVICE, NETWORK, LOCATION, REPUTATION
    details TEXT,
    severity VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_risk_assessment FOREIGN KEY (assessment_id) REFERENCES risk_assessments (id) ON DELETE CASCADE
);

-- 10. Risk Rules Table
CREATE TABLE IF NOT EXISTS risk_rules (
    id BIGSERIAL PRIMARY KEY,
    rule_code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'HIGH',
    impact_score INT NOT NULL DEFAULT 25,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    condition_expression TEXT NOT NULL,
    action_type VARCHAR(30) NOT NULL DEFAULT 'FLAG_REVIEW',
    total_triggered_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Fraud Alerts Table
CREATE TABLE IF NOT EXISTS fraud_alerts (
    id BIGSERIAL PRIMARY KEY,
    alert_id VARCHAR(64) NOT NULL UNIQUE,
    transaction_id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    merchant_id VARCHAR(50) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    risk_score INT NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    alert_type VARCHAR(100) NOT NULL, -- VELOCITY_ATTACK, ACCOUNT_TAKEOVER, CARD_TESTING, GEO_ANOMALY, DEVICE_SPOOFING
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, ESCALATED, RESOLVED, DISMISSED
    assigned_to VARCHAR(100),
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 12. Investigation Cases Table
CREATE TABLE IF NOT EXISTS investigation_cases (
    id BIGSERIAL PRIMARY KEY,
    case_id VARCHAR(64) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'HIGH', -- LOW, MEDIUM, HIGH, CRITICAL
    status VARCHAR(30) NOT NULL DEFAULT 'UNDER_INVESTIGATION', -- OPEN, UNDER_INVESTIGATION, ESCALATED, CLOSED_FRAUD, CLOSED_LEGITIMATE
    lead_analyst VARCHAR(100) NOT NULL,
    target_type VARCHAR(30) NOT NULL, -- TRANSACTION, CUSTOMER, MERCHANT, DEVICE_CLUSTER
    target_id VARCHAR(64) NOT NULL,
    total_suspicious_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    summary TEXT,
    disposition VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP WITH TIME ZONE
);

-- 13. Case Notes Table
CREATE TABLE IF NOT EXISTS case_notes (
    id BIGSERIAL PRIMARY KEY,
    case_id VARCHAR(64) NOT NULL,
    author VARCHAR(100) NOT NULL,
    note_text TEXT NOT NULL,
    note_type VARCHAR(50) NOT NULL DEFAULT 'INVESTIGATION_UPDATE', -- INVESTIGATION_UPDATE, EVIDENCE_ATTACHED, STATUS_CHANGE, DISPOSITION
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    action_type VARCHAR(100) NOT NULL, -- AUTH_LOGIN, RISK_DECISION_OVERRIDE, CASE_RESOLUTION, RULE_MODIFIED, ALERT_ASSIGNED
    actor_username VARCHAR(100) NOT NULL,
    target_resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ===================================================================
-- Performance Indexes for Real-Time Querying & Aggregation
-- ===================================================================
CREATE INDEX IF NOT EXISTS idx_tx_transaction_id ON transactions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_tx_customer_id ON transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_tx_merchant_id ON transactions(merchant_id);
CREATE INDEX IF NOT EXISTS idx_tx_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tx_risk_score ON transactions(risk_score);
CREATE INDEX IF NOT EXISTS idx_tx_risk_level ON transactions(risk_level);
CREATE INDEX IF NOT EXISTS idx_tx_decision ON transactions(decision);
CREATE INDEX IF NOT EXISTS idx_tx_device_id ON transactions(device_id);
CREATE INDEX IF NOT EXISTS idx_tx_ip_address ON transactions(ip_address);

CREATE INDEX IF NOT EXISTS idx_alerts_status ON fraud_alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_risk_score ON fraud_alerts(risk_score DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_assigned ON fraud_alerts(assigned_to);

CREATE INDEX IF NOT EXISTS idx_cases_status ON investigation_cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_priority ON investigation_cases(priority);
CREATE INDEX IF NOT EXISTS idx_cases_lead ON investigation_cases(lead_analyst);

CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_username);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
