import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

interface Props {
  navigation: any;
  route: {
    params: {
      doctorName: string;
      date: string;
      time: string;
      location: string;
    };
  };
}

const BookingSuccessScreen = ({ navigation, route }: Props) => {
  const { doctorName, date, time, location } = route.params;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim]);

  const details = [
    { icon: 'person', label: 'Doctor', value: doctorName },
    { icon: 'event', label: 'Date', value: date },
    { icon: 'access-time', label: 'Time', value: time },
    { icon: 'location-on', label: 'Location', value: location },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.successIcon, { transform: [{ scale: scaleAnim }] }]}>
          <MaterialIcons name="check-circle" size={RFValue(80)} color={COLORS.titleGreen} />
        </Animated.View>

        <Animated.View style={[styles.textSection, { opacity: fadeAnim }]}>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtext}>
            Your appointment has been successfully booked. You'll receive a confirmation SMS shortly.
          </Text>
        </Animated.View>

        <Animated.View style={[styles.detailsCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Appointment Details</Text>
          {details.map(detail => (
            <View key={detail.label} style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <MaterialIcons name={detail.icon} size={RFValue(18)} color={COLORS.primary} />
              </View>
              <View style={styles.detailTexts}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.paymentCard, { opacity: fadeAnim }]}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Consultation Fee</Text>
            <Text style={styles.paymentValue}>₹800</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Platform Fee</Text>
            <Text style={styles.paymentValue}>₹50</Text>
          </View>
          <View style={[styles.paymentRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹850</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.actions, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.viewBookingsBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Bookings')}
          >
            <Text style={styles.viewBookingsBtnText}>View My Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgColor },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    marginTop: 40,
    marginBottom: 20,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(24),
    color: COLORS.black,
    marginBottom: 8,
  },
  successSubtext: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(14),
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: RFValue(20),
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(15),
    color: COLORS.black,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  detailIcon: {
    width: RFValue(36),
    height: RFValue(36),
    borderRadius: RFValue(10),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailTexts: { flex: 1 },
  detailLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    color: COLORS.textGray,
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(14),
    color: COLORS.black,
  },
  paymentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    marginBottom: 0,
  },
  paymentLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(13),
    color: COLORS.textGray,
  },
  paymentValue: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.black,
  },
  totalLabel: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(14),
    color: COLORS.black,
  },
  totalValue: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(16),
    color: COLORS.primary,
  },
  actions: {
    width: '100%',
    gap: 10,
  },
  viewBookingsBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  viewBookingsBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(15),
    color: COLORS.white,
  },
  homeBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  homeBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(15),
    color: COLORS.primary,
  },
});

export default React.memo(BookingSuccessScreen);
