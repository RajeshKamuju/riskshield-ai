-- ===================================================================
-- RISKSHIELD AI - PostgreSQL Realistic Seed Dataset
-- Production-Calibrated Data for Fintech Risk Management
-- ===================================================================

-- 1. Seed Roles
INSERT INTO roles (name, description) VALUES
('ROLE_ANALYST', 'L1/L2 Fraud and Risk Operations Analyst'),
('ROLE_MANAGER', 'Risk Operations Lead and Rule Engine Admin'),
('ROLE_ADMIN', 'Platform Administrator & Security Master'),
('ROLE_AUDITOR', 'Read-Only Regulatory & Compliance Auditor')
ON CONFLICT (name) DO NOTHING;

-- 2. Seed Users (BCrypt hashes for 'Password@123')
INSERT INTO users (username, email, password_hash, full_name, role, is_active) VALUES
('analyst_vikram', 'vikram.s@riskshield.internal', '$2a$10$wT0lGzC.M.qFqg6J29nKGe.Gk8Yt7qK6R2wH1E5X9e9Q4r6V5uL2q', 'Vikram Sen', 'ROLE_ANALYST', true),
('manager_ananya', 'ananya.r@riskshield.internal', '$2a$10$wT0lGzC.M.qFqg6J29nKGe.Gk8Yt7qK6R2wH1E5X9e9Q4r6V5uL2q', 'Ananya Roy', 'ROLE_MANAGER', true),
('admin_dev', 'devops@riskshield.internal', '$2a$10$wT0lGzC.M.qFqg6J29nKGe.Gk8Yt7qK6R2wH1E5X9e9Q4r6V5uL2q', 'Devendra Patil', 'ROLE_ADMIN', true)
ON CONFLICT (username) DO NOTHING;

-- 3. Seed Merchants
INSERT INTO merchants (merchant_id, business_name, category, risk_level, status, trust_score, chargeback_rate, daily_volume_limit, registered_country, contact_email) VALUES
('MERCH-1001', 'Swiggy Food & Groceries', 'Food & Beverage', 'LOW', 'ACTIVE', 98, 0.0005, 50000000.00, 'IND', 'payments@swiggy.in'),
('MERCH-1002', 'Acme Electronics Superstore', 'Electronics & Gadgets', 'MEDIUM', 'ACTIVE', 85, 0.0042, 10000000.00, 'IND', 'risk@acmeelectronics.in'),
('MERCH-1003', 'MakeMyTrip Bookings', 'Travel & Ticketing', 'LOW', 'ACTIVE', 94, 0.0012, 35000000.00, 'IND', 'fraud-ops@makemytrip.com'),
('MERCH-1004', 'Global Crypto Exchange Desk', 'Cryptocurrency & Virtual Assets', 'HIGH', 'RESTRICTED', 52, 0.0210, 2000000.00, 'IND', 'compliance@cryptodesk.io'),
('MERCH-1005', 'Zara India Flagship Online', 'Fashion & Apparel', 'LOW', 'ACTIVE', 96, 0.0008, 15000000.00, 'IND', 'payments-ops@zara.in')
ON CONFLICT (merchant_id) DO NOTHING;

-- 4. Seed Customers
INSERT INTO customers (customer_id, first_name, last_name, email, phone_number, risk_level, status, trust_score, account_age_days, kyc_verified, historical_average_amount, lifetime_transaction_count, last_known_location) VALUES
('CUST-84920', 'Arjun', 'Rao', 'arjun.rao@example.com', '+91 98765 43210', 'CRITICAL', 'RESTRICTED', 38, 42, true, 8920.00, 18, 'Mumbai, India'),
('CUST-84921', 'Priya', 'Sharma', 'priya.sharma@example.com', '+91 98234 56789', 'LOW', 'ACTIVE', 95, 410, true, 1450.00, 142, 'Bengaluru, India'),
('CUST-84922', 'Vikram', 'Mehta', 'vikram.mehta@example.com', '+91 97112 33445', 'HIGH', 'SUSPENDED', 45, 12, false, 42000.00, 3, 'Frankfurt, Germany'),
('CUST-84923', 'Sneha', 'Patel', 'sneha.patel@example.com', '+91 99001 88776', 'LOW', 'ACTIVE', 92, 280, true, 2800.00, 68, 'Ahmedabad, India'),
('CUST-84924', 'Rohit', 'Verma', 'rohit.verma@example.com', '+91 91234 11223', 'MEDIUM', 'ACTIVE', 72, 95, true, 12500.00, 24, 'Delhi, India')
ON CONFLICT (customer_id) DO NOTHING;

-- 5. Seed Risk Rules
INSERT INTO risk_rules (rule_code, name, description, category, severity, impact_score, is_active, condition_expression, action_type, total_triggered_count) VALUES
('RULE-VEL-01', 'High Velocity Card/UPI Surge', 'More than 5 authorizations within 5 minutes', 'VELOCITY', 'CRITICAL', 30, true, 'count(txns, 5min) > 5', 'FLAG_BLOCK', 412),
('RULE-AMT-02', 'Extreme Baseline Outlier', 'Transaction exceeds 5x user 30-day historical mean', 'AMOUNT', 'HIGH', 25, true, 'amount > (baseline_mean * 5)', 'FLAG_REVIEW', 890),
('RULE-NET-03', 'Tor / Anonymous Datacenter Proxy', 'Connection initiated via Tor exit node or VPN', 'NETWORK', 'CRITICAL', 25, true, 'ip.is_tor == true OR ip.is_proxy == true', 'FLAG_BLOCK', 1240),
('RULE-GEO-04', 'Impossible Travel Transit Speed', 'Location jump exceeding 800 km/h between sessions', 'LOCATION', 'HIGH', 25, true, 'geo.transit_speed_kmh > 800', 'FLAG_REVIEW', 315),
('RULE-DEV-05', 'Rooted Device or Emulator', 'Client telemetry detected emulator environment', 'DEVICE', 'HIGH', 20, true, 'device.is_emulator == true', 'FLAG_REVIEW', 188)
ON CONFLICT (rule_code) DO NOTHING;

-- 6. Seed Sample Transactions
INSERT INTO transactions (transaction_id, customer_id, merchant_id, amount, currency, payment_method, ip_address, location_city, location_country, status, risk_score, risk_level, decision) VALUES
('TXN-92841', 'CUST-84920', 'MERCH-1002', 75000.00, 'INR', 'UPI', '185.220.101.99', 'Frankfurt', 'DEU', 'BLOCKED', 92, 'CRITICAL', 'BLOCK'),
('TXN-92840', 'CUST-84921', 'MERCH-1001', 1450.00, 'INR', 'CREDIT_CARD', '103.21.124.5', 'Bengaluru', 'IND', 'COMPLETED', 14, 'LOW', 'APPROVE'),
('TXN-92839', 'CUST-84922', 'MERCH-1003', 42000.00, 'INR', 'NET_BANKING', '82.165.197.1', 'Frankfurt', 'DEU', 'PENDING_REVIEW', 74, 'HIGH', 'REVIEW'),
('TXN-92838', 'CUST-84923', 'MERCH-1005', 3499.00, 'INR', 'UPI', '122.161.45.10', 'Ahmedabad', 'IND', 'COMPLETED', 18, 'LOW', 'APPROVE'),
('TXN-92837', 'CUST-84924', 'MERCH-1002', 28500.00, 'INR', 'CREDIT_CARD', '49.36.12.88', 'Delhi', 'IND', 'COMPLETED', 45, 'MEDIUM', 'MONITOR')
ON CONFLICT (transaction_id) DO NOTHING;

-- 7. Seed Fraud Alerts
INSERT INTO fraud_alerts (alert_id, transaction_id, customer_id, merchant_id, amount, risk_score, risk_level, alert_type, status, assigned_to) VALUES
('ALT-8491', 'TXN-92841', 'CUST-84920', 'MERCH-1002', 75000.00, 92, 'CRITICAL', 'VELOCITY_ATTACK', 'OPEN', 'vikram.s@riskshield.internal'),
('ALT-8490', 'TXN-92839', 'CUST-84922', 'MERCH-1003', 42000.00, 74, 'HIGH', 'GEO_ANOMALY', 'IN_PROGRESS', 'ananya.r@riskshield.internal')
ON CONFLICT (alert_id) DO NOTHING;

-- 8. Seed Investigation Cases
INSERT INTO investigation_cases (case_id, title, priority, status, lead_analyst, target_type, target_id, total_suspicious_amount, summary) VALUES
('CASE-1049', 'Suspected Account Takeover on CUST-84920', 'CRITICAL', 'UNDER_INVESTIGATION', 'vikram.s@riskshield.internal', 'CUSTOMER', 'CUST-84920', 75000.00, 'Sudden ₹75,000 electronics cart attempt from German Tor exit node following password reset.'),
('CASE-1048', 'Card Testing Bot Cluster on Merchant MERCH-1004', 'HIGH', 'CLOSED_FRAUD', 'ananya.r@riskshield.internal', 'MERCHANT', 'MERCH-1004', 125000.00, '14 rapid micro-transactions originating from rotating residential proxy cluster.')
ON CONFLICT (case_id) DO NOTHING;

-- 9. Seed Audit Logs
INSERT INTO audit_logs (action_type, actor_username, target_resource, resource_id, details, ip_address) VALUES
('TRANSACTION_BLOCKED', 'ENGINE_SYSTEM', 'TRANSACTION', 'TXN-92841', 'Deterministic risk score 92 triggered automated hard block.', '10.0.0.1'),
('CASE_OPENED', 'analyst_vikram', 'CASE', 'CASE-1049', 'Opened urgent investigation case for suspected ATO.', '192.168.1.104'),
('RULE_MODIFIED', 'manager_ananya', 'RULE', 'RULE-VEL-01', 'Updated velocity threshold from 6 to 5 txns per 5 min window.', '192.168.1.108')
ON CONFLICT DO NOTHING;
