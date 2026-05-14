import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

export interface Doctor {
  id: string;
  name: string;
  designation: string;
  location: string;
  rating: number;
  reviewCount: number;
  available?: boolean;
  fee?: number;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookPress?: (doctor: Doctor) => void;
  horizontal?: boolean;
}

const DoctorCard = ({ doctor, onBookPress, horizontal }: DoctorCardProps) => {
  const initials = doctor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={[styles.card, horizontal && styles.cardHorizontal]}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{doctor.name}</Text>
        <Text style={styles.designation} numberOfLines={1}>{doctor.designation}</Text>

        <View style={styles.row}>
          <MaterialIcons name="location-on" size={RFValue(12)} color={COLORS.textGray} />
          <Text style={styles.location} numberOfLines={1}>{doctor.location}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={RFValue(13)} color="#F59E0B" />
            <Text style={styles.rating}>{doctor.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({doctor.reviewCount})</Text>
          </View>

          <TouchableOpacity
            style={styles.bookBtn}
            activeOpacity={0.8}
            onPress={() => onBookPress?.(doctor)}
          >
            <Text style={styles.bookBtnText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  cardHorizontal: {
    width: 220,
    marginBottom: 0,
    marginRight: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: RFValue(52),
    height: RFValue(52),
    borderRadius: RFValue(26),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  initials: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(18),
    color: COLORS.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(14),
    color: COLORS.black,
    marginBottom: 2,
  },
  designation: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    color: COLORS.textGray,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(11),
    color: COLORS.textGray,
    marginLeft: 2,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(12),
    color: COLORS.black,
    marginLeft: 2,
  },
  reviews: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(11),
    color: COLORS.textGray,
  },
  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bookBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(12),
    color: COLORS.white,
  },
});

export default React.memo(DoctorCard);
