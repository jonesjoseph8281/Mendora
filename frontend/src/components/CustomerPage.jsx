import React, { useState } from "react";
import axios from "axios";

const CustomerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [businesses, setBusinesses] = useState([]);

  const fetchAllBusinesses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/business/all");
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  const searchBusiness = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/business/search?query=${searchQuery}`);
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error searching businesses:", error);
    }
  };

  const contactBusiness = async (businessId) => {
    try {
      const token = localStorage.getItem("token"); // Ensure user is logged in
  
      if (!token) {
        console.error("No token found, user is not logged in.");
        return;
      }
  
      const response = await axios.post(
        `http://localhost:5000/api/business/contact/${businessId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, // Include auth token
        }
      );
  
      console.log("Contact request sent successfully:", response.data);
    } catch (error) {
      console.error("Error contacting business:", error);
    }
  };
  

  return (
    <div>
      <h2>Customer Page</h2>
      <p>Welcome to the customer section!</p>

      <button onClick={fetchAllBusinesses}>View All Businesses</button>

      <div>
        <input type="text" placeholder="Search Business..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={searchBusiness}>Search</button>
      </div>

      {/* Display Results */}
      <div>
        {businesses.length > 0 ? (
          <ul>
            {businesses.map((business) => (
              <li key={business.id}>
                <h3>{business.name} - {business.category}</h3>
                <p>{business.description}</p>
                <p>📍 {business.location}</p>
                <p>📧 {business.businessEmail} | 📞 {business.contact}</p>

                {/* Display Image */}
                {business.imageUrl && (
                  <img src={business.imageUrl} alt={business.name} style={{ width: "300px", height: "200px", objectFit: "cover" }} />
                )}

                {/* Contact Business Button */}
                <button onClick={() => contactBusiness(business.id)}>Contact Business</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No businesses found</p>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;