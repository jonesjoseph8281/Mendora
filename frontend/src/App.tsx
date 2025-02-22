import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ProviderProfile } from './pages/ProviderProfile';
import { ProviderOnboarding } from './pages/ProviderOnboarding';
import { RoleSelection } from './components/RoleSelection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/services" element={<Services />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />
          <Route path="/provider/onboarding" element={<ProviderOnboarding />} />
          <Route path="*" element={<Navigate to="/" replace />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;