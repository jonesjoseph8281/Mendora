import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Mendora</h1>
      <p>Select an option to continue:</p>
      <div>
        <Link to="/login">
          <button style={buttonStyle}>Login</button>
        </Link>
        <Link to="/signup">
          <button style={buttonStyle}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Home;
