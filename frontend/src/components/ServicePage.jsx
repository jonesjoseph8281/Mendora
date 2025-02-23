import React from "react";
import { useNavigate } from "react-router-dom";

const ServicePage = () => {
  const navigate = useNavigate();

  const handleAddBusiness = () => {
    navigate("/business"); // Navigate to Business page
  };

  return (
    <div>
      <h2>Service Page</h2>
      <p>Welcome to the service section!</p>
      <button onClick={handleAddBusiness}>Add Business</button>
    </div>
  );
};

export default ServicePage;
