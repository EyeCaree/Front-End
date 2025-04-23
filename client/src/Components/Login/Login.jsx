import React, { useState } from 'react';
import './Login.scss';
import '../../App.scss';
import { Link } from 'react-router-dom';

import logo from '/src/LoginAssets/Logo.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.1.8:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setLoginStatus('Login berhasil!');
                console.log('Token:', data.token);
                // Simpan token di localStorage (opsional)
                localStorage.setItem('token', data.token);
                // Redirect atau logika lanjut
            } else {
                setLoginStatus(data.message || 'Login gagal');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginStatus('Terjadi kesalahan saat login');
        }
    };

    return (
        <div className='loginPage flex'>
            <div className="container">
                <div className="colorContainer">
                    <h2 className='title'>Create And Sell Extraordinary Product</h2>
                    <p>Adopt the peace of natural!</p>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3 className='welcomeText'>Welcome Back!</h3>
                    </div>

                    <form className='form grid' onSubmit={handleLogin}>
                        <span className='loginStatus'>{loginStatus}</span>

                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input
                                    type="email"
                                    id='email'
                                    placeholder='Enter Email'
                                    className='inputField'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input
                                    type="password"
                                    id='password'
                                    placeholder='Enter Password'
                                    className='inputField'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>

                        <span className='forgotPassword'>
                            Forgot your password? <a href="">Click Here</a>
                        </span>
                    </form>
                </div>

                <div className="footerDiv flex">
                    <span className="text">Don't have an Account?</span>
                    <Link to="/register">
                        <button className='btn'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
