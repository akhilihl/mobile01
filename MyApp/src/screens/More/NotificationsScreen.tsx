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

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment' | 'report' | 'payment' | 'reminder';
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Appointment Tomorrow', message: 'Reminder: Your appointment with Dr. Priya Sharma is tomorrow at 10:30 AM.', time: '2 hours ago', type: 'appointment', read: false },
  { id: '2', title: 'Report Ready', message: 'Your Complete Blood Count (CBC) report from Thyrocare is now available.', time: '5 hours ago', type: 'report', read: false },
  { id: '3', title: 'Payment Confirmed', message: 'Payment of ₹850 for your appointment with Dr. Arjun Mehta has been confirmed.', time: 'Yesterday', type: 'payment', read: true },
  { id: '4', title: 'Medication Reminder', message: 'Time to take your prescribed medication: Metformin 500mg.', time: '2 days ago', type: 'reminder', read: true },
  { id: '5', title: 'Appointment Confirmed', message: 'Your teleconsultation with Dr. Kiran Reddy on Wed, 17 Jan is confirmed.', time: '3 days ago', type: 'appointment', read: true },
];

const ICON_MAP = {
  appointment: { name: 'event', color: '#6C63FF', bgColor: '#EEF0FF' },
  report: { name: 'science', color: '#16A34A', bgColor: '#F0FDF4' },
  payment: { name: 'payment', color: '#0284C7', bgColor: '#E0F2FE' },
  reminder: { name: 'alarm', color: '#D97706', bgColor: '#FEF3C7' },
};

interface Props {
  navigation: any;
}

const NotificationsScreen = ({ navigation }: Props) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Notifications"
        onBackPress={() => navigation.goBack()}
        showNotification={false}
        showMenu={false}
        rightContent={
          unreadCount > 0 ? (
            <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {unreadCount > 0 && (
          <View style={styles.unreadBanner}>
            <Text style={styles.unreadText}>{unreadCount} unread notifications</Text>
          </View>
        )}

        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="notifications-none" size={RFValue(56)} color={COLORS.textGray} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtext}>You're all caught up!</Text>
          </View>
        ) : (
          notifications.map(notif => {
            const icon = ICON_MAP[notif.type];
            return (
              <TouchableOpacity
                key={notif.id}
                style={[styles.notifCard, !notif.read && styles.unreadCard]}
                activeOpacity={0.85}
                onPress={() => markRead(notif.id)}
              >
                <View style={[styles.notifIcon, { backgroundColor: icon.bgColor }]}>
                  <MaterialIcons name={icon.name} size={RFValue(22)} color={icon.color} />
                </View>
                <View style={styles.notifContent}>
                  <View style={styles.notifHeader}>
                    <Text style={[styles.notifTitle, !notif.read && styles.unreadTitle]}>
                      {notif.title}
                    </Text>
                    {!notif.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notifMessage} numberOfLines={2}>{notif.message}</Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgColor },
  scrollContent: { padding: 16, paddingBottom: 24 },
  markAllBtn: {
    paddingHorizontal: 4,
  },
  markAllText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.primary,
  },
  unreadBanner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  unreadText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.primary,
  },
  notifCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  notifIcon: {
    width: RFValue(46),
    height: RFValue(46),
    borderRadius: RFValue(14),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notifContent: { flex: 1 },
  notifHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notifTitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(14),
    color: COLORS.black,
    flex: 1,
  },
  unreadTitle: { fontFamily: FONTS.SEMIBOLD },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  notifMessage: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(13),
    color: COLORS.textGray,
    lineHeight: RFValue(18),
    marginBottom: 6,
  },
  notifTime: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(11),
    color: COLORS.lightGray,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 10,
  },
  emptyTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(18),
    color: COLORS.darkGray,
  },
  emptySubtext: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(14),
    color: COLORS.textGray,
  },
});

export default React.memo(NotificationsScreen);
