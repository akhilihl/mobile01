import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

interface Service {
  id: string;
  label: string;
  iconName: string;
  bgColor: string;
  iconColor: string;
}

const SERVICES: Service[] = [
  { id: '1', label: 'Book\nAppointment', iconName: 'event', bgColor: '#EEF0FF', iconColor: '#6C63FF' },
  { id: '2', label: 'Teleconsult', iconName: 'videocam', bgColor: '#E0F2FE', iconColor: '#0284C7' },
  { id: '3', label: 'Lab Tests', iconName: 'science', bgColor: '#F0FDF4', iconColor: '#16A34A' },
  { id: '4', label: 'Pharmacy', iconName: 'local-pharmacy', bgColor: '#FEF3C7', iconColor: '#D97706' },
  { id: '5', label: 'Home Care', iconName: 'home', bgColor: '#FFF1F2', iconColor: '#E11D48' },
  { id: '6', label: 'My Vitals', iconName: 'favorite', bgColor: '#FFF7ED', iconColor: '#EA580C' },
  { id: '7', label: 'Emergency', iconName: 'local-hospital', bgColor: '#FEF2F2', iconColor: '#DC2626' },
  { id: '8', label: 'Insurance', iconName: 'health-and-safety', bgColor: '#F0FDF4', iconColor: '#059669' },
];

interface QuickServicesProps {
  onServicePress?: (service: Service) => void;
}

const QuickServices = ({ onServicePress }: QuickServicesProps) => {
  return (
    <View style={styles.grid}>
      {SERVICES.map(service => (
        <TouchableOpacity
          key={service.id}
          style={styles.item}
          activeOpacity={0.75}
          onPress={() => onServicePress?.(service)}
        >
          <View style={[styles.iconWrapper, { backgroundColor: service.bgColor }]}>
            <MaterialIcons name={service.iconName} size={RFValue(24)} color={service.iconColor} />
          </View>
          <Text style={styles.label}>{service.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  iconWrapper: {
    width: RFValue(52),
    height: RFValue(52),
    borderRadius: RFValue(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(11),
    color: COLORS.darkGray,
    textAlign: 'center',
    lineHeight: RFValue(15),
  },
});

export default React.memo(QuickServices);
