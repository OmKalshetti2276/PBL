import joblib
import numpy as np

# ================= LOAD MODELS =================
diabetes_model = joblib.load("models/diabetes_model.pkl")
pcos_model = joblib.load("models/pcos_model.pkl")
pcos_scaler = joblib.load("models/scaler.pkl")
thyroid_model = joblib.load("models/thyroid_model.pkl")


# ================= THYROID FEATURES (EXACT 25) =================
thyroid_features = [
    'age', 'sex', 'on thyroxine', 'query on thyroxine',
    'on antithyroid medication', 'sick', 'pregnant', 'thyroid surgery',
    'I131 treatment', 'query hypothyroid', 'query hyperthyroid', 'lithium',
    'goitre', 'tumor', 'hypopituitary', 'psych',
    'TSH measured', 'TSH',
    'T3 measured',
    'TT4 measured', 'TT4',
    'T4U measured', 'T4U',
    'FTI measured', 'FTI'
]


# ================= THYROID PREPARATION =================
def prepare_thyroid_features(data):
    sample = {col: 0 for col in thyroid_features}

    # -------- BASIC INFO --------
    sample["age"] = float(data.get("age", 30))
    sample["sex"] = float(data.get("sex", 1))

    # -------- LAB VALUES --------
    sample["TSH"] = float(data.get("TSH", 2.5))
    sample["TT4"] = float(data.get("TT4", 120))
    sample["T4U"] = float(data.get("T4U", 1.1))
    sample["FTI"] = float(data.get("FTI", 110))

    # -------- MEASURED FLAGS (CRITICAL) --------
    sample["TSH measured"] = 1 if "TSH" in data else 0
    sample["TT4 measured"] = 1 if "TT4" in data else 0
    sample["T4U measured"] = 1 if "T4U" in data else 0
    sample["FTI measured"] = 1 if "FTI" in data else 0
    sample["T3 measured"] = 0  # Not provided

    # -------- ASSUME NORMAL (MISSING FEATURES) --------
    default_zero_features = [
        "on thyroxine", "query on thyroxine", "on antithyroid medication",
        "sick", "pregnant", "thyroid surgery", "I131 treatment",
        "query hypothyroid", "query hyperthyroid", "lithium",
        "goitre", "tumor", "hypopituitary", "psych"
    ]

    for f in default_zero_features:
        sample[f] = 0

    return np.array(list(sample.values())).reshape(1, -1)


# ================= PREDICT FUNCTIONS =================

def predict_diabetes(data):
    features = np.array([
        data.get("Pregnancies", 0),
        data.get("Glucose", 0),
        data.get("BloodPressure", 0),
        data.get("SkinThickness", 0),
        data.get("Insulin", 0),
        data.get("BMI", 0),
        data.get("DiabetesPedigreeFunction", 0),
        data.get("Age", 0)
    ]).reshape(1, -1)

    return diabetes_model.predict_proba(features)[0][1]


def predict_pcos(data):
    features = np.array([
        data.get("Follicle No. (R)", 0),
        data.get("Follicle No. (L)", 0),
        data.get("Skin darkening (Y/N)", 0),
        data.get("hair growth(Y/N)", 0),
        data.get("Weight gain(Y/N)", 0),
        data.get("AMH(ng/mL)", 0),
        data.get("Cycle(R/I)", 0),
        data.get("FSH/LH", 0),
        data.get("LH(mIU/mL)", 0),
        data.get("Fast food (Y/N)", 0)
    ]).reshape(1, -1)

    features = pcos_scaler.transform(features)

    return pcos_model.predict_proba(features)[0][1]


def predict_thyroid(data):
    features = prepare_thyroid_features(data)
    return thyroid_model.predict_proba(features)[0][1]