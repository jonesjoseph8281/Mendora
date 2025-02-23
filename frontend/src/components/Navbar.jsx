import { Link } from "react-router-dom";
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Mendora</Link>
      <div className="space-x-4">
        <Link to="/service" className="hover:text-gray-300">Services</Link>
        <Link to="/business" className="hover:text-gray-300">Business</Link>
        <Link to="/customer" className="hover:text-gray-300">Customers</Link>
      </div>
    </nav>
  );
}

export default Navbar;
