import React, { useState } from "react";
import "../styles/Input.css";

const Input = () => {
  const [formData, setFormData] = useState({
    gender: "",
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DPF: "",
    Age: "",

    folR: "",
    folL: "",
    skin: "",
    hair: "",
    weight: "",
    amh: "",
    cycle: "",
    ratio: "",
    lh: "",
    fastfood: "",

    TSH: "",
    TT4: "",
    T4U: "",
    FTI: ""
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      gender: formData.gender,

     // Diabetes
Pregnancies: parseFloat(formData.Pregnancies) || 0,
Glucose: parseFloat(formData.Glucose) || 0,
BloodPressure: parseFloat(formData.BloodPressure) || 0,
SkinThickness: parseFloat(formData.SkinThickness) || 0,
Insulin: parseFloat(formData.Insulin) || 0,
BMI: parseFloat(formData.BMI) || 0,
DiabetesPedigreeFunction: parseFloat(formData.DPF) || 0,
Age: parseFloat(formData.Age) || 0,

// PCOS
"Follicle No. (R)": parseFloat(formData.folR) || 0,
"Follicle No. (L)": parseFloat(formData.folL) || 0,
"Skin darkening (Y/N)": parseFloat(formData.skin) || 0,
"hair growth(Y/N)": parseFloat(formData.hair) || 0,
"Weight gain(Y/N)": parseFloat(formData.weight) || 0,
"AMH(ng/mL)": parseFloat(formData.amh) || 0,
"Cycle(R/I)": parseFloat(formData.cycle) || 0,
"FSH/LH": parseFloat(formData.ratio) || 0,
"LH(mIU/mL)": parseFloat(formData.lh) || 0,
"Fast food (Y/N)": parseFloat(formData.fastfood) || 0,

// Thyroid
age: parseFloat(formData.Age) || 0,
sex: formData.gender === "male" ? 1 : 0,
TSH: parseFloat(formData.TSH) || 0,
TT4: parseFloat(formData.TT4) || 0,
T4U: parseFloat(formData.T4U) || 0,
FTI: parseFloat(formData.FTI) || 0
    };

    const response = await fetch("http://127.0.0.1:5000/predict_all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    console.log(result);

    // 🔥 FORMAT RESULT FOR UI
    setResult({
  diabetes_prob: result.diabetes?.probability || 0,
  diabetes_risk: result.diabetes?.risk || "Unknown",

  pcos_prob: result.pcos?.probability ?? null,
  pcos_risk: result.pcos?.risk ?? "Unknown",

  thyroid_prob: result.thyroid?.probability || 0,
  thyroid_risk: result.thyroid?.risk || "Unknown"
});

  } catch (err) {
    console.error(err);
    alert("Server error!");
  }

};

  return (
    <div className="input-container">
      <div className="form-card">
        <h1 className="title">Hormonal Health Risk Predictor</h1>

        <form onSubmit={handleSubmit}>

          {/* Gender */}
          <div className="section">
            <h3>Basic Info</h3>
            <div className="field">
              <label>Gender</label>
              <select id="gender" onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Diabetes */}
          <div className="section">
            <h3>Diabetes Inputs</h3>
            <div className="grid">

              <div className="field">
                <label>Pregnancies</label>
                <select id="Pregnancies" onChange={handleChange}>
                <option value="">Select</option>
                {[...Array(16).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                ))}
                </select>
              </div>

              <div className="field">
                <label>Glucose</label>
                <input type="number" id="Glucose" placeholder="70 – 140 mg/dL" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>Blood Pressure</label>
                <input type="number" id="BloodPressure" placeholder="60 – 140 mmHg" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>Skin Thickness</label>
                <input type="number" id="SkinThickness" placeholder="10 – 50" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>Insulin</label>
                <input type="number" id="Insulin" placeholder="15 – 276" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>BMI</label>
                <input type="number" id="BMI" placeholder="18.5 – 24.9" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>Diabetes Pedigree</label>
                <input type="number" id="DPF" placeholder="0.1 – 2.5" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>Age</label>
                <input type="number" id="Age" placeholder="10 – 100" onChange={handleChange}/>
              </div>

            </div>
          </div>

          {/* PCOS */}
          {formData.gender === "female" && (
            <div className="section">
              <h3>PCOS Inputs</h3>
              <div className="grid">

                <div className="field">
                  <label>Follicle (R)</label>
                  <input type="number" id="folR" placeholder="0 – 30" onChange={handleChange}/>
                </div>

                <div className="field">
                  <label>Follicle (L)</label>
                  <input type="number" id="folL" placeholder="0 – 30" onChange={handleChange}/>
                </div>

                <div className="field">
                  <label>Skin Darkening</label>
                  <select id="skin" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="field">
                  <label>Hair Growth</label>
                  <select id="hair" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="field">
                  <label>Weight Gain</label>
                  <select id="weight" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="field">
                  <label>AMH</label>
                  <input type="number" id="amh" placeholder="1 – 10" onChange={handleChange}/>
                </div>

                <div className="field">
                  <label>Cycle</label>
                  <select id="cycle" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="0">Regular</option>
                    <option value="1">Irregular</option>
                  </select>
                </div>

                <div className="field">
                  <label>FSH/LH Ratio</label>
                  <input type="number" id="ratio" placeholder="1 – 3" onChange={handleChange}/>
                </div>

                <div className="field">
                  <label>LH</label>
                  <input type="number" id="lh" placeholder="1 – 20" onChange={handleChange}/>
                </div>

                <div className="field">
                  <label>Fast Food</label>
                  <select id="fastfood" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* Thyroid */}
          <div className="section">
            <h3>Thyroid Inputs</h3>
            <div className="grid">

              <div className="field">
                <label>TSH</label>
                <input type="number" id="TSH" placeholder="0.4 – 4.0" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>TT4</label>
                <input type="number" id="TT4" placeholder="5 – 12" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>T4U</label>
                <input type="number" id="T4U" placeholder="0.8 – 1.8" onChange={handleChange}/>
              </div>

              <div className="field">
                <label>FTI</label>
                <input type="number" id="FTI" placeholder="1 – 4" onChange={handleChange}/>
              </div>

            </div>
          </div>

          <button type="submit" className="submit-btn">
            Predict
          </button>

        </form>

        {result && (
  <div className="result-container">

    {/* Diabetes */}
    <div className="result-card">
  <h3>🩺 Diabetes</h3>

  <div className="progress-bar">
    <div
      className="progress"
      style={{ width: `${result.diabetes_prob}%` }}
    ></div>
  </div>

  <p>{result.diabetes_prob}% Risk</p>
  <p className="badge">{result.diabetes_risk}</p>
</div>
            
    {/* PCOS */}
    {result.pcos_prob !== null && (
      <div className="result-card">
        <h3>🌸 PCOS</h3>
        <p>{result.pcos_prob}% Risk</p>
<p className="badge">{result.pcos_risk}</p>
      </div>
    )}

    {/* Thyroid */}
    <div className="result-card">
      <h3>🧠 Thyroid</h3>
      <p>{result.thyroid_prob}% Risk</p>
<p className="badge">{result.thyroid_risk}</p>
    </div>

  </div>
)}
      </div>
    </div>
  );
};

export default Input;