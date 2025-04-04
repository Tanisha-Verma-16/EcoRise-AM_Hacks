import React from 'react';
import { Users, TrendingUp, IndianRupee, ArrowLeft } from 'lucide-react';

interface Campaign {
  id: number;
  business: string;
  story: string;
  amount: number;
  raised: number;
  supporters: number;
  daysLeft: number;
  image: string;
  tags: string[];
}

interface DashboardProps {
  userAddress: string;
  campaigns: Campaign[];
  supportedCampaigns: Campaign[];
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  userAddress,
  campaigns,
  supportedCampaigns,
  onBack
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Campaigns
      </button>

      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
            </h1>
            <p className="text-gray-600">Member since {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg p-4">
            <IndianRupee className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              ₹{campaigns.reduce((sum, c) => sum + c.raised, 0).toLocaleString()}
            </p>
            <p className="text-gray-600">Total Raised</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{campaigns.length}</p>
            <p className="text-gray-600">Campaigns Created</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{supportedCampaigns.length}</p>
            <p className="text-gray-600">Campaigns Supported</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="bg-white border rounded-lg overflow-hidden">
                  <img 
                    src={campaign.image} 
                    alt={campaign.business} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{campaign.business}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.story}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-green-600 font-bold">₹{campaign.raised.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">of ₹{campaign.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">{campaign.supporters} supporters</p>
                        <p className="text-sm text-gray-500">{campaign.daysLeft} days left</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Campaigns You've Supported</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportedCampaigns.map(campaign => (
                <div key={campaign.id} className="bg-white border rounded-lg overflow-hidden">
                  <img 
                    src={campaign.image} 
                    alt={campaign.business} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{campaign.business}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.story}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-green-600 font-bold">₹{campaign.raised.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">of ₹{campaign.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">{campaign.supporters} supporters</p>
                        <p className="text-sm text-gray-500">{campaign.daysLeft} days left</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;