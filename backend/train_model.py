from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np
import joblib
import os

# 1. Generate synthetic insurance fraud data
np.random.seed(42)
n_samples = 1000

data = {
    'claim_amount': np.random.uniform(1000, 500000, n_samples),
    'expected_amount': np.random.uniform(1000, 300000, n_samples),
    'policy_age_days': np.random.randint(1, 3650, n_samples),
    'claim_frequency': np.random.randint(1, 10, n_samples),
}

# Label logic: High claim frequency + amount mismatch = Fraud
df = pd.DataFrame(data)
df['is_fraud'] = (
    (df['claim_amount'] > df['expected_amount'] * 1.5) & 
    (df['claim_frequency'] > 3) | 
    (df['policy_age_days'] < 30)
).astype(int)

# 2. Train Random Forest (Zero system dependencies)
X = df.drop('is_fraud', axis=1)
y = df['is_fraud']

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    random_state=42
)
model.fit(X, y)

# 3. Save model artifacts
os.makedirs('models', exist_ok=True)
joblib.dump(model, 'models/fraud_model.joblib')
print("✅ Random Forest fraud model generated and saved to models/fraud_model.joblib")
