import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';

const User = () => {
  const [userData, setUserData] = useState(null);
  const BASE_URL = process.env.BASE_URL; // Use the BASE_URL from environment variables

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [BASE_URL]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="user-container">
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default User;
