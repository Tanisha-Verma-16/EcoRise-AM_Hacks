import React, { useState } from 'react';
import {
  PlusCircle,
  Edit,
  Trash2,
  Share2,
  BarChart3,
  Users,
  DollarSign,
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  daysLeft: number;
  image: string;
}

interface Tier {
  id: string;
  name: string;
  amount: number;
  description: string;
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'campaigns' | 'create'
  >('overview');
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Reforestation Project in Amazon',
      description: 'Help us plant 10,000 trees in the Amazon rainforest.',
      goal: 50000,
      raised: 32000,
      daysLeft: 15,
      image:
        'https://images.unsplash.com/photo-1536147116438-62679a5e01f2?auto=format&fit=crop&q=80&w=800',
    },
  ]);

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    goal: '',
    deadline: '',
    image: '',
  });

  const [tiers, setTiers] = useState<Tier[]>([
    {
      id: '1',
      name: 'Supporter',
      amount: 25,
      description: 'Get a thank you note',
    },
    {
      id: '2',
      name: 'Champion',
      amount: 100,
      description: 'Receive a project update report',
    },
  ]);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle campaign creation logic here
    console.log('Creating campaign:', newCampaign);
  };

  const addTier = () => {
    const newTier: Tier = {
      id: (tiers.length + 1).toString(),
      name: 'New Tier',
      amount: 0,
      description: '',
    };
    setTiers([...tiers, newTier]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage your campaigns and track their progress
        </p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Raised</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                $32,000
              </h3>
            </div>
            <DollarSign className="h-8 w-8 text-primary-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Active Campaigns
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                1
              </h3>
            </div>
            <BarChart3 className="h-8 w-8 text-primary-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Total Supporters
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                156
              </h3>
            </div>
            <Users className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Campaigns
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Create Campaign
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        New donation received
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        $100 - Amazon Reforestation Project
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Campaign milestone reached
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        50% funded - Wind Farm Initiative
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    1 day ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{campaign.title}</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-primary-500">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary-500">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{
                        width: `${(campaign.raised / campaign.goal) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Raised: ${campaign.raised.toLocaleString()}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Goal: ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {campaign.daysLeft} days remaining
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Create New Campaign</h2>
            <form onSubmit={handleCreateCampaign} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={newCampaign.title}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Funding Goal ($)
                  </label>
                  <input
                    type="number"
                    value={newCampaign.goal}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, goal: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Campaign Deadline
                  </label>
                  <input
                    type="date"
                    value={newCampaign.deadline}
                    onChange={(e) =>
                      setNewCampaign({
                        ...newCampaign,
                        deadline: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Campaign Image URL
                </label>
                <input
                  type="url"
                  value={newCampaign.image}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, image: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  required
                />
              </div>

              {/* Reward Tiers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Reward Tiers</h3>
                  <button
                    type="button"
                    onClick={addTier}
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <PlusCircle className="h-5 w-5 mr-1" />
                    Add Tier
                  </button>
                </div>
                {tiers.map((tier, index) => (
                  <div
                    key={tier.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => {
                          const newTiers = [...tiers];
                          newTiers[index].name = e.target.value;
                          setTiers(newTiers);
                        }}
                        placeholder="Tier Name"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      />
                      <input
                        type="number"
                        value={tier.amount}
                        onChange={(e) => {
                          const newTiers = [...tiers];
                          newTiers[index].amount = Number(e.target.value);
                          setTiers(newTiers);
                        }}
                        placeholder="Amount"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      />
                    </div>
                    <textarea
                      value={tier.description}
                      onChange={(e) => {
                        const newTiers = [...tiers];
                        newTiers[index].description = e.target.value;
                        setTiers(newTiers);
                      }}
                      placeholder="Reward Description"
                      className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
