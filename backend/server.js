const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Detectra Backend is running' });
});

// Fraud detection sample endpoint
app.post('/api/detect', (req, res) => {
  const { data } = req.body;
  // Placeholder for fraud detection logic
  const isFraud = Math.random() < 0.2; // 20% chance for simulation
  res.json({
    fraud_detected: isFraud,
    confidence: isFraud ? 0.95 : 0.05,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Detectra Backend running on http://localhost:${PORT}`);
});
