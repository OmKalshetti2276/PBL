from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

from services.prediction_service import (
    predict_diabetes,
    predict_pcos,
    predict_thyroid
)
from services.chatbot_logic import detect_intent, generate_response


app = Flask(__name__)
CORS(app)


def get_risk_level(prob):
    if prob < 0.3:
        return "Low"
    elif prob < 0.7:
        return "Moderate"
    else:
        return "High"


@app.route("/")
def home():
    return "API is running successfully 🚀"


@app.route("/predict_all", methods=["POST"])
def predict_all():
    data = request.json

    if not data:
        return jsonify({"error": "No input data"}), 400

    try:
        gender = data.get("gender", "male").lower()

        # ================= DIABETES =================
        diabetes_prob = predict_diabetes(data)

        

        result = {
            "diabetes": {
                "probability": round(diabetes_prob * 100, 2),
                "risk": get_risk_level(diabetes_prob),
               
            }
        }

        # ================= THYROID =================
        thyroid_prob = predict_thyroid(data)

        # Prevent extreme collapse
        thyroid_prob = max(thyroid_prob, 0.05)

        result["thyroid"] = {
            "probability": round(thyroid_prob * 100, 2),
            "risk": get_risk_level(thyroid_prob)
        }

        # ================= PCOS =================
        if gender.lower() == "female":
            pcos_prob = predict_pcos(data)

            result["pcos"] = {
                "probability": round(pcos_prob * 100, 2),
                "risk": get_risk_level(pcos_prob)
            }
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "")
    prediction = data.get("prediction") or {}

    # ✅ use the logic from chatbot_logic.py
    intent = detect_intent(message)
    reply = generate_response(intent, prediction)

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)

