// Required packages (install if missing):
//   npm install @react-native-community/netinfo
import React, { useContext, useEffect } from 'react';
import { Modal, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NetworkContext } from '../../../contexts/NetworkContext/NetworkContext';
import OfflineModal from '../../../components/Modal/OfflineModal';
import OnboardingScreen from '../../../screens/Authentication/Onboarding/OnboardingScreen';
import SignInScreen from '../../../screens/Authentication/SignIn/SignInScreen';
import OtpScreen from '../../../screens/Authentication/Otp/OtpScreen';
import { COLORS } from '../../../constants/constants';

export type AuthStackParamList = {
  SignInScreen: undefined;
  OTPScreen: {
    phone: string;
    phone_number: string;
    country_code: string;
    method: string;
    otp?: string;
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface Props {
  onAuthState: () => void;
}

const AuthStack = ({ onAuthState }: Props) => {
  const { isConnected, loader, setLoader, setIsConnected } = useContext(NetworkContext);

  // Uncomment and install @react-native-community/netinfo to enable:
  // useEffect(() => {
  //   const unsub = NetInfo.addEventListener(() => {
  //     setLoader(true);
  //     setTimeout(() => {
  //       setLoader(false);
  //       NetInfo.addEventListener(state => {
  //         setIsConnected(!(state.isConnected && state.isInternetReachable));
  //       });
  //     }, 1500);
  //   });
  //   return () => unsub();
  // }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bgColor2 }}>
      <Modal visible={isConnected} statusBarTranslucent={false}>
        <OfflineModal
          loader={loader}
          offlinePress={() => {
            setIsConnected(false);
          }}
        />
      </Modal>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignInScreen" options={{ animation: 'slide_from_bottom' }}>
            {props => <SignInScreen {...props} onAuthState={onAuthState} />}
          </Stack.Screen>
          <Stack.Screen name="OTPScreen" options={{ animation: 'slide_from_right' }}>
            {props => <OtpScreen {...props} onAuthState={onAuthState} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default React.memo(AuthStack);
