import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Service = () => {
  const navigate = useNavigate();

  return (
    <div className="service-container">
      <h2>Select Your Role</h2>
      <button onClick={() => navigate('/servicepage')}>Service</button>
      <button onClick={() => navigate('/customer')}>Customer</button>
    </div>
  );
};

export default Service;
