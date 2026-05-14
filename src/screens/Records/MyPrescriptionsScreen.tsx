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
import { COLORS, FONTS, RFValue } from '../../constants/constants';

type RecordsTab = 'prescriptions' | 'reports';

interface Prescription {
  id: string;
  doctorName: string;
  department: string;
  hospital: string;
  date: string;
  time: string;
  medications: number;
}

interface LabReport {
  id: string;
  testName: string;
  lab: string;
  date: string;
  status: 'ready' | 'pending';
}

const PRESCRIPTIONS: Prescription[] = [
  { id: '1', doctorName: 'Dr. Priya Sharma', department: 'Cardiology', hospital: 'Apollo Hospital', date: '8 Jan 2025', time: '10:30 AM', medications: 3 },
  { id: '2', doctorName: 'Dr. Arjun Mehta', department: 'General Medicine', hospital: 'Fortis Hospital', date: '22 Dec 2024', time: '3:00 PM', medications: 5 },
  { id: '3', doctorName: 'Dr. Ravi Kumar', department: 'Orthopedics', hospital: 'MIOT Hospital', date: '10 Dec 2024', time: '11:00 AM', medications: 2 },
];

const LAB_REPORTS: LabReport[] = [
  { id: '1', testName: 'Complete Blood Count', lab: 'Thyrocare', date: '5 Jan 2025', status: 'ready' },
  { id: '2', testName: 'Lipid Profile', lab: 'SRL Diagnostics', date: '22 Dec 2024', status: 'ready' },
  { id: '3', testName: 'Blood Sugar (HbA1c)', lab: 'Metropolis', date: '10 Dec 2024', status: 'ready' },
  { id: '4', testName: 'Thyroid Profile', lab: 'Thyrocare', date: '20 Jan 2025', status: 'pending' },
];

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

interface Props {
  navigation: any;
}

const MyPrescriptionsScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState<RecordsTab>('prescriptions');

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="My Records"
        showMenu={false}
        showNotification={false}
      />

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'prescriptions' && styles.activeTab]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('prescriptions')}
        >
          <MaterialIcons
            name="description"
            size={RFValue(16)}
            color={activeTab === 'prescriptions' ? COLORS.primary : COLORS.textGray}
          />
          <Text style={[styles.tabText, activeTab === 'prescriptions' && styles.activeTabText]}>
            Prescriptions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'reports' && styles.activeTab]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('reports')}
        >
          <MaterialIcons
            name="science"
            size={RFValue(16)}
            color={activeTab === 'reports' ? COLORS.primary : COLORS.textGray}
          />
          <Text style={[styles.tabText, activeTab === 'reports' && styles.activeTabText]}>
            Lab Reports
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'prescriptions' ? (
          PRESCRIPTIONS.map(rx => (
            <TouchableOpacity
              key={rx.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('PrescriptionDetail', { prescriptionId: rx.id })}
            >
              <View style={styles.cardLeft}>
                <View style={styles.avatar}>
                  <Text style={styles.initials}>{getInitials(rx.doctorName)}</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.doctorName}>{rx.doctorName}</Text>
                  <Text style={styles.dept}>{rx.department} · {rx.hospital}</Text>
                  <View style={styles.metaRow}>
                    <MaterialIcons name="event" size={RFValue(12)} color={COLORS.textGray} />
                    <Text style={styles.meta}>{rx.date}, {rx.time}</Text>
                  </View>
                  <View style={styles.medBadge}>
                    <MaterialIcons name="local-pharmacy" size={RFValue(12)} color={COLORS.primary} />
                    <Text style={styles.medCount}>{rx.medications} medications</Text>
                  </View>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={RFValue(22)} color={COLORS.textGray} />
            </TouchableOpacity>
          ))
        ) : (
          LAB_REPORTS.map(report => (
            <TouchableOpacity
              key={report.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('LabReportDetail', { reportId: report.id })}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.avatar, { backgroundColor: '#F0FDF4' }]}>
                  <MaterialIcons name="science" size={RFValue(22)} color="#16A34A" />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.doctorName}>{report.testName}</Text>
                  <Text style={styles.dept}>{report.lab}</Text>
                  <View style={styles.metaRow}>
                    <MaterialIcons name="event" size={RFValue(12)} color={COLORS.textGray} />
                    <Text style={styles.meta}>{report.date}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: report.status === 'ready' ? '#D1FAE5' : '#FEF3C7' },
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: report.status === 'ready' ? COLORS.titleGreen : COLORS.warning },
                    ]}>
                      {report.status === 'ready' ? 'Report Ready' : 'Pending'}
                    </Text>
                  </View>
                </View>
              </View>
              {report.status === 'ready' && (
                <TouchableOpacity style={styles.downloadBtn}>
                  <MaterialIcons name="download" size={RFValue(20)} color={COLORS.primary} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgColor },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: COLORS.primary },
  tabText: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(13), color: COLORS.textGray },
  activeTabText: { color: COLORS.primary, fontFamily: FONTS.SEMIBOLD },
  scrollContent: { padding: 16, paddingBottom: 24 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLeft: { flex: 1, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  avatar: {
    width: RFValue(48),
    height: RFValue(48),
    borderRadius: RFValue(14),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  initials: { fontFamily: FONTS.BOLD, fontSize: RFValue(16), color: COLORS.primary },
  cardContent: { flex: 1 },
  doctorName: { fontFamily: FONTS.SEMIBOLD, fontSize: RFValue(14), color: COLORS.black, marginBottom: 2 },
  dept: { fontFamily: FONTS.REGULAR, fontSize: RFValue(12), color: COLORS.textGray, marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  meta: { fontFamily: FONTS.REGULAR, fontSize: RFValue(12), color: COLORS.textGray },
  medBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  medCount: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(11), color: COLORS.primary },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: { fontFamily: FONTS.SEMIBOLD, fontSize: RFValue(11) },
  downloadBtn: { padding: 8 },
});

export default React.memo(MyPrescriptionsScreen);
