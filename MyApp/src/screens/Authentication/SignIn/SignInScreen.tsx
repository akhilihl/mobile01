// Required packages (install if missing):
//   npm install formik yup
//   npm install react-native-country-codes-picker
//   npm install google-libphonenumber
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useDispatch } from 'react-redux';
import PrimaryButton from '../../../components/button/PrimaryButton';
import PrimaryInput from '../../../components/input/PrimaryInput';
import SnackBar from '../../../components/snackBar/SnackBar';
import authStyles from '../../../constants/authenticationStyles';
import { COLORS, isTablet, RFValue } from '../../../constants/constants';
import { useSignInMutation } from '../../../redux/api/authApi';
import { setToken } from '../../../redux/reducers/tokenReducer';
import { setUser } from '../../../redux/reducers/userReducer';
import { StoreValue } from '../../../utils/storageUtils';
import { AuthStackParamList } from '../../../navigation/StackNavigation/authStack/AuthStack';
import { AppDispatch } from '../../../redux/store/store';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignInScreen'> & {
  onAuthState: () => void;
};

interface SnackState {
  show: boolean;
  content: string;
  disabled: boolean;
}

const SignInScreen = ({ navigation, onAuthState }: Props) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode] = useState('+91');
  const [loading, setLoading] = useState(false);
  const [snackVisible, setSnackVisible] = useState<SnackState>({
    show: false,
    content: '',
    disabled: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const [postData] = useSignInMutation();

  const hideSnack = () => {
    setTimeout(() => setSnackVisible({ show: false, content: '', disabled: true }), 1500);
  };

  const handleSignInSubmit = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setSnackVisible({ show: true, content: 'Enter a valid mobile number', disabled: true });
      hideSnack();
      return;
    }
    Keyboard.dismiss();

    // Dev bypass — skip API call and go straight to app
    if (mobileNumber.replace(/\D/g, '') === '1234512345') {
      const mockToken = 'dev-token-bypass';
      const mockUser = { name: 'Dev User', phone: '1234512345', email: 'dev@hcare.com' };
      await StoreValue(mockToken, 'accessToken');
      await StoreValue(mockUser, 'user');
      dispatch(setToken(mockToken));
      dispatch(setUser(mockUser));
      onAuthState();
      return;
    }
    setLoading(true);

    const payload = {
      method: 'login',
      phone_number: mobileNumber.replace(/\D/g, ''),
      country_code: countryCode,
    };

    const result = await postData(payload) as { data?: { success: boolean; data?: { otp?: string } }; error?: { data?: { detail?: { message?: string } } } };

    if (result?.data?.success) {
      setSnackVisible({ show: true, content: 'OTP sent successfully', disabled: false });
      setLoading(false);
      setTimeout(() => {
        setSnackVisible({ show: false, content: '', disabled: true });
        navigation.navigate('OTPScreen', {
          phone: `${countryCode} ${mobileNumber}`,
          phone_number: mobileNumber,
          country_code: countryCode,
          method: 'login',
          otp: result?.data?.data?.otp,
        });
      }, 1500);
    } else {
      setLoading(false);
      setSnackVisible({
        show: true,
        content: result?.error?.data?.detail?.message ?? 'Something went wrong',
        disabled: true,
      });
      hideSnack();
    }
  };

  return (
    <View style={authStyles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1, ...authStyles.content }}>
          <View style={[authStyles.signInContainer, { paddingBottom: Platform.OS === 'ios' ? 0 : 16 }]}>
            <View style={{ paddingVertical: 40 }}>
              {/* Replace with your logo: <YourLogo width={66} height={32} /> */}
              <Text style={{ fontFamily: 'bold', fontSize: RFValue(24), color: COLORS.primary }}>
                HCare
              </Text>
            </View>
            <View>
              <Text style={authStyles.welcomeTitle}>Welcome back!</Text>
              <Text style={authStyles.welcomeText}>
                Login to access your healthcare dashboard.
              </Text>
            </View>
            <View style={authStyles.inputContainer}>
              <View>
                <PrimaryInput
                  label="Mobile Number"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  onBlur={() => {}}
                  inputtype="phone-pad"
                  maxLength={15}
                  editable
                />
                <PrimaryButton
                  title="Login"
                  onPress={handleSignInSubmit}
                  disabled={mobileNumber.length < 10 || loading}
                  isLoading={loading}
                  otherstyles={{ marginTop: 32, paddingVertical: RFValue(16) }}
                />
              </View>
              <View style={[authStyles.accountContainer]}>
                <Text style={[authStyles.messageTxt, { color: COLORS.black }]}>
                  Don't have an account?
                </Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={[authStyles.messageTxt, authStyles.resendTxt]}>
                    {' '}Contact Admin
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {snackVisible.show ? (
              <View
                style={{
                  position: 'absolute',
                  bottom: Platform.OS === 'ios' ? 0 : 10,
                  alignSelf: 'center',
                  width: isTablet ? '90%' : '100%',
                }}
              >
                <SnackBar
                  content={snackVisible.content}
                  error={snackVisible.disabled ? 'error' : undefined}
                  _onPress={() => setSnackVisible({ show: false, content: '', disabled: true })}
                />
              </View>
            ) : null}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default React.memo(SignInScreen);
