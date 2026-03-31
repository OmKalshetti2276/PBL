import React, { useState } from "react";
import "../styles/Input.css";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();

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

  const [error, setError] = useState("");

  // 🔄 Handle Change
  const handleChange = (e) => {
    const { id, value } = e.target;

    let updatedData = { ...formData, [id]: value };

    // 🔥 Auto-fix: male → pregnancies = 0
    if (id === "gender" && value === "male") {
      updatedData.Pregnancies = 0;
    }

    setFormData(updatedData);
  };

  // 🚀 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ❗ Required check
    if (!formData.gender) {
      setError("Please select gender");
      return;
    }

    // ❗ Male constraint
    if (formData.gender === "male" && formData.Pregnancies > 0) {
      setError("Pregnancies must be 0 for male users");
      return;
    }

    // ❗ Age sanity
    if (formData.Age < 10 || formData.Age > 100) {
      setError("Enter valid age (10 – 100)");
      return;
    }

    // ❗ BMI sanity
    if (formData.BMI < 10 || formData.BMI > 60) {
      setError("BMI seems unrealistic");
      return;
    }

    // 🔥 Mock result (for now)
    const fakeResult = {
      diabetes: Math.floor(Math.random() * 100),
      pcos: formData.gender === "female" ? Math.floor(Math.random() * 100) : null,
      thyroid: ["Low", "Moderate", "High"][Math.floor(Math.random() * 3)]
    };

    // 🚀 Navigate to results
    navigate("/result", { state: fakeResult });
  };

  return (
    <div className="input-container">
      <div className="form-card">
        <h1 className="title">Hormonal Health Risk Predictor</h1>

        {/* ❗ Error */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          {/* Gender */}
          <div className="section">
            <h3>Basic Info</h3>
            <div className="field">
              <label>Gender</label>
              <select id="gender" onChange={handleChange} required>
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
                <select
                  id="Pregnancies"
                  onChange={handleChange}
                  disabled={formData.gender === "male"}
                >
                  <option value="">Select</option>
                  {[...Array(16).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Glucose</label>
                <input type="number" step="any" id="Glucose" placeholder="70 – 140" onChange={handleChange} required />
              </div>

              <div className="field">
                <label>Blood Pressure</label>
                <input type="number" step="any" id="BloodPressure" placeholder="60 – 140" onChange={handleChange} required />
              </div>

              <div className="field">
                <label>Skin Thickness</label>
                <input type="number" step="any" id="SkinThickness" placeholder="10 – 50" onChange={handleChange} required />
              </div>

              <div className="field">
                <label>Insulin</label>
                <input type="number" step="any" id="Insulin" placeholder="15 – 276" onChange={handleChange} required />
              </div>

              <div className="field">
                <label>BMI</label>
                <input type="number" id="BMI" step="any" placeholder="18.5 – 24.9" onChange={handleChange} required />
              </div>

              <div className="field">
                <label>DPF</label>
                <input type="number" step="any" id="DPF" placeholder="0.1 – 2.5" onChange={handleChange} required />
              </div>

              <div className="field">
                <label>Age</label>
                <input type="number" id="Age" placeholder="10 – 100" onChange={handleChange} required />
              </div>

            </div>
          </div>

          {/* PCOS */}
          {formData.gender === "female" && (
            <div className="section">
              <h3>PCOS Inputs</h3>
              <div className="grid">

                <input type="number" id="folR" placeholder="Follicle R (0–30)" onChange={handleChange} required />
                <input type="number" id="folL" placeholder="Follicle L (0–30)" onChange={handleChange} required />

                <select id="skin" onChange={handleChange} required>
                  <option value="">Skin Darkening</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>

                <select id="hair" onChange={handleChange} required>
                  <option value="">Hair Growth</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>

                <select id="weight" onChange={handleChange} required>
                  <option value="">Weight Gain</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>

                <input type="number" step="any" id="amh" placeholder="AMH (1–10)" onChange={handleChange} required />

                <select id="cycle" onChange={handleChange} required>
                  <option value="">Cycle</option>
                  <option value="0">Regular</option>
                  <option value="1">Irregular</option>
                </select>

                <input type="number" step="any" id="ratio" placeholder="FSH/LH (1–3)" onChange={handleChange} required />
                <input type="number" step="any" id="lh" placeholder="LH (1–20)" onChange={handleChange} required />

                <select id="fastfood" onChange={handleChange} required>
                  <option value="">Fast Food</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>

              </div>
            </div>
          )}

          {/* Thyroid */}
          <div className="section">
            <h3>Thyroid Inputs</h3>
            <div className="grid">

              <input type="number" step="any" id="TSH" placeholder="TSH (0.4–4.0)" onChange={handleChange} required />
              <input type="number" step="any" id="TT4" placeholder="TT4 (5–12)" onChange={handleChange} required />
              <input type="number" step="any" id="T4U" placeholder="T4U (0.8–1.8)" onChange={handleChange} required />
              <input type="number" step="any" id="FTI" placeholder="FTI (1–4)" onChange={handleChange} required />

            </div>
          </div>

          <button type="submit" className="submit-btn">
            Predict
          </button>

        </form>
      </div>
    </div>
  );
};

export default Input;