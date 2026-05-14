import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../../components/AppHeader/AppHeader';
import VitalCard, { VitalData } from '../../components/VitalCard/VitalCard';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

type VitalsTab = 'vitals' | 'insights' | 'recommended';

const VITALS_DATA: VitalData[] = [
  { id: '1', label: 'Height', value: '5\'9"', unit: 'ft', iconName: 'height', iconColor: '#6C63FF', iconBgColor: '#EEF0FF', status: 'normal' },
  { id: '2', label: 'Weight', value: '72', unit: 'kg', iconName: 'fitness-center', iconColor: '#0284C7', iconBgColor: '#E0F2FE', status: 'normal' },
  { id: '3', label: 'BMI', value: '23.4', unit: '', iconName: 'monitor-weight', iconColor: '#16A34A', iconBgColor: '#F0FDF4', status: 'normal' },
  { id: '4', label: 'Blood Pressure', value: '120/80', unit: 'mmHg', iconName: 'favorite', iconColor: '#E11D48', iconBgColor: '#FFF1F2', status: 'normal' },
  { id: '5', label: 'Heart Rate', value: '72', unit: 'bpm', iconName: 'monitor-heart', iconColor: '#DC2626', iconBgColor: '#FEF2F2', status: 'normal' },
  { id: '6', label: 'Blood Sugar', value: '98', unit: 'mg/dL', iconName: 'water-drop', iconColor: '#D97706', iconBgColor: '#FEF3C7', status: 'normal' },
  { id: '7', label: 'Oxygen', value: '98', unit: '%', iconName: 'air', iconColor: '#059669', iconBgColor: '#F0FDF4', status: 'normal' },
  { id: '8', label: 'Temperature', value: '98.6', unit: '°F', iconName: 'thermostat', iconColor: '#EA580C', iconBgColor: '#FFF7ED', status: 'normal' },
  { id: '9', label: 'Cholesterol', value: '180', unit: 'mg/dL', iconName: 'bubble-chart', iconColor: '#7C3AED', iconBgColor: '#EDE9FE', status: 'high' },
];

const INSIGHTS = [
  { id: '1', title: 'Great cardiovascular health', desc: 'Your heart rate and blood pressure are within optimal ranges.', icon: 'thumb-up', color: '#16A34A', bgColor: '#F0FDF4' },
  { id: '2', title: 'Cholesterol slightly elevated', desc: 'Consider reducing saturated fats and increasing fiber intake.', icon: 'warning', color: '#D97706', bgColor: '#FEF3C7' },
  { id: '3', title: 'Excellent oxygen saturation', desc: 'Your SpO2 levels indicate excellent respiratory health.', icon: 'check-circle', color: '#6C63FF', bgColor: '#EEF0FF' },
];

const RECOMMENDED = [
  { id: '1', title: 'Annual Cardiac Checkup', doctor: 'Dr. Priya Sharma', type: 'Cardiologist', icon: 'favorite' },
  { id: '2', title: 'Blood Work Panel', doctor: 'Dr. Arjun Mehta', type: 'General Physician', icon: 'science' },
  { id: '3', title: 'Vision Test', doctor: 'Dr. Meena Iyer', type: 'Ophthalmologist', icon: 'visibility' },
];

interface Props {
  navigation: any;
}

const MyVitalsScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState<VitalsTab>('vitals');

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="My Vitals"
        showMenu={false}
        showNotification={false}
      />

      <View style={styles.tabBar}>
        {([
          { key: 'vitals', label: 'All Vitals' },
          { key: 'insights', label: 'Insights' },
          { key: 'recommended', label: 'Recommended' },
        ] as { key: VitalsTab; label: string }[]).map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            activeOpacity={0.8}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'vitals' && (
          <>
            <Text style={styles.lastUpdated}>Last updated: Today, 9:00 AM</Text>
            <View style={styles.vitalsGrid}>
              {VITALS_DATA.map(vital => (
                <View key={vital.id} style={styles.vitalCell}>
                  <VitalCard vital={vital} />
                </View>
              ))}
            </View>
          </>
        )}

        {activeTab === 'insights' && (
          <View style={styles.insightsList}>
            {INSIGHTS.map(insight => (
              <View key={insight.id} style={[styles.insightCard, { borderLeftColor: insight.color }]}>
                <View style={[styles.insightIcon, { backgroundColor: insight.bgColor }]}>
                  <Text style={{ fontSize: RFValue(20) }}>
                    {insight.icon === 'thumb-up' ? '👍' : insight.icon === 'warning' ? '⚠️' : '✅'}
                  </Text>
                </View>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightDesc}>{insight.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'recommended' && (
          <View style={styles.recommendedList}>
            <Text style={styles.recommendedNote}>
              Based on your vitals and health profile, we recommend the following consultations:
            </Text>
            {RECOMMENDED.map(item => (
              <View key={item.id} style={styles.recommendedCard}>
                <View style={styles.recommendedIcon}>
                  <Text style={{ fontSize: RFValue(22) }}>🩺</Text>
                </View>
                <View style={styles.recommendedContent}>
                  <Text style={styles.recommendedTitle}>{item.title}</Text>
                  <Text style={styles.recommendedDoctor}>{item.doctor}</Text>
                  <Text style={styles.recommendedType}>{item.type}</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookBtn}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('BookAppointment')}
                >
                  <Text style={styles.bookBtnText}>Book</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.textGray,
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: FONTS.SEMIBOLD,
  },
  scrollContent: { padding: 16, paddingBottom: 24 },
  lastUpdated: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    color: COLORS.textGray,
    marginBottom: 14,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  vitalCell: {
    width: '30.5%',
  },
  insightsList: { gap: 12 },
  insightCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  insightIcon: {
    width: RFValue(44),
    height: RFValue(44),
    borderRadius: RFValue(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightContent: { flex: 1 },
  insightTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(14),
    color: COLORS.black,
    marginBottom: 4,
  },
  insightDesc: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(13),
    color: COLORS.textGray,
    lineHeight: RFValue(18),
  },
  recommendedNote: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(13),
    color: COLORS.textGray,
    marginBottom: 16,
    lineHeight: RFValue(19),
  },
  recommendedList: {},
  recommendedCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  recommendedIcon: {
    width: RFValue(48),
    height: RFValue(48),
    borderRadius: RFValue(14),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendedContent: { flex: 1 },
  recommendedTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(14),
    color: COLORS.black,
    marginBottom: 2,
  },
  recommendedDoctor: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(12),
    color: COLORS.primary,
    marginBottom: 1,
  },
  recommendedType: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(11),
    color: COLORS.textGray,
  },
  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  bookBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(12),
    color: COLORS.white,
  },
});

export default React.memo(MyVitalsScreen);
