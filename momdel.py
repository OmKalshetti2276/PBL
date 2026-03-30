import joblib


model = joblib.load("models/thyroid_model.pkl")

print(model.feature_names_in_)

