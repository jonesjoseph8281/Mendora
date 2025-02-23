import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Service from "./components/Service";
import ServicePage from "./components/ServicePage";
import CustomerPage from "./components/CustomerPage";
import Business from "./components/Business";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/service" element={<Service />} />
        <Route path="/servicepage" element={<ServicePage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/business" element={<Business />} />
      </Routes>
    </>
  );
}

export default App;
