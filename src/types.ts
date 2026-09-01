export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type Decision = 'APPROVE' | 'MONITOR' | 'REVIEW' | 'BLOCK';
export type AlertStatus = 'OPEN' | 'INVESTIGATING' | 'ESCALATED' | 'RESOLVED' | 'DISMISSED';
export type CaseStatus = 'NEW' | 'OPEN' | 'IN_REVIEW' | 'PENDING_INFO' | 'RESOLVED' | 'CLOSED';

export interface RiskFactor {
  factorCode: string;
  factorName: string;
  weightScore: number;
  category: 'VELOCITY' | 'AMOUNT_ANOMALY' | 'BEHAVIORAL' | 'BEHAVIOR' | 'NETWORK_IP' | 'DEVICE' | 'RULE_ENGINE' | 'ML_ENSEMBLE';
  details: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface Transaction {
  transactionId: string;
  customerId: string;
  customerName: string;
  customerEmail?: string;
  merchantId: string;
  merchantName: string;
  merchantCategory: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  cardBin: string;
  cardLast4: string;
  deviceId: string;
  deviceName?: string;
  ipAddress: string;
  ipLocation?: string;
  locationCity: string;
  locationCountry: string;
  status: 'PENDING' | 'SETTLED' | 'BLOCKED' | 'FLAGGED';
  riskScore: number;
  riskLevel: RiskLevel;
  decision: Decision;
  ruleScore: number;
  behavioralScore: number;
  mlScore: number;
  explanation: string;
  recommendedAction: string;
  riskFactors: RiskFactor[];
  createdAt: string;
  evaluationTimeMs: number;
}

export interface RiskRule {
  id: string;
  ruleCode: string;
  name: string;
  category: 'VELOCITY' | 'AMOUNT_ANOMALY' | 'NETWORK_SECURITY' | 'DEVICE_INTEGRITY' | 'BEHAVIOR';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  impactScore: number;
  description: string;
  isActive: boolean;
  totalTriggeredCount: number;
  decisionAction: Decision;
  conditionExpression: string;
}

export interface FraudAlert {
  alertId: string;
  transactionId: string;
  customerId: string;
  customerName: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  currency: string;
  riskScore: number;
  riskLevel: RiskLevel;
  alertType: string;
  status: AlertStatus;
  assignedTo?: string;
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
  riskFactorsSummary: string[];
}

export interface CaseNote {
  id: string;
  caseId: string;
  author: string;
  noteText: string;
  noteType: 'GENERAL' | 'DECISION' | 'EVIDENCE' | 'COMMUNICATION';
  createdAt: string;
}

export interface InvestigationCase {
  caseId: string;
  title: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: CaseStatus;
  leadAnalyst: string;
  targetType: 'TRANSACTION' | 'CUSTOMER' | 'MERCHANT' | 'DEVICE';
  targetId: string;
  totalSuspiciousAmount: number;
  currency: string;
  summary: string;
  disposition?: 'CONFIRMED_FRAUD' | 'FALSE_POSITIVE' | 'SUSPICIOUS_CLEARED' | 'ACCOUNT_TAKEOVER';
  notes: CaseNote[];
  linkedTransactions: string[];
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface DashboardMetrics {
  totalVolume24h: number;
  avgRiskScore: number;
  activeAlertsCount: number;
  urgentAlertsCount: number;
  approvalRate: number;
  approvalsCount: number;
  manualReviewsCount: number;
  hardBlocksCount: number;
  liveRiskFeed: Transaction[];
  decisionDistribution: {
    approvals: number;
    manualReviews: number;
    hardBlocks: number;
    monitor: number;
  };
}

export interface SimulationRequest {
  customerId: string;
  customerName?: string;
  merchantId: string;
  merchantName?: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  deviceId: string;
  ipAddress: string;
  locationCity: string;
  locationCountry: string;
  isNewDevice: boolean;
  isVpnOrProxy: boolean;
  recentTxCount10m: number;
  failedAttemptsLast24h: number;
  historicalAverageAmount: number;
  accountAgeDays: number;
}
