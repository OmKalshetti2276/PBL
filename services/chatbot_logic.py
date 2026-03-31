# services/chatbot_logic.py

def detect_intent(message):
    message = message.lower()
    
    # --- Greetings ---
    if any(word in message for word in ["hi", "hello", "hey"]):
        return "greeting"

    # --- General info ---
    if "pcos" in message and "cure" not in message and "treatment" not in message:
        return "pcos_info"
    if "diabetes" in message and "cure" not in message and "treatment" not in message:
        return "diabetes_info"
    if "thyroid" in message and "cure" not in message and "treatment" not in message:
        return "thyroid_info"

    # --- Lab tests ---
    if any(word in message for word in ["hba1c", "blood sugar", "fbs"]):
        return "diabetes_lab"
    if any(word in message for word in ["lh", "fsh", "amh", "ultrasound"]):
        return "pcos_lab"
    
    if any(word in message for word in ["tsh", "t3", "t4", "ft3", "ft4"]):
        return "thyroid_lab"

    # --- Cure / Treatment ---
    if "diabetes" in message and any(word in message for word in ["cure", "treatment"]):
        return "diabetes_cure"
    if "pcos" in message and any(word in message for word in ["cure", "treatment"]):
        return "pcos_cure"
    if "thyroid" in message and any(word in message for word in ["cure", "treatment"]):
        return "thyroid_cure"
    if "pcos" in message:
        return "pcos_info"
    if "diabetes" in message:
        return "diabetes_info"
    if "thyroid" in message:
        return "thyroid_info"
    if any(word in message for word in ["diet", "food", "eat"]):
        return "diet"
    if any(word in message for word in ["exercise", "workout", "fitness"]):
        return "exercise"
    if any(word in message for word in ["symptoms", "signs"]):
        return "symptoms"
    if any(word in message for word in ["my result", "am i", "risk"]):
        return "result"

    return "fallback"


def generate_response(intent, prediction):
    if intent == "greeting":
        return "Hi! I'm your health assistant 💙 Ask me about PCOS, diabetes, thyroid, lab tests, or treatments."

    # --- General info ---
    if intent == "pcos_info":
        return "PCOS is a hormonal disorder causing irregular periods, acne, and weight gain."
    if intent == "diabetes_info":
        return "Diabetes affects blood sugar levels. It can be controlled with diet and exercise."
    if intent == "thyroid_info":
        return "Thyroid issues affect metabolism, causing weight changes and fatigue."

    # --- Lab tests ---
    if intent == "diabetes_lab":
        return """Diabetes Lab Tests:
• Fasting Blood Sugar (FBS): 70–100 mg/dL
• HbA1c: 4–5.6% (Normal)
• Postprandial Blood Sugar (PPBS): <140 mg/dL
These help evaluate blood sugar control."""

    if intent == "pcos_lab":
        return """PCOS Lab Tests:
• LH: 5–20 IU/L
• FSH: 4–20 IU/L
• LH/FSH Ratio: >2 may indicate PCOS
• AMH: 1.0–4.0 ng/mL
• Ultrasound: Check for multiple ovarian cysts"""

    if intent == "thyroid_lab":
        return """Thyroid Lab Tests:
• TSH: 0.4–4.0 mIU/L
• T3: 0.8–2.0 ng/mL
• T4: 4.5–11.2 µg/dL
• FT3/FT4: Free hormone levels for accurate assessment"""

    # --- Cure / Treatment ---
    if intent == "diabetes_cure":
        return """Diabetes Management:
• Lifestyle: Regular exercise, low sugar diet, weight management
• Medication: Metformin, insulin (if prescribed)
• Monitoring: Regular blood sugar checks
• Consult your doctor for personalized treatment"""

    if intent == "pcos_cure":
        return """PCOS Management:
• Lifestyle: Regular exercise, balanced diet, weight control
• Medications: Hormonal therapy (e.g., birth control), insulin sensitizers
• Monitoring: Regular checkups & ultrasound
• Consult your doctor for personalized advice"""

    if intent == "thyroid_cure":
        return """Thyroid Management:
• Hypothyroidism: Levothyroxine replacement
• Hyperthyroidism: Anti-thyroid drugs, sometimes surgery
• Lifestyle: Balanced diet, iodine regulation
• Regular monitoring of TSH and hormone levels"""

    # --- Existing intents ---
    if intent == "diet":
        return """Healthy diet tips:
• Eat more fiber (vegetables, fruits)
• Avoid sugar and processed food
• Drink plenty of water"""

    if intent == "exercise":
        return """Exercise tips:
• 30 mins daily activity
• Walking, yoga, cycling
• Stay consistent"""

    if intent == "symptoms":
        return """Common symptoms:
• Irregular periods
• Weight gain
• Acne
• Fatigue"""

    if intent == "result":
        diabetes = prediction.get("diabetes", {}).get("risk", "Unknown")
        thyroid = prediction.get("thyroid", {}).get("risk", "Unknown")
        pcos = prediction.get("pcos", {}).get("risk", "Unknown")

        return f"""Your Health Summary:

• Diabetes Risk: {diabetes}
• Thyroid Risk: {thyroid}
• PCOS Risk: {pcos}

This is not a diagnosis. Please consult a doctor for confirmation."""

    return "I'm not sure about that 🤔 Try asking about lab tests, diet, symptoms, or treatments!"