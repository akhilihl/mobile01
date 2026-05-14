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
import PrimaryButton from '../../components/button/PrimaryButton';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MORNING_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
const AFTERNOON_SLOTS = ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];
const EVENING_SLOTS = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'];

const UNAVAILABLE = new Set(['9:30 AM', '10:30 AM', '2:00 PM', '5:30 PM']);

const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
};

interface Props {
  navigation: any;
  route: {
    params: {
      doctorId: string;
      doctorName: string;
      doctorDesignation: string;
    };
  };
}

const SelectSlotScreen = ({ navigation, route }: Props) => {
  const { doctorName, doctorDesignation } = route.params;

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [consultType, setConsultType] = useState<'in-person' | 'teleconsult'>('in-person');

  const { firstDay, daysInMonth } = getCalendarDays(viewYear, viewMonth);

  const changeMonth = (dir: 1 | -1) => {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
    setSelectedDate(null);
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) { return; }
    const dateStr = `${DAYS[new Date(viewYear, viewMonth, selectedDate).getDay()]}, ${selectedDate} ${MONTHS[viewMonth]} ${viewYear}`;
    navigation.navigate('BookingSuccess', {
      doctorName,
      date: dateStr,
      time: selectedSlot,
      location: consultType === 'teleconsult' ? 'Online Consultation' : 'Apollo Hospital, Chennai',
    });
  };

  const renderSlotSection = (label: string, slots: string[], iconName: string) => (
    <View style={styles.slotSection}>
      <View style={styles.slotSectionHeader}>
        <MaterialIcons name={iconName} size={RFValue(16)} color={COLORS.textGray} />
        <Text style={styles.slotSectionLabel}>{label}</Text>
      </View>
      <View style={styles.slotsGrid}>
        {slots.map(slot => {
          const unavail = UNAVAILABLE.has(slot);
          const selected = selectedSlot === slot;
          return (
            <TouchableOpacity
              key={slot}
              style={[styles.slotBtn, selected && styles.slotBtnActive, unavail && styles.slotBtnDisabled]}
              activeOpacity={unavail ? 1 : 0.8}
              onPress={() => !unavail && setSelectedSlot(slot)}
              disabled={unavail}
            >
              <Text style={[styles.slotText, selected && styles.slotTextActive, unavail && styles.slotTextDisabled]}>
                {slot}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Select Slot"
        subtitle={`${doctorName} · ${doctorDesignation}`}
        onBackPress={() => navigation.goBack()}
        showNotification={false}
        showMenu={false}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.typeToggle}>
          {(['in-person', 'teleconsult'] as const).map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.typeBtn, consultType === type && styles.typeBtnActive]}
              activeOpacity={0.8}
              onPress={() => setConsultType(type)}
            >
              <MaterialIcons
                name={type === 'teleconsult' ? 'videocam' : 'person'}
                size={RFValue(16)}
                color={consultType === type ? COLORS.white : COLORS.textGray}
              />
              <Text style={[styles.typeBtnText, consultType === type && styles.typeBtnTextActive]}>
                {type === 'teleconsult' ? 'Teleconsult' : 'In-Person'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthBtn}>
              <MaterialIcons name="chevron-left" size={RFValue(24)} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{MONTHS[viewMonth]} {viewYear}</Text>
            <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthBtn}>
              <MaterialIcons name="chevron-right" size={RFValue(24)} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekRow}>
            {DAYS.map(d => (
              <Text key={d} style={styles.weekDay}>{d}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <View key={`empty-${i}`} style={styles.dayCell} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isDateDisabled(day);
              const selected = selectedDate === day;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, selected && styles.dayCellActive, disabled && styles.dayCellDisabled]}
                  activeOpacity={disabled ? 1 : 0.8}
                  onPress={() => !disabled && setSelectedDate(day)}
                  disabled={disabled}
                >
                  <Text style={[styles.dayText, selected && styles.dayTextActive, disabled && styles.dayTextDisabled]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Slots</Text>
        {renderSlotSection('Morning', MORNING_SLOTS, 'wb-sunny')}
        {renderSlotSection('Afternoon', AFTERNOON_SLOTS, 'cloud')}
        {renderSlotSection('Evening', EVENING_SLOTS, 'nights-stay')}
      </ScrollView>

      <View style={styles.footer}>
        {selectedSlot && (
          <Text style={styles.selectedInfo}>
            Selected: {selectedDate} {MONTHS[viewMonth]} · {selectedSlot}
          </Text>
        )}
        <PrimaryButton
          title="Confirm Booking"
          onPress={handleConfirm}
          disabled={!selectedDate || !selectedSlot}
        />
      </View>
    </SafeAreaView>
  );
};

const CELL_SIZE = RFValue(36);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgColor },
  scrollContent: { padding: 16, paddingBottom: 24 },
  typeToggle: {
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
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  typeBtnActive: { backgroundColor: COLORS.primary },
  typeBtnText: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(13), color: COLORS.textGray },
  typeBtnTextActive: { color: COLORS.white },
  calendarCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthBtn: { padding: 4 },
  monthLabel: { fontFamily: FONTS.SEMIBOLD, fontSize: RFValue(16), color: COLORS.black },
  weekRow: { flexDirection: 'row', marginBottom: 8 },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(12),
    color: COLORS.textGray,
  },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: `${100 / 7}%`,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  dayCellActive: {
    backgroundColor: COLORS.primary,
    borderRadius: CELL_SIZE / 2,
  },
  dayCellDisabled: { opacity: 0.35 },
  dayText: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(13), color: COLORS.black },
  dayTextActive: { color: COLORS.white },
  dayTextDisabled: { color: COLORS.textGray },
  sectionTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(15),
    color: COLORS.black,
    marginBottom: 12,
  },
  slotSection: { marginBottom: 16 },
  slotSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  slotSectionLabel: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(13), color: COLORS.textGray },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  slotBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  slotBtnDisabled: { backgroundColor: COLORS.titleGrey, borderColor: COLORS.border },
  slotText: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(12), color: COLORS.darkGray },
  slotTextActive: { color: COLORS.white },
  slotTextDisabled: { color: COLORS.textGray },
  footer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 8,
  },
  selectedInfo: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export default React.memo(SelectSlotScreen);
