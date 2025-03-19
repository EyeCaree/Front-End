import React, { useState } from "react";
import "./Register.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "/src/LoginAssets/Logo.png";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

// URL Backend dari .env (pastikan sudah ada VITE_API_URL di .env)
const API_URL = import.meta.env.VITE_API_URL || "http://172.20.10.3:8000";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle submit form
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            const response = await axios.post(`${VITE_API_URL}/register`, formData, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 201) {
                setStatus("Registrasi berhasil!");
            } else {
                setStatus("Registrasi gagal. Silakan coba lagi.");
            }
        } catch (error) {
            setStatus("Registrasi gagal. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginPage flex">
            <div className="container">
                {/* Container dengan background warna */}
                <div className="colorContainer">
                    <h2 className="title"> Join Us & Explore More!</h2>
                    <p>Sign up and start your journey.</p>
                </div>

                {/* Form Register */}
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo" />
                        <h3 className="welcomeText"> Create Your Account</h3>
                    </div>

                    <form onSubmit={handleRegister} className="form grid">
                        <span className="loginStatus">{status}</span>

                        <div className="inputDiv">
                            <label htmlFor="name">Full Name</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter Full Name"
                                    className="inputField"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdEmail className="icon" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="inputField"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    placeholder="Enter Password"
                                    className="inputField"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn flex" disabled={loading}>
                            {loading ? "Processing..." : "Sign Up"}
                            <AiOutlineSwapRight className="icon" />
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="footerDiv flex">
                    <span className="text">Already have an Account? </span>
                    <Link to="/">
                        <button className="btn"> Login </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
