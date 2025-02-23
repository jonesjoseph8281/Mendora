import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const BASE_URL = process.env.BASE_URL; // Use the BASE_URL from environment variables

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, formData);
      console.log(response.data);
      
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      
      navigate("/service");
    } catch (error) {
      console.error("Signup failed", error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
