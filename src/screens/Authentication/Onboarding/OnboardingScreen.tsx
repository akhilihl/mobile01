import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import authStyles from '../../../constants/authenticationStyles';
import { COLORS, DEVICE_TYPE, FONTS, RFValue } from '../../../constants/constants';
import { StoreValue } from '../../../utils/storageUtils';

// Replace with your own onboarding image:
// import ONBOARDING from '../../../assets/images/Onboarding.png';

interface Props {
  onAuthState: () => void;
}

const OnboardingScreen = ({ onAuthState }: Props) => {
  return (
    <View style={[authStyles.onboardContainer, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
      <StatusBar backgroundColor="transparent" barStyle="default" translucent />
      {/* Replace the View below with ImageBackground once you have an image:
          <ImageBackground source={ONBOARDING} style={{ width: '100%', height: '100%' }}> */}
      <View style={{ flex: 1, backgroundColor: COLORS.primary, padding: 16, paddingTop: 56 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 80 }}>
          <Text style={{ color: COLORS.white, fontFamily: FONTS.EXTRABOLD, fontSize: RFValue(36) }}>
            Welcome to{DEVICE_TYPE.isMobile && '\n'} HCare
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.REGULAR,
              fontSize: RFValue(15),
              lineHeight: RFValue(22),
              fontWeight: '400',
              marginTop: 12,
            }}
          >
            Your trusted healthcare companion
          </Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            await StoreValue('initial', 'initial');
            onAuthState();
          }}
          style={authStyles.btnContainer}
        >
          <View style={authStyles.btnView}>
            <MaterialIcons name="arrow-forward" size={RFValue(26)} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

export default React.memo(OnboardingScreen);
