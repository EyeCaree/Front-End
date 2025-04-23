import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CekMata from "./pages/CekMata";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CekMata" element={<CekMata />} />
    </Routes>
  );
}

export default App;
