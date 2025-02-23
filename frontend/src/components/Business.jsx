import React, { useState } from "react";
import axios from "axios";

const Business = () => {
  const [businessData, setBusinessData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    businessEmail: "",
    contact: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(businessData).forEach((key) => {
      formData.append(key, businessData[key]);
    });
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/business/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Business added successfully:", response.data);
      alert("Business added successfully!");
    } catch (error) {
      console.error("Error adding business:", error.response?.data || error.message);
      alert("Failed to add business. Try again.");
    }
  };

  return (
    <div>
      <h2>Add Business</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Business Name" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="email" name="businessEmail" placeholder="Business Email" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />

        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Business;
