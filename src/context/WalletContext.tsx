import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = () => {
    // Simulate wallet connection
    setIsConnected(true);
    setAddress('0x1234567890abcdef1234567890abcdef12345678');
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{ isConnected, address, connect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
