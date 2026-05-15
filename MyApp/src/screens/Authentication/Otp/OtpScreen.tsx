// Required packages (install if missing):
//   npm install react-native-confirmation-code-field
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import PrimaryButton from '../../../components/button/PrimaryButton';
import PrimaryHeader from '../../../components/header/PrimaryHeader';
import SnackBar from '../../../components/snackBar/SnackBar';
import authStyles from '../../../constants/authenticationStyles';
import { COLORS, FONTS, isTablet, RFValue } from '../../../constants/constants';
import { useSignUpMutation } from '../../../redux/api/authApi';
import { setUser } from '../../../redux/reducers/userReducer';
import { setToken } from '../../../redux/reducers/tokenReducer';
import { StoreValue } from '../../../utils/storageUtils';
import { AuthStackParamList } from '../../../navigation/StackNavigation/authStack/AuthStack';
import { AppDispatch } from '../../../redux/store/store';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTPScreen'> & {
  onAuthState: () => void;
};

const CELL_COUNT = 6;

const OtpScreen = ({ navigation, route, onAuthState }: Props) => {
  const { phone, phone_number, country_code, method } = route.params;
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackVisible, setSnackVisible] = useState({ show: false, content: '' });

  const dispatch = useDispatch<AppDispatch>();
  const [postData] = useSignUpMutation();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResendOTP = async () => {
    setTimer(60);
    setSnackVisible({ show: true, content: 'OTP resent to your mobile' });
    setTimeout(() => setSnackVisible({ show: false, content: '' }), 1500);
  };

  const handleVerify = async (val: string) => {
    if (val.length !== CELL_COUNT) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    const payload = { phone_number, otp: val, method, country_code };
    const result = await postData(payload) as {
      data?: { success?: boolean; access_token?: string; message?: string; data?: Record<string, unknown> };
      error?: { data?: { detail?: { message?: string } } };
    };

    if (result?.data?.success) {
      const accessToken = result.data.access_token ?? '';
      const user = result.data.data ?? {};
      await StoreValue(accessToken, 'accessToken');
      await StoreValue(user, 'user');
      dispatch(setToken(accessToken));
      dispatch(setUser(user));
      setSnackVisible({ show: true, content: result.data.message ?? 'Verified successfully' });
      setTimeout(() => {
        setLoading(false);
        setSnackVisible({ show: false, content: '' });
        onAuthState();
      }, 1500);
    } else {
      setLoading(false);
      setError(
        result?.error?.data?.detail?.message ?? 'Invalid OTP. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" translucent={false} />
      <PrimaryHeader onPress={() => navigation.goBack()} />
      <View style={authStyles.otpContainer}>
        <Text style={authStyles.welcomeTitle}>OTP Verification</Text>
        <Text style={authStyles.welcomeText}>
          Please enter the OTP received to
          <Text style={authStyles.phoneNumTxt}> {phone}</Text>
        </Text>

        {/* OTP boxes */}
        <View style={styles.otpRow}>
          {Array.from({ length: CELL_COUNT }).map((_, i) => (
            <View
              key={i}
              style={[
                authStyles.cell,
                otp.length === i && styles.activeCell,
                error ? { borderColor: COLORS.error } : null,
              ]}
            >
              <Text style={authStyles.cellText}>{otp[i] ?? ''}</Text>
            </View>
          ))}
          {/* Hidden full-width input captures all digits */}
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={otp}
            onChangeText={val => {
              setError(null);
              const digits = val.replace(/\D/g, '').slice(0, CELL_COUNT);
              setOtp(digits);
              if (digits.length === CELL_COUNT) { handleVerify(digits); }
            }}
            keyboardType="number-pad"
            maxLength={CELL_COUNT}
            autoFocus
          />
        </View>

        {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

        {timer > 0 ? (
          <Text style={authStyles.messageTxt}>
            Resend OTP in 0:{timer.toString().padStart(2, '0')} seconds
          </Text>
        ) : (
          <View style={[authStyles.rowView, { justifyContent: 'center' }]}>
            <Text style={authStyles.messageTxt}>Didn't receive the OTP?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleResendOTP}>
              <Text style={[authStyles.messageTxt, authStyles.resendTxt]}> Resend OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ marginTop: 32 }}>
          <PrimaryButton
            title="Verify OTP"
            onPress={() => handleVerify(otp)}
            disabled={otp.length !== CELL_COUNT}
            isLoading={loading}
          />
        </View>

        {snackVisible.show ? (
          <View style={{ position: 'absolute', bottom: Platform.OS === 'ios' ? 0 : 10, alignSelf: 'center', width: isTablet ? '90%' : '100%' }}>
            <SnackBar
              content={snackVisible.content}
              _onPress={() => setSnackVisible({ show: false, content: '' })}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activeCell: { borderColor: COLORS.primary, borderWidth: 2 },
  hiddenInput: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default React.memo(OtpScreen);
