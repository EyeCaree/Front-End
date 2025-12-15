import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import CekMata from "./pages/CekMata";
import Login from "./pages/Login";  
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  // Cek token untuk autentikasi awal
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  // Optional: update jika localStorage berubah (misalnya logout dari tab lain)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      {/* Jika root path, arahkan ke home atau login tergantung status */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Login dan Register */}
      <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />

      {/* Forgot & Reset Password */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Halaman yang butuh autentikasi */}
      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <Home setAuth={setIsAuthenticated} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/CekMata"
        element={
          isAuthenticated ? (
            <CekMata setAuth={setIsAuthenticated} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;