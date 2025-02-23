import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { WalletProvider } from '../context/WalletContext';
import { Navbar } from '../components/Navbar';
import { LandingPage } from '../components/LandingPage';
import { Dashboard } from '../components/Dashboard';
import { CampaignDetails } from '../components/CampaignDetails';

function CrowdFunding() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/start-campaign" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/campaign/:id" element={<CampaignDetails />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default CrowdFunding;