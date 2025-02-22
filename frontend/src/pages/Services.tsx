import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

const SAMPLE_PROVIDERS = [
  {
    id: '1',
    name: 'John Smith',
    service: 'Plumbing',
    rating: 4.8,
    reviews: 124,
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    service: 'Electrical',
    rating: 4.9,
    reviews: 89,
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=300&h=300'
  },
  // Add more sample providers as needed
];

export function Services() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Service Providers</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_PROVIDERS.map((provider) => (
          <div
            key={provider.id}
            onClick={() => navigate(`/provider/${provider.id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {provider.name}
              </h3>
              <p className="text-blue-600 font-medium mb-2">{provider.service}</p>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{provider.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="font-medium">{provider.rating}</span>
                <span className="text-gray-600 text-sm ml-1">
                  ({provider.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}