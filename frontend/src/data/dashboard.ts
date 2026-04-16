/* ── Sample Claims with Analysis Data ───────────────────── */
export const mockClaims = [
  { 
    id: "CLM-2047", 
    claimant: "John Doe", 
    type: "Auto", 
    amount: "₹45,000", 
    risk: 84, 
    period: "Mar 10 – Mar 15", 
    method: "Wire Transfer", 
    processed: "Mar 13", 
    status: "Flagged",
    // Data for /analyze endpoint
    claim_amount: 45000,
    expected_amount: 15000,
    policy_age_days: 12,
    claim_frequency: 3
  },
  { 
    id: "CLM-2048", 
    claimant: "Jane Smith", 
    type: "Health", 
    amount: "₹1,20,000", 
    risk: 12, 
    period: "Mar 11 – Mar 12", 
    method: "Bank Transfer", 
    processed: "Mar 11", 
    status: "Cleared",
    claim_amount: 120000,
    expected_amount: 110000,
    policy_age_days: 1200,
    claim_frequency: 1
  },
  { 
    id: "CLM-2049", claimant: "Acme Corp", type: "Property", amount: "₹5,00,000", risk: 45, period: "Mar 4 – Mar 8", method: "Wire Transfer", processed: "Mar 7", status: "Under Review",
    claim_amount: 500000,
    expected_amount: 400000,
    policy_age_days: 450,
    claim_frequency: 2
  },
  { 
    id: "CLM-2051", claimant: "Sarah Lee", type: "Life", amount: "₹10,00,000", risk: 91, period: "Feb 1 – Feb 15", method: "NEFT", processed: "Feb 12", status: "Flagged",
    claim_amount: 1000000,
    expected_amount: 200000,
    policy_age_days: 5,
    claim_frequency: 1
  },
  { 
    id: "CLM-2052", claimant: "Raj Patel", type: "Health", amount: "₹88,000", risk: 67, period: "Jan 20 – Feb 1", method: "Bank Transfer", processed: "Feb 1", status: "Under Review",
    claim_amount: 88000,
    expected_amount: 40000,
    policy_age_days: 25,
    claim_frequency: 2
  },
];

export const monthlyData = [
  { name: "Jan", v: 120 }, { name: "Feb", v: 145 }, { name: "Mar", v: 132 },
  { name: "Apr", v: 168 }, { name: "May", v: 155 }, { name: "Jun", v: 189 },
  { name: "Jul", v: 234 }, { name: "Aug", v: 187 }, { name: "Sep", v: 165 },
  { name: "Oct", v: 143 }, { name: "Nov", v: 156 }, { name: "Dec", v: 178 },
];

export const fraudSignals = [
  { label: "Claim Amount Anomaly",    pct: 92, color: "#ef4444", cat: "Critical" },
  { label: "High Incident Frequency", pct: 78, color: "#ef4444", cat: "Critical" },
  { label: "Narrative Inconsistency", pct: 45, color: "#f59e0b", cat: "Medium" },
  { label: "Identity Match Failure",  pct: 12, color: "#22c55e", cat: "Low" },
];
