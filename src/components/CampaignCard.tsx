import React from 'react';
import { Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  goal: number;
  raised: number;
  category: string;
  daysLeft: number;
  supporters: number;
}

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  return (
    <Link to={`/campaign/${campaign.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
        <div className="relative h-48">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium dark:text-white">
              {campaign.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {campaign.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {campaign.description}
          </p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className="h-full bg-green-600 dark:bg-green-500 rounded-full"
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="font-medium text-green-600 dark:text-green-500">
                ${campaign.raised.toLocaleString()}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                ${campaign.goal.toLocaleString()} goal
              </span>
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {campaign.supporters} supporters
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {campaign.daysLeft} days left
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;