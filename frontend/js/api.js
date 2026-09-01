/**
 * RiskShield AI - Standardized API Client Layer
 * Centralizes all Spring Boot REST API communication using Vanilla Fetch API.
 */

const API = {
  /**
   * Helper to retrieve stored JWT token
   */
  getToken() {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.JWT_TOKEN) || null;
  },

  /**
   * Universal fetch wrapper with authorization headers & fallback handling
   */
  async request(endpoint, options = {}) {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorBody.message || `HTTP ${response.status} Error`);
      }

      return await response.json();
    } catch (err) {
      if (CONFIG.DEBUG_MODE) {
        console.warn(`[RiskShield API] Endpoint '${endpoint}' request failed: ${err.message}. Falling back to mock data.`);
      }
      throw err;
    }
  },

  // Auth Endpoints
  async login(credentials) {
    try {
      const data = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      if (data.token) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.JWT_TOKEN, data.token);
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      if (CONFIG.USE_MOCK_FALLBACK) {
        return {
          token: 'mock_jwt_token_analyst_2026',
          user: { id: 'USR-001', name: 'John Doe', email: credentials.email, role: 'RISK_ANALYST' }
        };
      }
      throw err;
    }
  },

  // Risk Evaluation REST Endpoint
  async analyzeRisk(payload) {
    try {
      return await this.request('/risk/analyze', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (err) {
      if (CONFIG.USE_MOCK_FALLBACK) {
        // Deterministic mock scoring based on payload
        let score = 10;
        const factors = [];
        if (payload.amount > 50000) {
          score += 35;
          factors.push({ name: 'Amount Anomaly (> ₹50k)', points: 35 });
        }
        if (payload.isTorOrVpn) {
          score += 25;
          factors.push({ name: 'Tor Exit Node / Datacenter Proxy', points: 25 });
        }
        if (payload.velocityCount > 3) {
          score += 25;
          factors.push({ name: `Velocity: ${payload.velocityCount} attempts in 5m`, points: 25 });
        }
        if (payload.isNewDevice) {
          score += 15;
          factors.push({ name: 'Novel Hardware Canvas Fingerprint', points: 15 });
        }

        const finalScore = Math.min(99, score);
        const decision = finalScore >= 80 ? 'BLOCK' : finalScore >= 60 ? 'REVIEW' : finalScore >= 30 ? 'MONITOR' : 'APPROVE';
        const level = finalScore >= 80 ? 'CRITICAL' : finalScore >= 60 ? 'HIGH' : finalScore >= 30 ? 'MEDIUM' : 'LOW';

        return {
          transactionId: payload.id || 'TXN-' + Math.floor(10000 + Math.random() * 90000),
          riskScore: finalScore,
          riskLevel: level,
          decision: decision,
          factors: factors,
          evaluationLatencyMs: 12,
          timestamp: new Date().toISOString()
        };
      }
      throw err;
    }
  },

  // Metrics and Dashboard Summary
  async getDashboardSummary() {
    try {
      return await this.request('/dashboard/summary');
    } catch (err) {
      return MOCK_DATA.metrics;
    }
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.API = API;
}
