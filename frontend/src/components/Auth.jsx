import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1>Welcome</h1>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/signup')}>Signup</button>
    </div>
  );
};

export default Auth;
