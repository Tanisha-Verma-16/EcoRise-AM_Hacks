import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Heart, MessageSquare, Users } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { formatAmount } from '../lib/utils';

interface Comment {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

export function CampaignDetails() {
  const { id } = useParams();
  const { isConnected, connect } = useWallet();
  const [contribution, setContribution] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: '0x1234...5678',
      content: 'Amazing initiative! Happy to support this cause.',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      user: '0x8765...4321',
      content: 'The progress so far is incredible. Keep up the great work!',
      timestamp: '1 day ago',
    },
  ]);

  // Dummy campaign data
  const campaign = {
    id: '1',
    title: 'Reforestation Project in Amazon',
    description:
      'Help us plant 10,000 trees in the Amazon rainforest to combat deforestation and climate change. Our project aims to restore vital ecosystems and provide habitats for endangered species. We work directly with local communities to ensure sustainable, long-term impact.',
    image:
      'https://images.unsplash.com/photo-1536147116438-62679a5e01f2?auto=format&fit=crop&q=80&w=800',
    goal: 50000,
    raised: 32000,
    daysLeft: 15,
    backers: 156,
    creator: '0x9876...5432',
    updates: [
      {
        id: '1',
        title: 'First Milestone Reached!',
        content:
          'We have successfully planted our first 1,000 trees. Thank you for your support!',
        date: '1 week ago',
      },
    ],
    tiers: [
      {
        id: '1',
        name: 'Seed Supporter',
        amount: 25,
        description:
          'Get a digital certificate and your name on our virtual forest',
      },
      {
        id: '2',
        name: 'Forest Guardian',
        amount: 100,
        description: 'Receive project updates and a personalized impact report',
      },
      {
        id: '3',
        name: 'Ecosystem Protector',
        amount: 500,
        description:
          'All previous rewards plus a virtual tour of the reforestation site',
      },
    ],
  };

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      connect();
      return;
    }
    // Handle contribution logic here
    console.log('Contributing:', contribution);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: (comments.length + 1).toString(),
      user: '0x1234...5678',
      content: comment,
      timestamp: 'Just now',
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-96 object-cover rounded-xl"
          />

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {campaign.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary-500 mr-2" />
                  <span>{campaign.backers} backers</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-primary-500 mr-2" />
                  <span>156 supporters</span>
                </div>
              </div>
              <button className="flex items-center text-primary-600 hover:text-primary-700">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>

            {/* Progress */}
            <div className="space-y-4 mb-8">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{
                    width: `${(campaign.raised / campaign.goal) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold">
                  {formatAmount(campaign.raised)} raised
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  of {formatAmount(campaign.goal)} goal
                </span>
              </div>
              <p className="text-primary-600 font-semibold">
                {campaign.daysLeft} days left
              </p>
            </div>

            {/* Updates */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-2xl font-bold mb-6">Campaign Updates</h2>
              {campaign.updates.map((update) => (
                <div
                  key={update.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4"
                >
                  <h3 className="font-semibold mb-2">{update.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {update.content}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {update.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Comments */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-2xl font-bold">Comments</h2>
              </div>

              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{comment.user}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contribution Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Make a Contribution</h2>
            <form onSubmit={handleContribute}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Amount ($)
                </label>
                <input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {isConnected ? 'Contribute' : 'Connect Wallet to Contribute'}
              </button>
            </form>
          </div>

          {/* Reward Tiers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Reward Tiers</h2>
            <div className="space-y-4">
              {campaign.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-500 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{tier.name}</h3>
                    <span className="text-primary-600 font-bold">
                      ${tier.amount}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
