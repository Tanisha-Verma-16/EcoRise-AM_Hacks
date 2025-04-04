import React, { useState } from 'react';
import { Users, TrendingUp, IndianRupee, Gift, Heart, Share2, MessageSquare, AlertTriangle, Edit2, Search, UserCircle } from 'lucide-react';
import Dashboard  from './Dashboard';

interface FundingRequest {
  id: number;
  name: string;
  business: string;
  story: string;
  amount: number;
  raised: number;
  supporters: number;
  daysLeft: number;
  image: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  announcement?: string;
}

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
}

interface TopContributor {
  name: string;
  amount: number;
  projects: number;
}

interface CreateRequestFormProps {
  onClose: () => void;
  onSubmit: (request: FundingRequest) => void;
  show: boolean;
  editRequest?: FundingRequest;
}

const App: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [supportedCampaigns, setSupportedCampaigns] = useState<FundingRequest[]>([]);
  const [showDonationModal, setShowDonationModal] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<FundingRequest | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [donationMessage, setDonationMessage] = useState<string>('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [editingRequest, setEditingRequest] = useState<FundingRequest | undefined>();
  const [searchTags, setSearchTags] = useState<string>('');

  const [fundingRequests, setFundingRequests] = useState<FundingRequest[]>([
    {
      id: 1,
      name: 'Green Earth Initiative',
      business: 'Urban Tree Plantation',
      story: 'Planting 10,000 trees in urban areas to combat air pollution and create green spaces for communities. Our initiative focuses on native species that support local biodiversity.',
      amount: 50000,
      raised: 32000,
      supporters: 120,
      daysLeft: 15,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop',
      tags: ['Climate Action', 'Reforestation', 'Air Quality'],
      likes: 45,
      isLiked: false,
      comments: [
        { id: 1, user: 'EcoWarrior', text: 'Amazing initiative! We need more projects like this.', timestamp: new Date('2024-03-10') }
      ],
      announcement: 'First 100 supporters will receive a tree dedication certificate!'
    },
    {
      id: 2,
      name: 'Solar for Schools',
      business: 'Community Solar Panels',
      story: 'Installing solar panels in rural schools to provide clean energy and reduce carbon emissions. This project will also educate students about renewable energy.',
      amount: 75000,
      raised: 54000,
      supporters: 85,
      daysLeft: 10,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
      tags: ['Renewable Energy', 'Education', 'Climate Action'],
      likes: 32,
      isLiked: false,
      comments: [],
      announcement: 'Major milestone: 50 schools already committed to the program!'
    },
    {
      id: 3,
      name: 'Ocean Cleanup Initiative',
      business: 'Plastic-Free Rivers',
      story: 'Organizing river clean-up drives and implementing innovative solutions to prevent plastic waste from reaching our oceans.',
      amount: 30000,
      raised: 21000,
      supporters: 67,
      daysLeft: 12,
      image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format&fit=crop',
      tags: ['Ocean Conservation', 'Plastic Waste', 'Water Quality'],
      likes: 28,
      isLiked: false,
      comments: [],
    }
  ]);

  const [topContributors] = useState<TopContributor[]>([
    { name: 'Ritu Sharma', amount: 125000, projects: 12 },
    { name: 'Anita Desai', amount: 98000, projects: 8 },
    { name: 'Priya Mehta', amount: 85000, projects: 10 },
    { name: 'Suman Reddy', amount: 76000, projects: 7 },
    { name: 'Nina Patel', amount: 65000, projects: 6 },
  ]);

  const handleLike = (requestId: number) => {
    setFundingRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? {
              ...request,
              likes: request.isLiked ? request.likes - 1 : request.likes + 1,
              isLiked: !request.isLiked
            }
          : request
      )
    );
  };

  const handleShare = (request: FundingRequest) => {
    const shareText = `Support ${request.business} - ${request.story}`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: request.business,
        text: shareText,
        url: shareUrl
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleComment = (requestId: number) => {
    if (!newComment.trim()) return;
    
    setFundingRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? {
              ...request,
              comments: [
                ...request.comments,
                {
                  id: Date.now(),
                  user: walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4),
                  text: newComment,
                  timestamp: new Date()
                }
              ]
            }
          : request
      )
    );
    setNewComment('');
  };

  const handleEdit = (request: FundingRequest) => {
    setEditingRequest(request);
    setShowCreateForm(true);
  };

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setWalletConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const openDonationModal = (request: FundingRequest) => {
    if (!walletConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    setSelectedRequest(request);
    setShowDonationModal(true);
  };

  const handleDonationSubmit = () => {
    if (!selectedRequest) return;

    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setFundingRequests(requests =>
      requests.map(request =>
        request.id === selectedRequest.id
          ? {
              ...request,
              raised: request.raised + amount,
              supporters: request.supporters + 1
            }
          : request
      )
    );

    setShowDonationModal(false);
    setDonationAmount('');
    setDonationMessage('');
    setSelectedRequest(null);
  };

  if (showDashboard) {
    return (
      <Dashboard
        userAddress={walletAddress}
        campaigns={fundingRequests.filter(r => r.name === walletAddress)}
        supportedCampaigns={supportedCampaigns}
        onBack={() => setShowDashboard(false)}
      />
    );
  }

  const filteredRequests = fundingRequests.filter(request => {
    if (!searchTags) return true;
    const searchTerms = searchTags.toLowerCase().split(',').map(term => term.trim());
    return request.tags.some(tag => 
      searchTerms.some(term => tag.toLowerCase().includes(term))
    );
  });

  const DonationModal = () => {
    if (!showDonationModal || !selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Support {selectedRequest.business}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (optional)
              </label>
              <textarea
                value={donationMessage}
                onChange={(e) => setDonationMessage(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Add a message of support"
                rows={3}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDonationModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDonationSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CreateRequestForm = ({ show, onClose, onSubmit, editRequest }: CreateRequestFormProps) => {
    if (!show) return null;

    const [formData, setFormData] = useState<Partial<FundingRequest>>(
      editRequest || {
        name: '',
        business: '',
        story: '',
        amount: 0,
        image: '',
        tags: [],
        daysLeft: 30,
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const finalRequest = {
        ...formData,
        id: editRequest?.id || Date.now(),
        raised: editRequest?.raised || 0,
        supporters: editRequest?.supporters || 0,
        likes: editRequest?.likes || 0,
        comments: editRequest?.comments || [],
        isLiked: editRequest?.isLiked || false,
      } as FundingRequest;

      onSubmit(finalRequest);
      setEditingRequest(undefined);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full">
          <h3 className="text-xl font-bold mb-4">
            {editRequest ? 'Edit Campaign' : 'Create New Campaign'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Story
              </label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Amount (₹)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags?.join(', ')}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setEditingRequest(undefined);
                }}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {editRequest ? 'Save Changes' : 'Create Campaign'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-green-600">Climate Action Crowdfunding</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Join the movement to combat climate change. Support innovative projects that make a real impact on our environment.
        </p>

        {/* Wallet Connection */}
        {/* {!walletConnected ? (
          <button
            onClick={connectWallet}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="text-green-600 font-medium">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>
        )}
      </div> */}
      <div className="flex items-center justify-center gap-4">
          {!walletConnected ? (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className={`bg-green-600 text-white px-6 py-2 rounded-full transition-colors ${
                isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
              }`}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <>
              <div className="text-green-600 font-medium">
                Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
              <button
                onClick={() => setShowDashboard(true)}
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <UserCircle className="w-5 h-5" />
                Dashboard
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Funding Requests */}
        <div className="lg:w-2/3">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-600">
                Active Climate Action Campaigns
              </h2>
              <button
                onClick={() => {
                  if (!walletConnected) {
                    alert('Please connect your wallet first!');
                    return;
                  }
                  setShowCreateForm(true);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                Start Campaign
              </button>
            </div>
            
            {/* Search by Tags */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by tags (e.g., Climate Action, Water)"
                value={searchTags}
                onChange={(e) => setSearchTags(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={request.image}
                    alt={request.business}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-green-600 font-medium">
                    {request.daysLeft} days left
                  </div>
                  {request.name === walletAddress && (
                    <button
                      onClick={() => handleEdit(request)}
                      className="absolute top-4 left-4 bg-white p-2 rounded-full text-green-600 hover:bg-green-50"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="p-6">
                  {request.announcement && (
                    <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-700">{request.announcement}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {request.business}
                      </h3>
                      <p className="text-gray-600">by {request.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ₹{request.raised.toLocaleString()}
                      </p>
                      <p className="text-gray-500">of ₹{request.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{request.story}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {request.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((request.raised / request.amount) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{Math.round((request.raised / request.amount) * 100)}% funded</span>
                      <span>{request.supporters} supporters</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleLike(request.id)}
                        className={`flex items-center gap-1 ${
                          request.isLiked ? 'text-red-500' : 'text-gray-500'
                        } hover:text-red-500 transition-colors`}
                      >
                        <Heart className={`w-5 h-5 ${request.isLiked ? 'fill-current' : ''}`} />
                        <span>{request.likes}</span>
                      </button>
                      <button
                        onClick={() => handleShare(request)}
                        className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={() => setExpandedCard(expandedCard === request.id ? null : request.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>{request.comments.length}</span>
                      </button>
                    </div>
                    <button
                      className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                      onClick={() => openDonationModal(request)}
                    >
                      Support Now
                    </button>
                  </div>

                  {/* Comments Section */}
                  {expandedCard === request.id && (
                    <div className="mt-6 pt-4 border-t">
                      <div className="space-y-4 mb-4">
                        {request.comments.map(comment => (
                          <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{comment.user}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 border rounded-lg px-3 py-2"
                        />
                        <button
                          onClick={() => handleComment(request.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors & Stats */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-green-600">
              Climate Champions
            </h3>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{contributor.name}</p>
                    <p className="text-sm text-gray-500">
                      {contributor.projects} projects supported
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      ₹{contributor.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Environmental Impact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <IndianRupee className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">₹12.5L+</p>
                  <p className="text-green-100">Total Funds Raised</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">250+</p>
                  <p className="text-green-100">Projects Funded</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Gift className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">1,500+</p>
                  <p className="text-green-100">Active Contributors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateRequestForm
        show={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setEditingRequest(undefined);
        }}
        onSubmit={(newRequest) => {
          setFundingRequests(prev => 
            editingRequest
              ? prev.map(req => req.id === newRequest.id ? newRequest : req)
              : [newRequest, ...prev]
          );
          setShowCreateForm(false);
          setEditingRequest(undefined);
        }}
        editRequest={editingRequest}
      />
      <DonationModal />
    </div>
  
  );
};

declare global {
  interface Window {
    ethereum: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

export default App;