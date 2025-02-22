import React, { useState } from 'react';
import { AuthForm } from '../components/AuthForm';
import { Wrench } from 'lucide-react';

export function Home() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Wrench className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Blue Collar Connect
        </h1>
        <p className="text-lg text-gray-600">
          Connecting skilled professionals with customers in your area
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setMode('signin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'signin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <AuthForm mode={mode} />
      </div>
    </div>
  );
}