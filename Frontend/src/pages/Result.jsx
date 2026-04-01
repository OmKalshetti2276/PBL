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
  let inputs = location.state?.inputs || {};
  let data = location.state?.result || {};

  if(!location.state){
  const saved = JSON.parse(localStorage.getItem("result"));
  if(saved){
    data = saved.result;
    inputs = saved.inputs;
  }
}

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

const getHighestRisk = () => {

  const risks = [
    { name: "diabetes", value: data.diabetes },
    { name: "pcos", value: data.pcos || 0 },
    { name: "thyroid", value: data.thyroid }
  ];

  risks.sort((a,b)=>b.value-a.value);

  return risks[0];

};

const handleDownload = () => {

  const doc = new jsPDF();

  let y = 20;

  /* PAGE BORDER */
  doc.setDrawColor(234, 117, 164);
  doc.setLineWidth(1);
  doc.rect(7,7,200,287);

  

  
  doc.setFillColor(255,182,193);
  doc.rect(7,7,200,37,"F");
  doc.setFontSize(21);
  doc.setTextColor(120,0,60);
  doc.text("HormoAI Health Report",105,27,{align:"center"});

  /* GENDER HEADER */
  y+=15;
  doc.setTextColor(0,0,0);
  // const gender = inputs.gender || "N.A";
  // // const genderIcon = inputs.gender === "Female" ? "♀" : "♂";
  
  // doc.text(`${gender} `,105,y,{align:"center"});
  y=33;
  y += 10;

  doc.line(20,y,190,y);

  y += 15;

  /* PARAMETERS HEADER */

/* USER INPUTS SECTION */

doc.setFontSize(14);
doc.setTextColor(180,50,120);
doc.text("User Input Summary",105,y,{align:"center"});
doc.setTextColor(0,0,0);

y += 10;

doc.setFontSize(12);
doc.setFont(undefined,"bold");
doc.text("Parameter",20,y);
doc.text("Observed Value",90,y);
doc.text("Normal Range",150,y);
doc.setFont(undefined,"normal");

y += 10;
const parameters=["gender","Age","BMI","Glucose","BloodPressure",
  "SkinThickness","Insulin","DPF","folR","folL","amh","lh",
  "cycle","TSH","TT4","T4U"
]
const normalRanges = {
  gender: "-",
  Age: "10 - 100",
  BMI: "18.5 - 24.9",
  Glucose: "70 - 140",
  BloodPressure: "60 - 140",
  SkinThickness:"10-50",
  Insulin: "15 - 276",
  DPF:"0.1-2.5",
  folR: "0 - 30",
  folL: "0 - 30",
  skin:"",hair:"",weight:"",
  amh: "1 - 10",
  lh: "1 - 20",fastfood:"",
  cycle: "21 - 35",
  ratio:"",
  TSH: "0.4 - 4.0",
  TT4:"5-12",
  T4U:"1-4",
  FTI:"1-4"
  
};

parameters.forEach((key) => {
  if(y > 230){
    doc.addPage();
    y = 20;
  }
const label = key
  .replace(/([A-Z])/g," $1")
  .replace(/^./,c=>c.toUpperCase());

  doc.text(label,20,y);
  let v=inputs[key];
  if (inputs.gender=="male" && ["folR","folL","skin","hair","weight","amh","cycle","lh","ratio","fastfood"].includes(key)){
    v="N.A";
  }
  doc.text(String(v??"N.A"),90,y);
  doc.text(normalRanges[key] || "-",150,y);

  y += 8;

});

  y += 20;

/* RISK TABLE */

doc.setFontSize(14);
doc.setFont(undefined,"bold");
doc.text("Risk Assessment",105,y,{align:"center"});
doc.setFont(undefined,"normal");

y += 10;

const tableX = 60;
const tableY = y;
const tableWidth = 90;
const rowHeight = 10;
const rows = 4; // header + 3 diseases

const tableHeight = rowHeight * rows;

doc.rect(tableX, tableY, tableWidth, tableHeight);

// header separator
doc.line(tableX, tableY + rowHeight, tableX + tableWidth, tableY + rowHeight);

// vertical column divider
doc.line(tableX + 45, tableY, tableX + 45, tableY + tableHeight);

doc.setFontSize(12);

doc.text("Disease", tableX + 10, tableY + 7);
doc.text("Risk", tableX + 55, tableY + 7);

doc.text("Diabetes", tableX + 5, tableY + 17);
doc.text(`${data.diabetes}%`, tableX + 55, tableY + 17);

doc.text("PCOS", tableX + 5, tableY + 27);
doc.text(data.pcos !== undefined ? `${data.pcos}%` : "N/A", tableX + 55, tableY + 27);

doc.text("Thyroid", tableX + 5, tableY + 37);
doc.text(`${data.thyroid}%`, tableX + 55, tableY + 37);

y += tableHeight + 10;

  /* PAGE 2 */

  doc.addPage();

  doc.rect(5,5,200,287);
  doc.setTextColor(180,50,120);

  let y2 = 20;

  doc.setFontSize(18);
  doc.text("Lifestyle Recommendations",105,y2,{align:"center"});
  doc.setTextColor(0,0,0);
  y2 += 15;
  const risks = [
  { name: "diabetes", value: data.diabetes },
  { name: "pcos", value: data.pcos || 0 },
  { name: "thyroid", value: data.thyroid }
];

risks.sort((a,b)=>b.value-a.value);

const highest = risks[0];

let diet = [];
let exercise = [];

/* GENERAL HEALTH */

if(highest.value < 30){

diet = [
"Eat balanced meals with fruits and vegetables",
"Drink plenty of water (2-3 liters daily)",
"Limit processed and sugary foods"
];

exercise = [
"30 minutes brisk walking daily",
"Light yoga or stretching",
"Maintain regular physical activity"
];

}

/* DIABETES */

else if(highest.name === "diabetes"){

diet = [
"Eat low glycemic foods like oats and brown rice",
"Reduce sugar and refined carbohydrates",
"Include leafy vegetables and whole grains",
"Eat smaller frequent meals"
];

exercise = [
"Brisk walking 30 minutes daily",
"Cycling or light jogging",
"Yoga: Surya Namaskar and Bhujangasana"
];

}

/* PCOS */

else if(highest.name === "pcos"){

diet = [
"High fiber foods like vegetables and oats",
"Lean proteins such as eggs, fish, tofu",
"Avoid processed foods and excess sugar",
"Include nuts and seeds"
];

exercise = [
"Yoga: Malasana and Butterfly pose",
"Strength training 3 times weekly",
"Cardio exercises like skipping or running"
];

}

/* THYROID */

else if(highest.name === "thyroid"){

diet = [
"Iodine rich foods like dairy and eggs",
"Selenium rich foods like nuts",
"Balanced protein intake",
"Avoid excessive soy products"
];

exercise = [
"Yoga: Sarvangasana and Matsyasana",
"Regular walking or swimming",
"Meditation and breathing exercises"
];

}

  // const recs = generateRecommendations();

doc.setFontSize(14);
doc.setFont(undefined,"bold");
doc.text("Diet Recommendations",20,y2);
doc.setFont(undefined,"normal");
y2 += 10;

doc.setFontSize(14);

diet.forEach(item=>{
  doc.text("• " + item,20,y2);
  y2 += 8;
});

y2 += 10;

doc.setFontSize(14);
doc.setFont(undefined,"bold");
doc.text("Exercise / Yoga",20,y2);
doc.setFont(undefined,"normal");

y2 += 10;

exercise.forEach(item=>{
  doc.text("• " + item,20,y2);
  y2 += 8;
});

  /* IMAGES */

  // doc.addImage("/yoga.png","PNG",25,y2,60,40);
  // doc.addImage("/healthy_food.png","PNG",115,y2,60,40);

  y2 += 55;

  /* DISCLAIMER */

  doc.setLineWidth(1.5);
  doc.line(20,y2,190,y2);

  y2 += 12;

  doc.setFontSize(10);

  doc.text(
    "This report is generated using predictive models and is not a medical diagnosis. Please consult a qualified healthcare professional for proper medical advice.",
    20,
    y2,
    {maxWidth:170}
  );

  /* FOOTER */

  doc.text("Thank you for trying HormoAI",190,285,{align:"right"});

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