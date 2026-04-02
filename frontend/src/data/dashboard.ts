export const mockClaims = [
  { id: "CLM-2047", claimant: "John Doe",       type: "Auto",     amount: "₹45,000",    risk: 84,  period: "Mar 10 – Mar 15", method: "Wire Transfer", processed: "Mar 13", status: "Flagged" },
  { id: "CLM-2048", claimant: "Jane Smith",      type: "Health",   amount: "₹1,20,000",  risk: 12,  period: "Mar 11 – Mar 12", method: "Bank Transfer",  processed: "Mar 11", status: "Cleared" },
  { id: "CLM-2049", claimant: "Acme Corp",       type: "Property", amount: "₹5,00,000",  risk: 45,  period: "Mar 4 – Mar 8",   method: "Wire Transfer", processed: "Mar 7",  status: "Under Review" },
  { id: "CLM-2050", claimant: "Michael Brown",   type: "Auto",     amount: "₹12,500",    risk: 7,   period: "Feb 28 – Mar 2",  method: "Bank Transfer",  processed: "Mar 2",  status: "Cleared" },
  { id: "CLM-2051", claimant: "Sarah Lee",       type: "Life",     amount: "₹10,00,000", risk: 91,  period: "Feb 1 – Feb 15",  method: "NEFT",           processed: "Feb 12", status: "Flagged" },
  { id: "CLM-2052", claimant: "Raj Patel",       type: "Health",   amount: "₹88,000",    risk: 67,  period: "Jan 20 – Feb 1",  method: "Bank Transfer",  processed: "Feb 1",  status: "Under Review" },
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
