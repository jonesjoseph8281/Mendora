import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hammer, UserCircle } from 'lucide-react';

export function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate('/provider/onboarding')}
        className="flex flex-col items-center p-8 rounded-xl border-2 border-blue-200 hover:border-blue-500 transition-colors bg-white"
      >
        <Hammer className="h-16 w-16 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Provider</h3>
        <p className="text-gray-600 text-center">
          Offer your services and connect with customers in your area
        </p>
      </button>

      <button
        onClick={() => navigate('/services')}
        className="flex flex-col items-center p-8 rounded-xl border-2 border-blue-200 hover:border-blue-500 transition-colors bg-white"
      >
        <UserCircle className="h-16 w-16 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer</h3>
        <p className="text-gray-600 text-center">
          Find skilled professionals for your service needs
        </p>
      </button>
    </div>
  );
}