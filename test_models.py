from services.prediction_service import (
    predict_diabetes,
    predict_thyroid,
    predict_pcos
)

# Dummy input (replace with real feature format)
sample_data = [120, 30, 45, 80, 70]

print("Diabetes:", predict_diabetes(sample_data))
print("Thyroid:", predict_thyroid(sample_data))
print("PCOS:", predict_pcos(sample_data))