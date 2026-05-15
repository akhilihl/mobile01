import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

export interface VitalData {
  id: string;
  label: string;
  value: string;
  unit: string;
  iconName: string;
  iconColor: string;
  iconBgColor: string;
  status?: 'normal' | 'high' | 'low';
  lastUpdated?: string;
}

interface VitalCardProps {
  vital: VitalData;
}

const STATUS_COLORS = {
  normal: COLORS.titleGreen,
  high: COLORS.titleRed,
  low: COLORS.warning,
};

const VitalCard = ({ vital }: VitalCardProps) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: vital.iconBgColor }]}>
        <MaterialIcons name={vital.iconName} size={RFValue(20)} color={vital.iconColor} />
      </View>
      <Text style={styles.label} numberOfLines={1}>{vital.label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{vital.value}</Text>
        <Text style={styles.unit}>{vital.unit}</Text>
      </View>
      {vital.status && (
        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[vital.status] + '20' }]}>
          <Text style={[styles.statusText, { color: STATUS_COLORS[vital.status] }]}>
            {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrapper: {
    width: RFValue(44),
    height: RFValue(44),
    borderRadius: RFValue(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(11),
    color: COLORS.textGray,
    textAlign: 'center',
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  value: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(18),
    color: COLORS.black,
  },
  unit: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(11),
    color: COLORS.textGray,
  },
  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(10),
  },
});

export default React.memo(VitalCard);
