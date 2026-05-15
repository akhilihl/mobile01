import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../../components/AppHeader/AppHeader';
import DoctorCard, { Doctor } from '../../components/DoctorCard/DoctorCard';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

const SPECIALITIES = [
  'All', 'General', 'Cardiology', 'Orthopedics', 'Dermatology', 'Neurology', 'Pediatrics',
];

const MOCK_DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Arjun Mehta', designation: 'General Physician', location: 'Fortis Hospital, Bangalore', rating: 4.8, reviewCount: 124, available: true, fee: 500 },
  { id: '2', name: 'Dr. Priya Sharma', designation: 'Cardiologist', location: 'Apollo Hospital, Chennai', rating: 4.9, reviewCount: 98, available: true, fee: 800 },
  { id: '3', name: 'Dr. Ravi Kumar', designation: 'Orthopedist', location: 'MIOT Hospital, Chennai', rating: 4.7, reviewCount: 213, available: false, fee: 700 },
  { id: '4', name: 'Dr. Sita Devi', designation: 'Dermatologist', location: 'Skin Care Clinic, Hyderabad', rating: 4.6, reviewCount: 87, available: true, fee: 600 },
  { id: '5', name: 'Dr. Kiran Reddy', designation: 'Neurologist', location: 'Yashoda Hospital, Hyderabad', rating: 4.8, reviewCount: 156, available: true, fee: 900 },
];

interface Props {
  navigation: any;
}

const BookAppointmentScreen = ({ navigation }: Props) => {
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');

  const filteredDoctors = selectedSpeciality === 'All'
    ? MOCK_DOCTORS
    : MOCK_DOCTORS.filter(d => d.designation.toLowerCase().includes(selectedSpeciality.toLowerCase()));

  const handleBookDoctor = (doctor: Doctor) => {
    navigation.navigate('SelectSlot', {
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorDesignation: doctor.designation,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Book Appointment"
        onBackPress={() => navigation.goBack()}
        showNotification={false}
        showMenu={false}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.filterLabel}>Select Speciality</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chipContent}
        >
          {SPECIALITIES.map(spec => (
            <TouchableOpacity
              key={spec}
              style={[styles.chip, selectedSpeciality === spec && styles.activeChip]}
              activeOpacity={0.8}
              onPress={() => setSelectedSpeciality(spec)}
            >
              <Text style={[styles.chipText, selectedSpeciality === spec && styles.activeChipText]}>
                {spec}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>{filteredDoctors.length} doctors available</Text>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
            <MaterialIcons name="tune" size={RFValue(16)} color={COLORS.primary} />
            <Text style={styles.filterBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 0 }}>
          {filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookPress={handleBookDoctor}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  filterLabel: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(14),
    color: COLORS.black,
    marginBottom: 10,
  },
  chipScroll: {
    marginBottom: 16,
  },
  chipContent: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.darkGray,
  },
  activeChipText: {
    color: COLORS.white,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultsText: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(13),
    color: COLORS.textGray,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  filterBtnText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.primary,
  },
});

export default React.memo(BookAppointmentScreen);
