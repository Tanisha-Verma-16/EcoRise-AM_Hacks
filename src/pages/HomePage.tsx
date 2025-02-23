import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClimateImpactCalculator from '../components/ClimateIMpactCalculator';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Renewable Energy',
    excerpt:
      'Exploring the latest innovations in sustainable power generation...',
    date: '2024-02-20',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1679917152396-4b18accacb9d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVuZXdhYmxlJTIwZW5lcmd5fGVufDB8fDB8fHww',
  },
  {
    id: 2,
    title: 'Ocean Conservation Initiatives',
    excerpt: 'How communities are working together to protect marine life...',
    date: '2024-02-18',
    imageUrl:
      'https://images.unsplash.com/photo-1575362247640-3c7f5079818d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW4lMjBjb25zZXJ2YXRpb258ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    title: 'Urban Farming Revolution',
    excerpt: 'Transforming city spaces into sustainable food sources...',
    date: '2024-02-15',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1674624682288-085eff4f98da?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        id="home"
        className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 min-h-screen flex items-center transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl md:text-7xl mb-8">
              Fund the Future of Our Planet
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Join a community of environmental changemakers and launch your own
              climate action campaign. Together, we can make a difference.
            </p>
            <Link
              to="/start-campaign"
              className="inline-flex items-center px-8 py-4 text-xl font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-200 group"
            >
              Start Your Campaign
              <Leaf className="ml-2 h-6 w-6 group-hover:rotate-12 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Impact Calculators Section */}
      <div id="calculators" className="bg-green-100 dark:bg-black py-16">
        <ClimateImpactCalculator />
      </div>

      {/* Blog Section */}
      <div
        id="blog"
        className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-24 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Latest from Our Blog
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Stay informed about climate action and environmental innovation
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {post.date}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-gray-500 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                  <div className="mt-4">
                    <a
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                    >
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* NASA Climate Data Sections */}
      <div id="actnow" className="bg-gray-900 dark:bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Real-Time Climate Impact Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Real-Time Climate Impact
            </h2>
            <p className="mt-3 text-lg text-gray-300">
              Track global temperature changes and understand why immediate
              action is crucial.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-16">
            <iframe
              src="https://climate.nasa.gov/earth-now/#/vital-signs/air-temperature/airs-infrared-surface-3day"
              className="w-full h-[600px] border-0"
              title="NASA Climate Change and Global Warming Vital Signs"
            />
          </div>

          {/* Climate Time Machine Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Climate Time Machine
            </h2>
            <p className="mt-3 text-lg text-gray-300">
              Visualize how our planet has changed over time and see the impact
              of climate change.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <iframe
              src="https://climate.nasa.gov/interactives/climate-time-machine"
              className="w-full h-[600px] border-0"
              title="NASA Climate Time Machine"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Data provided by NASA's Global Climate Change Vital Signs of the
              Planet
            </p>
            <a
              href="https://climate.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-green-400 hover:text-green-300 transition-colors"
            >
              Learn more at NASA Climate Change
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About EcoRise</h3>
              <p className="text-gray-400">
                Empowering environmental change through community-driven funding
                and action.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#calculators"
                    className="text-gray-400 hover:text-white"
                  >
                    Impact Calculators
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@ecorise.com</li>
                <li>Phone: +91 9999998888</li>
                <li>Address: 123 Green Street</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
                />
                <button className="px-4 py-2 bg-green-600 rounded-r-lg hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} EcoRise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
// import React from 'react';
// import { ArrowRight, Leaf } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import ClimateImpactCalculator from '../components/ClimateIMpactCalculator';

// const blogPosts = [
//   {
//     id: 1,
//     title: 'The Future of Renewable Energy',
//     excerpt:
//       'Exploring the latest innovations in sustainable power generation...',
//     date: '2024-02-20',
//     imageUrl: '/api/placeholder/400/250',
//   },
//   {
//     id: 2,
//     title: 'Ocean Conservation Initiatives',
//     excerpt: 'How communities are working together to protect marine life...',
//     date: '2024-02-18',
//     imageUrl: '/api/placeholder/400/250',
//   },
//   {
//     id: 3,
//     title: 'Urban Farming Revolution',
//     excerpt: 'Transforming city spaces into sustainable food sources...',
//     date: '2024-02-15',
//     imageUrl: '/api/placeholder/400/250',
//   },
// ];

// const HomePage: React.FC = () => {
//   return (
//     <>
//       {/* Hero Section */}
//       <div
//         id="home"
//         className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-24 transition-colors"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl md:text-7xl mb-8">
//               Fund the Future of Our Planet
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
//               Join a community of environmental changemakers and launch your own climate action campaign. Together, we can make a difference.
//             </p>
//             <Link
//               to="/start-campaign"
//               className="inline-flex items-center px-8 py-4 text-xl font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-200 group"
//             >
//               Start Your Campaign
//               <Leaf className="ml-2 h-6 w-6 group-hover:rotate-12 transition-transform duration-200" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Impact Calculators Section */}
//       <div id="calculators" className="bg-white dark:bg-gray-800 py-16">
//         <ClimateImpactCalculator />
//       </div>

//       {/* Blog Section */}
//       <div id="blog" className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-24 transition-colors">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//               Latest from Our Blog
//             </h2>
//             <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
//               Stay informed about climate action and environmental innovation
//             </p>
//           </div>
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {blogPosts.map((post) => (
//               <article
//                 key={post.id}
//                 className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden"
//               >
//                 <img
//                   src={post.imageUrl}
//                   alt={post.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <p className="text-sm text-green-600 dark:text-green-400">
//                     {post.date}
//                   </p>
//                   <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
//                     {post.title}
//                   </h3>
//                   <p className="mt-3 text-gray-500 dark:text-gray-300">
//                     {post.excerpt}
//                   </p>
//                   <div className="mt-4">
//                     <a
//                       href={`/blog/${post.id}`}
//                       className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
//                     >
//                       Read more <ArrowRight className="ml-2 h-4 w-4" />
//                     </a>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* NASA Climate Data Sections */}
//       <div id = "actnow" className="bg-gray-900 dark:bg-black py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Real-Time Climate Impact Section */}
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-white sm:text-4xl">
//               Real-Time Climate Impact
//             </h2>
//             <p className="mt-3 text-lg text-gray-300">
//               Track global temperature changes and understand why immediate
//               action is crucial.
//             </p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-16">
//             <iframe
//               src="https://climate.nasa.gov/earth-now/#/vital-signs/air-temperature/airs-infrared-surface-3day"
//               className="w-full h-[600px] border-0"
//               title="NASA Climate Change and Global Warming Vital Signs"
//             />
//           </div>

//           {/* Climate Time Machine Section */}
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-white sm:text-4xl">
//               Climate Time Machine
//             </h2>
//             <p className="mt-3 text-lg text-gray-300">
//               Visualize how our planet has changed over time and see the impact
//               of climate change.
//             </p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
//             <iframe
//               src="https://climate.nasa.gov/interactives/climate-time-machine"
//               className="w-full h-[600px] border-0"
//               title="NASA Climate Time Machine"
//             />
//           </div>

//           <div className="mt-8 text-center">
//             <p className="text-gray-400 text-sm">
//               Data provided by NASA's Global Climate Change Vital Signs of the
//               Planet
//             </p>
//             <a
//               href="https://climate.nasa.gov"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block mt-2 text-green-400 hover:text-green-300 transition-colors"
//             >
//               Learn more at NASA Climate Change
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer id = "footer" className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold mb-4">About EcoRise</h3>
//               <p className="text-gray-400">
//                 Empowering environmental change through community-driven funding
//                 and action.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a href="#home" className="text-gray-400 hover:text-white">
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#about" className="text-gray-400 hover:text-white">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#calculators"
//                     className="text-gray-400 hover:text-white"
//                   >
//                     Impact Calculators
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#blog" className="text-gray-400 hover:text-white">
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>Email: contact@ecorise.com</li>
//                 <li>Phone: (555) 123-4567</li>
//                 <li>Address: 123 Green Street</li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
//                 />
//                 <button className="px-4 py-2 bg-green-600 rounded-r-lg hover:bg-green-700 transition-colors">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
//             <p>
//               &copy; {new Date().getFullYear()} EcoRise. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default HomePage;
