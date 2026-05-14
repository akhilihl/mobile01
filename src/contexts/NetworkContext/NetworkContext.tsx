import React, { createContext, useState } from 'react';

interface NetworkContextValue {
  isConnected: boolean;
  loader: boolean;
  setIsConnected: (value: boolean) => void;
  setLoader: (value: boolean) => void;
}

export const NetworkContext = createContext<NetworkContextValue>({
  isConnected: false,
  loader: false,
  setIsConnected: () => null,
  setLoader: () => null,
});

interface Props {
  children: React.ReactNode;
}

const NetworkProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [loader, setLoader] = useState(false);

  const value: NetworkContextValue = { isConnected, loader, setIsConnected, setLoader };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export default React.memo(NetworkProvider);
