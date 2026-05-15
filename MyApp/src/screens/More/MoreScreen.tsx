import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../../components/AppHeader/AppHeader';
import { COLORS, FONTS, RFValue } from '../../constants/constants';
import { RootState, AppDispatch } from '../../redux/store/store';
import { useLogoutMutation } from '../../redux/api/authApi';
import { setUser } from '../../redux/reducers/userReducer';
import { setToken } from '../../redux/reducers/tokenReducer';
import { DeleteValue } from '../../utils/storageUtils';

interface MenuItem {
  id: string;
  label: string;
  iconName: string;
  iconBgColor: string;
  iconColor: string;
  screen?: string;
  action?: string;
}

const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Account',
    items: [
      { id: '1', label: 'My Profile', iconName: 'person', iconBgColor: '#EEF0FF', iconColor: '#6C63FF', screen: 'PatientProfile' },
      { id: '2', label: 'Add Family Member', iconName: 'group-add', iconBgColor: '#E0F2FE', iconColor: '#0284C7', screen: 'AddFamilyMember' },
      { id: '3', label: 'Notifications', iconName: 'notifications', iconBgColor: '#FEF3C7', iconColor: '#D97706', screen: 'Notifications' },
    ],
  },
  {
    title: 'Health',
    items: [
      { id: '4', label: 'My Vitals', iconName: 'favorite', iconBgColor: '#FFF1F2', iconColor: '#E11D48', screen: 'Reports' },
      { id: '5', label: 'My Prescriptions', iconName: 'description', iconBgColor: '#F0FDF4', iconColor: '#16A34A', screen: 'Records' },
      { id: '6', label: 'Lab Reports', iconName: 'science', iconBgColor: '#F0FDF4', iconColor: '#059669', screen: 'Records' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: '7', label: 'Help & Support', iconName: 'help', iconBgColor: '#EDE9FE', iconColor: '#7C3AED', action: 'support' },
      { id: '8', label: 'Privacy Policy', iconName: 'privacy-tip', iconBgColor: '#E0F2FE', iconColor: '#0284C7', action: 'privacy' },
      { id: '9', label: 'About HCare', iconName: 'info', iconBgColor: '#EEF0FF', iconColor: '#6C63FF', action: 'about' },
    ],
  },
  {
    title: '',
    items: [
      { id: '10', label: 'Sign Out', iconName: 'logout', iconBgColor: '#FEE2E2', iconColor: '#EF4444', action: 'logout' },
    ],
  },
];

interface Props {
  navigation: any;
  onAuthState?: () => void;
}

const MoreScreen = ({ navigation, onAuthState }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userState?.user ?? null) as any;
  const [logout] = useLogoutMutation();

  const userName = user?.name ?? 'User';
  const userPhone = user?.phone ?? '';
  const initials = userName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  const handleItemPress = (item: MenuItem) => {
    if (item.screen) {
      navigation.navigate(item.screen as never);
      return;
    }
    if (item.action === 'logout') {
      Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try { await logout(); } catch (_) {}
            await DeleteValue('accessToken');
            await DeleteValue('user');
            dispatch(setToken(null));
            dispatch(setUser(null));
            onAuthState?.();
          },
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="More" showMenu={false} showNotification={false} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('PatientProfile')}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>{initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profilePhone}>{userPhone}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={RFValue(22)} color={COLORS.textGray} />
        </TouchableOpacity>

        {MENU_SECTIONS.map((section, sIdx) => (
          <View key={sIdx} style={styles.section}>
            {section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : null}
            <View style={styles.menuCard}>
              {section.items.map((item, iIdx) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      item.label === 'Sign Out' && styles.signOutItem,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => handleItemPress(item)}
                  >
                    <View style={[styles.menuIcon, { backgroundColor: item.iconBgColor }]}>
                      <MaterialIcons name={item.iconName} size={RFValue(20)} color={item.iconColor} />
                    </View>
                    <Text style={[styles.menuLabel, item.label === 'Sign Out' && { color: COLORS.error }]}>
                      {item.label}
                    </Text>
                    {item.label !== 'Sign Out' && (
                      <MaterialIcons name="chevron-right" size={RFValue(20)} color={COLORS.textGray} />
                    )}
                  </TouchableOpacity>
                  {iIdx < section.items.length - 1 && <View style={styles.divider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.version}>HCare v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgColor },
  scrollContent: { padding: 16, paddingBottom: 32 },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  profileAvatar: {
    width: RFValue(56),
    height: RFValue(56),
    borderRadius: RFValue(28),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  profileInitials: { fontFamily: FONTS.BOLD, fontSize: RFValue(20), color: COLORS.primary },
  profileInfo: { flex: 1 },
  profileName: { fontFamily: FONTS.SEMIBOLD, fontSize: RFValue(16), color: COLORS.black, marginBottom: 3 },
  profilePhone: { fontFamily: FONTS.REGULAR, fontSize: RFValue(13), color: COLORS.textGray },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(13),
    color: COLORS.textGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  signOutItem: {},
  menuIcon: {
    width: RFValue(38),
    height: RFValue(38),
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(14),
    color: COLORS.black,
  },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 52 },
  version: {
    textAlign: 'center',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    color: COLORS.lightGray,
    marginTop: 8,
  },
});

export default React.memo(MoreScreen);
