import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Service = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Welcome, {user?.name || "User"}!
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Choose an option below to proceed:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Register as Business */}
        <div
          onClick={() => navigate('/register-business')}
          className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Register as a Business</h3>
          <p className="text-gray-600">Join our platform to connect with customers and grow your business.</p>
        </div>

        {/* View Businesses */}
        <div
          onClick={() => navigate('/businesses')}
          className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Businesses</h3>
          <p className="text-gray-600">Find registered businesses and request services.</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
