import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Leaf } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { formatAddress } from '../lib/utils';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                EcoRise
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {isConnected ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  {formatAddress(address!)}
                </button>
              </>
            ) : (
              <button
                onClick={connect}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
