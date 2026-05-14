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
import AppointmentCard, { Appointment } from '../../components/AppointmentCard/AppointmentCard';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

type TabType = 'upcoming' | 'completed' | 'cancelled';

const MOCK_UPCOMING: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Priya Sharma',
    doctorDesignation: 'Cardiologist',
    date: 'Tomorrow, 15 Jan 2025',
    time: '10:30 AM',
    location: 'Apollo Hospital, Chennai',
    type: 'in-person',
    status: 'confirmed',
  },
  {
    id: '2',
    doctorName: 'Dr. Arjun Mehta',
    doctorDesignation: 'General Physician',
    date: 'Wed, 17 Jan 2025',
    time: '3:00 PM',
    location: 'Fortis Hospital, Bangalore',
    type: 'teleconsult',
    status: 'confirmed',
  },
];

const MOCK_COMPLETED: Appointment[] = [
  {
    id: '3',
    doctorName: 'Dr. Ravi Kumar',
    doctorDesignation: 'Orthopedist',
    date: 'Mon, 8 Jan 2025',
    time: '11:00 AM',
    location: 'MIOT Hospital, Chennai',
    type: 'in-person',
    status: 'completed',
  },
];

const MOCK_CANCELLED: Appointment[] = [
  {
    id: '4',
    doctorName: 'Dr. Sita Devi',
    doctorDesignation: 'Dermatologist',
    date: 'Sat, 5 Jan 2025',
    time: '9:30 AM',
    location: 'Skin Care Clinic, Hyderabad',
    type: 'in-person',
    status: 'cancelled',
  },
];

const QUICK_ACTIONS = [
  { id: 'teleconsult', label: 'Teleconsult', iconName: 'videocam', color: '#0284C7', bgColor: '#E0F2FE' },
  { id: 'lab', label: 'Lab Tests', iconName: 'science', color: '#16A34A', bgColor: '#F0FDF4' },
  { id: 'homecare', label: 'Home Care', iconName: 'home', color: '#E11D48', bgColor: '#FFF1F2' },
];

interface Props {
  navigation: any;
}

const BookingsScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const getAppointments = () => {
    switch (activeTab) {
      case 'upcoming': return MOCK_UPCOMING;
      case 'completed': return MOCK_COMPLETED;
      case 'cancelled': return MOCK_CANCELLED;
    }
  };

  const appointments = getAppointments();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="My Bookings"
        showMenu={false}
        showNotification={false}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.ctaCard}>
          <View>
            <Text style={styles.ctaTitle}>Need to see a doctor?</Text>
            <Text style={styles.ctaSubtitle}>Book an appointment in seconds</Text>
          </View>
          <TouchableOpacity
            style={styles.ctaBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('BookAppointment')}
          >
            <Text style={styles.ctaBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionItem, { backgroundColor: action.bgColor }]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('BookAppointment')}
            >
              <MaterialIcons name={action.iconName} size={RFValue(20)} color={action.color} />
              <Text style={[styles.quickActionLabel, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabBar}>
          {(['upcoming', 'completed', 'cancelled'] as TabType[]).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.appointmentsList}>
          {appointments.length > 0 ? (
            appointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                tab={activeTab}
                onViewDetails={() => {}}
                onReschedule={() => navigation.navigate('BookAppointment')}
                onJoin={() => {}}
                onCancel={() => {}}
                onRebook={() => navigation.navigate('BookAppointment')}
                onViewPrescription={() => navigation.navigate('PrescriptionDetail', { prescriptionId: appointment.id })}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="event-busy" size={RFValue(48)} color={COLORS.textGray} />
              <Text style={styles.emptyTitle}>No {activeTab} appointments</Text>
              <Text style={styles.emptySubtext}>Your {activeTab} bookings will appear here</Text>
            </View>
          )}
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
  ctaCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(15),
    color: COLORS.white,
    marginBottom: 4,
  },
  ctaSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    color: 'rgba(255,255,255,0.8)',
  },
  ctaBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  ctaBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(13),
    color: COLORS.primary,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  quickActionLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(11),
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.textGray,
  },
  activeTabText: {
    color: COLORS.white,
    fontFamily: FONTS.SEMIBOLD,
  },
  appointmentsList: {
    gap: 0,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(16),
    color: COLORS.darkGray,
  },
  emptySubtext: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(13),
    color: COLORS.textGray,
    textAlign: 'center',
  },
});

export default React.memo(BookingsScreen);
