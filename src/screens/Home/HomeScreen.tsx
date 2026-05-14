import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../../components/AppHeader/AppHeader';
import QuickServices from '../../components/QuickServices/QuickServices';
import DoctorCard, { Doctor } from '../../components/DoctorCard/DoctorCard';
import AppointmentCard, { Appointment } from '../../components/AppointmentCard/AppointmentCard';
import { COLORS, FONTS, RFValue } from '../../constants/constants';
import { RootState } from '../../redux/store/store';

const MOCK_UPCOMING: Appointment = {
  id: '1',
  doctorName: 'Dr. Priya Sharma',
  doctorDesignation: 'Cardiologist',
  date: 'Tomorrow, 15 Jan 2025',
  time: '10:30 AM',
  location: 'Apollo Hospital, Chennai',
  type: 'in-person',
  status: 'confirmed',
};

const MOCK_DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Arjun Mehta', designation: 'General Physician', location: 'Fortis Hospital', rating: 4.8, reviewCount: 124 },
  { id: '2', name: 'Dr. Priya Sharma', designation: 'Cardiologist', location: 'Apollo Hospital', rating: 4.9, reviewCount: 98 },
  { id: '3', name: 'Dr. Ravi Kumar', designation: 'Orthopedist', location: 'MIOT Hospital', rating: 4.7, reviewCount: 213 },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) { return 'Good morning'; }
  if (hour < 17) { return 'Good afternoon'; }
  return 'Good evening';
};

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
  const [searchText, setSearchText] = useState('');
  const user = useSelector((state: RootState) => state.userState.user);
  const userName = (user as any)?.name ?? 'there';

  const handleBookAppointment = (_doctor: Doctor) => {
    navigation.navigate('BookAppointment');
  };

  const handleServicePress = (service: { label: string }) => {
    if (service.label.includes('Appointment')) {
      navigation.navigate('BookAppointment');
    } else if (service.label === 'My Vitals') {
      navigation.navigate('Reports');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        showMenu={false}
        onNotificationPress={() => navigation.navigate('Notifications')}
        notificationCount={3}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{getGreeting()}, {userName}! 👋</Text>
          <Text style={styles.greetingSubtext}>How are you feeling today?</Text>
        </View>

        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={RFValue(20)} color={COLORS.textGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialities..."
            placeholderTextColor={COLORS.textGray}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <MaterialIcons name="close" size={RFValue(18)} color={COLORS.textGray} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Bookings')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <AppointmentCard
            appointment={MOCK_UPCOMING}
            tab="upcoming"
            onViewDetails={() => navigation.navigate('Bookings')}
            onReschedule={() => navigation.navigate('BookAppointment')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <View style={styles.quickServicesCard}>
            <QuickServices onServicePress={handleServicePress} />
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 24 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Doctors</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BookAppointment')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {MOCK_DOCTORS.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookPress={handleBookAppointment}
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  greetingSection: {
    marginBottom: 16,
  },
  greeting: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(22),
    color: COLORS.black,
    marginBottom: 4,
  },
  greetingSubtext: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(14),
    color: COLORS.textGray,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(14),
    color: COLORS.black,
    padding: 0,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(16),
    color: COLORS.black,
  },
  seeAll: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.primary,
  },
  quickServicesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default React.memo(HomeScreen);
