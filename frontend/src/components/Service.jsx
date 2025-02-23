import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Service = () => {
  const [services, setServices] = useState([]);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL; // Use the BASE_URL from environment variables
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/business/all`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [BASE_URL]);

  return (
    <div className="service-container">
      <h2>Our Services</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
      <h2>Select Your Role</h2>
      <button onClick={() => navigate('/servicepage')}>Service</button>
      <button onClick={() => navigate('/customer')}>Customer</button>
    </div>
  );
};

export default Service;
