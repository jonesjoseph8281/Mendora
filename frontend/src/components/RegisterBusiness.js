import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    location: '',
    phone: '',
    email: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('businesses')
      .insert([formData]);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate('/businesses'); // Redirect to businesses list
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Register Your Business</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" name="name" placeholder="Business Name" required 
          value={formData.name} onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <input 
          type="text" name="service" placeholder="Service Type (e.g., Plumbing, Electrician)" required 
          value={formData.service} onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <input 
          type="text" name="location" placeholder="Location (City, State)" required 
          value={formData.location} onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <input 
          type="tel" name="phone" placeholder="Phone Number" required 
          value={formData.phone} onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <input 
          type="email" name="email" placeholder="Business Email" required 
          value={formData.email} onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <textarea 
          name="description" placeholder="Business Description" required 
          value={formData.description} onChange={handleChange}
          className="w-full p-2 border rounded-md"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? 'Registering...' : 'Register Business'}
        </button>
      </form>
    </div>
  );
};

export default RegisterBusiness;
