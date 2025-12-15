import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../asset/logo-eye-care.png";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  // 🔁 Cek jika token sudah ada, langsung redirect ke /home
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://back-end-production-faf7.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginStatus("Login berhasil!");
        localStorage.setItem("token", data.token);
        setAuth(true);
        navigate("/home", { replace: true });
      } else {
        setLoginStatus(data.message || "Login gagal. Coba lagi.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginStatus("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="loginPage flex">
      <div className="container">
        <div className="colorContainer">
          <h2 className="title">Check Your Eyes!</h2>
          <p>Prevent eye health risks early for better well-being</p>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Eye Care" />
            <h3 className="welcomeText">Welcome Back!</h3>
          </div>

          <form className="form grid" onSubmit={handleLogin}>
            {loginStatus && <span className="loginStatus">{loginStatus}</span>}

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  className="inputField"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  className="inputField"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your password? <Link to="/forgot-password">Click Here</Link>
            </span>
          </form>
        </div>

        <div className="footerDiv flex">
          <span className="text">Don't have an Account?</span>
          <Link to="/register">
            <button className="btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
