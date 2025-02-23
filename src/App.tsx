import { Routes, Route } from 'react-router-dom';
import { Leaf, Waves, Wind, Factory } from 'lucide-react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CrowdFunding from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { CampaignDetails } from './components/CampaignDetails';

export const categories = [
  { icon: Leaf, name: 'Afforestation', color: 'bg-green-100 text-green-600' },
  { icon: Waves, name: 'Ocean Cleanup', color: 'bg-blue-100 text-blue-600' },
  {
    icon: Wind,
    name: 'Renewable Energy',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Factory,
    name: 'Carbon Capture',
    color: 'bg-amber-100 text-amber-600',
  },
];

export const campaigns = [
  {
    id: 1,
    title: 'Urban Forest Initiative',
    description:
      'Creating green spaces in metropolitan areas to combat urban heat islands and improve air quality.',
    image:
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
    progress: 75,
    goal: 50000,
    raised: 37500,
    category: 'Afforestation',
    daysLeft: 12,
    supporters: 234,
    updates: [
      {
        id: 1,
        title: 'First trees planted!',
        content:
          'We successfully planted our first 100 trees in downtown area.',
        date: '2024-03-15',
        image:
          'https://images.unsplash.com/photo-1601895167492-55a0aa61c13a?auto=format&fit=crop&w=800&q=80',
      },
    ],
    comments: [
      {
        id: 1,
        user: 'Sarah Chen',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        content:
          'This is exactly what our city needs! Looking forward to seeing more green spaces.',
        date: '2024-03-16',
        likes: 12,
      },
      {
        id: 2,
        user: 'Michael Park',
        avatar:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
        content:
          'I live nearby the planting site. The transformation is already visible!',
        date: '2024-03-16',
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    title: 'Ocean Plastic Cleanup System',
    description:
      'Deploying innovative technology to remove plastic waste from our oceans.',
    image:
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80',
    progress: 45,
    goal: 100000,
    raised: 45000,
    category: 'Ocean Cleanup',
    daysLeft: 30,
    supporters: 567,
    updates: [
      {
        id: 1,
        title: 'Prototype testing successful',
        content:
          'Our first prototype has successfully collected over 500kg of plastic in initial tests.',
        date: '2024-03-14',
        image:
          'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      },
    ],
    comments: [
      {
        id: 1,
        user: 'Emma Wilson',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        content: 'Amazing progress! The before/after photos are incredible.',
        date: '2024-03-15',
        likes: 15,
      },
    ],
  },
];

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/start-campaign" element={<CrowdFunding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/fun" element={<ClimateHub />} />
      </Routes>
    </div>
  );
}

export default App;
