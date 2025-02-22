import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, Calendar } from 'lucide-react';

const SAMPLE_PROVIDER = {
  id: '1',
  name: 'John Smith',
  service: 'Plumbing',
  rating: 4.8,
  reviews: 124,
  location: 'Brooklyn, NY',
  image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=600&h=400',
  description: 'Professional plumber with over 10 years of experience. Specializing in residential and commercial plumbing services.',
  phone: '(555) 123-4567',
  email: 'john.smith@example.com',
  availability: 'Monday to Friday, 8:00 AM - 6:00 PM'
};

export function ProviderProfile() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={SAMPLE_PROVIDER.image}
              alt={SAMPLE_PROVIDER.name}
              className="h-48 w-full object-cover md:h-full md:w-48"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {SAMPLE_PROVIDER.name}
              </h1>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-medium text-lg">
                  {SAMPLE_PROVIDER.rating}
                </span>
                <span className="text-gray-600 ml-1">
                  ({SAMPLE_PROVIDER.reviews} reviews)
                </span>
              </div>
            </div>

            <p className="text-blue-600 font-medium text-lg mb-4">
              {SAMPLE_PROVIDER.service}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{SAMPLE_PROVIDER.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2" />
                <span>{SAMPLE_PROVIDER.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <span>{SAMPLE_PROVIDER.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{SAMPLE_PROVIDER.availability}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              {SAMPLE_PROVIDER.description}
            </p>

            <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors">
              Contact Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}