import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux/store/store';
import NetworkProvider from './src/contexts/NetworkContext/NetworkContext';
import StackNavigator from './src/navigation/StackNavigation/index';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NetworkProvider>
          <StackNavigator />
        </NetworkProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
