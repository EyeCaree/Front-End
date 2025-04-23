import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import WebcamCapture from './Components/Camera/Webcamcapture'; // <- Webcam Capture
import KlasifikasiImage from './Components/Camera/Klasifikasiimage'; // <- Import KlasifikasiImage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/camera" element={<WebcamCapture />} /> {/* Rute untuk Webcam Capture */}
        <Route path="/klasifikasi" element={<KlasifikasiImage />} /> {/* Rute untuk Klasifikasi Image */}
      </Routes>
    </Router>
  );
}

export default App;
