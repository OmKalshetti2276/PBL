import { useLocation } from "react-router-dom";
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import "../styles/Result.css";
import jsPDF from "jspdf";
import Chatbot from "../components/Chatbot";

const Result = () => {
  const location = useLocation();
  let data = location.state;

  if (!data) {
    data = JSON.parse(localStorage.getItem("result"));
  }

//   if (!data) {
//     return <h2 className="no-data">No data found</h2>;
//   }

if (!data) {
  data = {
    diabetes: 65,
    pcos: 40,
    thyroid: 55
  };
}
  const chartData = [
    { name: "Diabetes", value: data.diabetes },
    { name: "PCOS", value: data.pcos || 0 },
    { name: "Thyroid", value: data.thyroid }
  ];

  const COLORS = ["#ff6b6b", "#6c5ce7", "#72b3ec"];

  const getRiskLevel = (value) => {
  if (value < 30) return "Low";
  if (value < 60) return "Moderate";
  return "High";
};

const generateRecommendations = () => {
  let recs = [];

  // 🩺 Diabetes
  if (data.diabetes > 60) {
    recs.push({
      title: "Diabetes Risk High",
      text: "Reduce sugar intake, monitor glucose regularly, consult a doctor."
    });
  } else if (data.diabetes > 30) {
    recs.push({
      title: "Moderate Diabetes Risk",
      text: "Maintain diet and exercise to prevent increase."
    });
  }

  // 🌸 PCOS
  if (data.pcos && data.pcos > 60) {
    recs.push({
      title: "PCOS Risk High",
      text: "Maintain hormonal balance, avoid junk food, consult gynecologist."
    });
  }

  // 🧠 Thyroid
  if (data.thyroid > 60) {
    recs.push({
      title: "Thyroid Risk High",
      text: "Check TSH levels regularly and consult endocrinologist."
    });
  }

  // Default
  if (recs.length === 0) {
    recs.push({
      title: "Healthy Condition",
      text: "Maintain a healthy lifestyle and regular checkups."
    });
  }

  return recs;
};

    const recommendations = generateRecommendations();


const handleDownload = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("HormoAI Health Report", 20, 20);

  doc.setFontSize(12);

  doc.text(`Diabetes Risk: ${data.diabetes}% (${getRiskLevel(data.diabetes)})`, 20, 40);
  doc.text(`PCOS Risk: ${data.pcos ?? "N/A"}%`, 20, 50);
  doc.text(`Thyroid Risk: ${data.thyroid}% (${getRiskLevel(data.thyroid)})`, 20, 60);

  doc.text("Recommendations:", 20, 80);

  let y = 90;
  generateRecommendations().forEach((rec) => {
    doc.text(`- ${rec.title}: ${rec.text}`, 20, y);
    y += 10;
  });

  doc.save("HormoAI_Report.pdf");
};

  return (
    <div className="Result-container">

      {/* HERO */}
      <h1 className="title">Your Health Analysis</h1>
      <p className="subtitle">AI-powered insights based on your inputs</p>

      {/* CHARTS */}
      <div className="charts">

        {/* PIE */}
       <div className="chart-card">
  <h3>Risk Distribution</h3>

  <ResponsiveContainer width="100%" height="80%">
    <PieChart>
      <Pie
        data={chartData}
        dataKey="value"
        outerRadius={90}
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>

</div>

        {/* LINE */}
        <div className="chart-card">
          <h3>Risk Comparison</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6c5ce7" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AREA */}
        <div className="chart-card">
          <h3>Health Trend</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" fill="#72b3ec" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* CARDS */}
      <div className="risk-cards">
        <div className="risk-card diabetes">
          <h2>Diabetes</h2>
          <p>{data.diabetes}%</p>
        </div>

        {data.pcos !== undefined && (
          <div className="risk-card pcos">
            <h2>PCOS</h2>
            <p>{data.pcos}%</p>
          </div>
        )}

        <div className="risk-card thyroid">
          <h2>Thyroid</h2>
          <p>{data.thyroid}%</p>
        </div>
      </div>

      {/* ACTION PLAN */}
      <div className="recommendation-card">
        <h2>What Should You Do Now?</h2>

        <div className="recommendation-grid">
            {recommendations.map((rec, index) => (
            <div key={index} className="rec-item">
                <h4>{rec.title}</h4>
                <p>{rec.text}</p>
            </div>
            ))}
        </div>
    </div>

      {/* DOWNLOAD */}
      <button className="download-btn" onClick={handleDownload}>
        Download Report (PDF)
    </button>

    <Chatbot />

    </div>
  );
};

export default Result;