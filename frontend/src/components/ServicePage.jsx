import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/auth.css';

const ServicePage = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [showContacts, setShowContacts] = useState(false);

    const businessId = "your-business-id"; // Replace with actual business ID

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from local storage
            console.log(token)
            const response = await axios.get(
                `http://localhost:5000/api/business/contacts/${businessId}`,
                {
                  headers: { Authorization: `Bearer ${token}` }, // Send the token in headers
                }
              );
            console.log("Contacts fetched:", response.data);
            setContacts(response.data);
            setShowContacts(true);
        } catch (error) {
            console.error("Error fetching contacted people:", error);
        }
    };

    return (
        <div>
            <h2>Service Page</h2>
            <p>Welcome to the service section!</p>
            <button onClick={() => navigate("/business")}>Add Business</button>
            <button onClick={fetchContacts}>Show Contacted</button>

            {showContacts && (
                <div>
                    <h3>Contacted People</h3>
                    {contacts.length > 0 ? (
                        <ul>
                            {contacts.map((contact, index) => (
                                <li key={index}>
                                    <strong>Name:</strong> {contact.name} <br />
                                    <strong>Email:</strong> {contact.email} <br />
                                    <strong>Message:</strong> {contact.message || "No message provided"}
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No contacts yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ServicePage;
