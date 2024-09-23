import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./SignIn.css";
import axios from 'axios';

function SignIn({ onSignIn }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
  } catch (error) {
      console.error('Error registering user', error);
      alert('Registration failed');
      alert (registerData.password +" "+registerData.username+" "+registerData.email);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/users/verify', {
        email: loginData.email,
        password: loginData.password,
      });
      console.log('Login successful', response.data);
      onSignIn(); 
      navigate('/home'); 
    } catch (error) {
      console.error('Error logging in', error);
      alert('Login failed');
    }
  };

  return (
    <div className="sign-in">
      <div className="form-container">
        <div className="form-section register">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="register-username">Username:</label>
            <input
              type="text"
              id="register-username"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
            <label htmlFor="register-email">Email:</label>
            <input
              type="email"
              id="register-email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <label htmlFor="register-password">Password:</label>
            <input
              type="password"
              id="register-password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
            <label htmlFor="register-confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="register-confirm-password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>

        <div className="form-section login" style={{ display: isRegistering ? 'none' : 'block' }}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="login-email">Email:</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
