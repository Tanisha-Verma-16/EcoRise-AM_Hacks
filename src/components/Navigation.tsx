import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Calculator, Users, Mail, GamepadIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';


const Navigation: React.FC = () => {
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                EcoRise
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex ml-10 space-x-8">
              <a
                href="#actnow"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
              >
                <Users className="h-4 w-4" />
                <span>Act Now</span>
              </a>

              <a
                href="#footer"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
              >
                <Mail className="h-4 w-4" />
                <span>Contact</span>
              </a>

              <Link
                to="/fun"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
              >
                <GamepadIcon className="h-4 w-4" />
                <span>Fun</span>
              </Link>

              <a
                href="#calculators"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
              >
                <Calculator className="h-4 w-4" />
                <span>Impact Calculators</span>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
          </div>
        </div>
      </div>
     
    </nav>
  );
};

export default Navigation;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { TrendingUp, Calculator, Users, Mail } from 'lucide-react';
// import ThemeToggle from './ThemeToggle';
// import { useAuth } from '../context/AuthContext';
// import UserMenu from './UserMenu';
// import AuthModal from './AuthModal';

// const Navigation: React.FC = () => {
//   const { user } = useAuth();
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

//   return (
//     <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-500" />
//               <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
//                 EcoRise
//               </span>
//             </Link>

//             {/* Navigation Links */}
//             <div className="hidden md:flex ml-10 space-x-8">
//               <a
//                 href="#actnow"
//                 className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
//               >
//                 <Users className="h-4 w-4" />
//                 <span>Act Now</span>
//               </a>

//               <a
//                 href="#footer"
//                 className="bg-gray-900 text-white py-1"
//               >
//                 <Mail className="h-4 w-5" />
//                 <span>Contact</span>
//               </a>

//               <Link
//                 to="/fun"
//                 className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
//               >
//                 <Users className="h-4 w-4" />
//                 <span>Fun</span>
//               </Link>

//               <a
//                 href="#calculators"
//                 className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
//               >
//                 <Calculator className="h-4 w-4" />
//                 <span>Impact Calculators</span>
//               </a>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <ThemeToggle />
//             {user ? (
//               <>
//                 <button className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 font-medium transition-colors">
//                   Start Campaign
//                 </button>
//                 <UserMenu />
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={() => setIsAuthModalOpen(true)}
//                   className="px-4 py-2 rounded-full text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 font-medium transition-colors"
//                 >
//                   Sign In
//                 </button>
//                 <button
//                   onClick={() => setIsAuthModalOpen(true)}
//                   className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 font-medium transition-colors"
//                 >
//                   Start Campaign
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       <AuthModal
//         isOpen={isAuthModalOpen}
//         onClose={() => setIsAuthModalOpen(false)}
//       />
//     </nav>
//   );
// };

// export default Navigation;
// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { TrendingUp, Calculator, Users, Mail } from 'lucide-react';
// // import ThemeToggle from './ThemeToggle';
// // import { useAuth } from '../context/AuthContext';
// // import UserMenu from './UserMenu';
// // import AuthModal from './AuthModal';

// // const Navigation: React.FC = () => {
// //   const { user } = useAuth();
// //   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

// //   return (
// //     <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-16 items-center">
// //           <div className="flex items-center">
// //             <Link to="/" className="flex items-center">
// //               <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-500" />
// //               <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
// //                 EcoRise
// //               </span>
// //             </Link>

// //             {/* Navigation Links */}
// //             <div className="hidden md:flex ml-10 space-x-8">
// //               <Link
// //                 to="/about"
// //                 className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
// //               >
// //                 <Users className="h-4 w-4" />
// //                 <span>Learn</span>
// //               </Link>

// //               <Link
// //                 to="/about"
// //                 className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
// //               >
// //                 <Users className="h-4 w-4" />
// //                 <span>Contact Us</span>
// //               </Link>

// //               <Link
// //                 to="/contact"
// //                 className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
// //               >
// //                 <Mail className="h-4 w-4" />
// //                 <span>Fun</span>
// //               </Link>

// //               <Link
// //                 to="/calculators"
// //                 className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 flex items-center space-x-1"
// //               >
// //                 <Calculator className="h-4 w-4" />
// //                 <span>Impact Calculators</span>
// //               </Link>
// //             </div>
// //           </div>

// //           <div className="flex items-center space-x-4">
// //             <ThemeToggle />
// //             {user ? (
// //               <>
// //                 <button className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 font-medium transition-colors">
// //                   Start Campaign
// //                 </button>
// //                 <UserMenu />
// //               </>
// //             ) : (
// //               <>
// //                 <button
// //                   onClick={() => setIsAuthModalOpen(true)}
// //                   className="px-4 py-2 rounded-full text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 font-medium transition-colors"
// //                 >
// //                   Sign In
// //                 </button>
// //                 <button
// //                   onClick={() => setIsAuthModalOpen(true)}
// //                   className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 font-medium transition-colors"
// //                 >
// //                   Start Campaign
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //       <AuthModal
// //         isOpen={isAuthModalOpen}
// //         onClose={() => setIsAuthModalOpen(false)}
// //       />
// //     </nav>
// //   );
// // };

// // export default Navigation;
