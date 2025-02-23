import React from "react";
import { Link } from "react-router-dom";
import '../styles/home.css';

const Home = () => {
  return (
    <div className="container">
      <h1>Mendora</h1>
      <p>Skills meet oppurtunities</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};



export default Home;
