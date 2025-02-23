import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageSquare, Share2, Send, Users, Clock } from 'lucide-react';
import { campaigns } from '../App';

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'updates' | 'community'>('community');
  const [newComment, setNewComment] = useState('');

  const campaign = campaigns.find(c => c.id === Number(id));

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setNewComment('');
  };

  return (
    <div>
      {/* Campaign Header */}
      <div className="relative h-96">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              {campaign.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
            <p className="text-lg text-white/90 max-w-2xl">{campaign.description}</p>
          </div>
        </div>
      </div>

      {/* Campaign Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex gap-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('updates')}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'updates'
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Updates
                </button>
                <button
                  onClick={() => setActiveTab('community')}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'community'
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Community
                </button>
              </nav>
            </div>

            {/* Community Content */}
            {activeTab === 'community' && (
              <div>
                {/* New Comment Form */}
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {campaign.comments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={comment.avatar}
                          alt={comment.user}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{comment.user}</h3>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="mt-2 text-gray-600">{comment.content}</p>
                          <div className="mt-4 flex items-center gap-6">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-green-600">
                              <Heart className="h-4 w-4" />
                              <span className="text-sm">{comment.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-green-600">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-sm">Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Updates Content */}
            {activeTab === 'updates' && (
              <div className="space-y-8">
                {campaign.updates.map((update) => (
                  <div key={update.id} className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-2">{update.title}</h3>
                    <span className="text-sm text-gray-500">{update.date}</span>
                    <img
                      src={update.image}
                      alt={update.title}
                      className="w-full h-64 object-cover rounded-lg my-4"
                    />
                    <p className="text-gray-600">{update.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="mb-6">
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-medium text-green-600">
                    ${campaign.raised.toLocaleString()}
                  </span>
                  <span className="text-gray-500">
                    ${campaign.goal.toLocaleString()} goal
                  </span>
                </div>
              </div>
              
              <button className="w-full py-3 bg-green-600 text-white rounded-full hover:bg-green-700 font-medium">
                Support this project
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {campaign.supporters} supporters
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {campaign.daysLeft} days left
                  </div>
                </div>
                <button className="w-full py-2 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 font-medium">
                  Share Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;