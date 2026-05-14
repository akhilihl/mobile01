import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

export interface Appointment {
  id: string;
  doctorName: string;
  doctorDesignation: string;
  date: string;
  time: string;
  location: string;
  type: 'in-person' | 'teleconsult';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetails?: (appointment: Appointment) => void;
  onReschedule?: (appointment: Appointment) => void;
  onJoin?: (appointment: Appointment) => void;
  onCancel?: (appointment: Appointment) => void;
  onRebook?: (appointment: Appointment) => void;
  onViewPrescription?: (appointment: Appointment) => void;
  tab?: 'upcoming' | 'completed' | 'cancelled';
}

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', color: COLORS.titleGreen, bgColor: '#D1FAE5' },
  pending: { label: 'Pending', color: COLORS.warning, bgColor: '#FEF3C7' },
  completed: { label: 'Completed', color: COLORS.percentageBlue, bgColor: '#DBEAFE' },
  cancelled: { label: 'Cancelled', color: COLORS.titleRed, bgColor: '#FEE2E2' },
};

const AppointmentCard = ({
  appointment,
  onViewDetails,
  onReschedule,
  onJoin,
  onCancel,
  onRebook,
  onViewPrescription,
  tab = 'upcoming',
}: AppointmentCardProps) => {
  const initials = appointment.doctorName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const status = STATUS_CONFIG[appointment.status];

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.typeBadge}>
          <MaterialIcons
            name={appointment.type === 'teleconsult' ? 'videocam' : 'event'}
            size={RFValue(12)}
            color={COLORS.primary}
          />
          <Text style={styles.typeText}>
            {appointment.type === 'teleconsult' ? 'TELECONSULT' : 'APPOINTMENT'}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bgColor }]}>
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      <View style={styles.doctorRow}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{appointment.doctorName}</Text>
          <Text style={styles.doctorDes}>{appointment.doctorDesignation}</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <MaterialIcons name="event" size={RFValue(14)} color={COLORS.primary} />
          <Text style={styles.detailText}>{appointment.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="access-time" size={RFValue(14)} color={COLORS.primary} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="location-on" size={RFValue(14)} color={COLORS.primary} />
          <Text style={styles.detailText} numberOfLines={1}>{appointment.location}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        {tab === 'upcoming' && (
          <>
            <TouchableOpacity
              style={styles.outlineBtn}
              activeOpacity={0.8}
              onPress={() => onViewDetails?.(appointment)}
            >
              <Text style={styles.outlineBtnText}>View Details</Text>
            </TouchableOpacity>
            {appointment.type === 'teleconsult' ? (
              <TouchableOpacity
                style={styles.primaryBtn}
                activeOpacity={0.8}
                onPress={() => onJoin?.(appointment)}
              >
                <Text style={styles.primaryBtnText}>Join Now</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.outlineBtn}
                activeOpacity={0.8}
                onPress={() => onReschedule?.(appointment)}
              >
                <Text style={styles.outlineBtnText}>Reschedule</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        {tab === 'completed' && (
          <>
            <TouchableOpacity
              style={styles.outlineBtn}
              activeOpacity={0.8}
              onPress={() => onViewPrescription?.(appointment)}
            >
              <Text style={styles.outlineBtnText}>Prescription</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.8}
              onPress={() => onRebook?.(appointment)}
            >
              <Text style={styles.primaryBtnText}>Rebook</Text>
            </TouchableOpacity>
          </>
        )}
        {tab === 'cancelled' && (
          <TouchableOpacity
            style={[styles.primaryBtn, { flex: 1 }]}
            activeOpacity={0.8}
            onPress={() => onRebook?.(appointment)}
          >
            <Text style={styles.primaryBtnText}>Book Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  typeText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(10),
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(11),
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: RFValue(44),
    height: RFValue(44),
    borderRadius: RFValue(22),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  initials: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(16),
    color: COLORS.primary,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(14),
    color: COLORS.black,
  },
  doctorDes: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    color: COLORS.textGray,
    marginTop: 2,
  },
  detailsSection: {
    gap: 6,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(13),
    color: COLORS.darkGray,
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
  },
  outlineBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(13),
    color: COLORS.primary,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(13),
    color: COLORS.white,
  },
});

export default React.memo(AppointmentCard);
