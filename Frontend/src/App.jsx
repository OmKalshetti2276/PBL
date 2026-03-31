import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Input from "./pages/Input";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Input />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;