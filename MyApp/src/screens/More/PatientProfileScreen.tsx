import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../../components/AppHeader/AppHeader';
import { COLORS, FONTS, RFValue } from '../../constants/constants';
import { RootState, AppDispatch } from '../../redux/store/store';
import { setUser } from '../../redux/reducers/userReducer';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  address: string;
}

const GENDERS = ['Male', 'Female', 'Other'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

interface Props {
  navigation: any;
}

const PatientProfileScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.userState?.user ?? null) as any;

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: userState?.name ?? 'John Doe',
    phone: userState?.phone ?? '+91 98765 43210',
    email: userState?.email ?? 'john.doe@email.com',
    dob: userState?.dob ?? '15 Mar 1990',
    gender: userState?.gender ?? 'Male',
    bloodGroup: userState?.bloodGroup ?? 'O+',
    address: userState?.address ?? '42, MG Road, Bangalore, Karnataka 560001',
  });

  const handleSave = () => {
    dispatch(setUser({ ...userState, ...profile }));
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const initials = profile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const renderField = (label: string, value: string, field: keyof UserProfile, iconName: string) => (
    <View style={styles.fieldRow}>
      <View style={styles.fieldIcon}>
        <MaterialIcons name={iconName} size={RFValue(18)} color={COLORS.primary} />
      </View>
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isEditing && field !== 'phone' ? (
          <TextInput
            style={styles.fieldInput}
            value={value}
            onChangeText={text => setProfile(prev => ({ ...prev, [field]: text }))}
            placeholderTextColor={COLORS.textGray}
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="My Profile"
        onBackPress={() => navigation.goBack()}
        showNotification={false}
        showMenu={false}
        rightContent={
          <TouchableOpacity
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
            style={styles.editBtn}
          >
            <MaterialIcons name={isEditing ? 'check' : 'edit'} size={RFValue(20)} color={COLORS.primary} />
            <Text style={styles.editBtnText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.userPhone}>{profile.phone}</Text>
          <View style={styles.memberBadge}>
            <MaterialIcons name="verified" size={RFValue(14)} color={COLORS.primary} />
            <Text style={styles.memberText}>HCare Member</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            {renderField('Full Name', profile.name, 'name', 'person')}
            <View style={styles.divider} />
            {renderField('Date of Birth', profile.dob, 'dob', 'cake')}
            <View style={styles.divider} />
            {renderField('Gender', profile.gender, 'gender', 'wc')}
            <View style={styles.divider} />
            {renderField('Blood Group', profile.bloodGroup, 'bloodGroup', 'bloodtype')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          <View style={styles.card}>
            {renderField('Phone Number', profile.phone, 'phone', 'phone')}
            <View style={styles.divider} />
            {renderField('Email', profile.email, 'email', 'email')}
            <View style={styles.divider} />
            {renderField('Address', profile.address, 'address', 'location-on')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Records</Text>
          <View style={styles.statsRow}>
            {[
              { label: 'Appointments', value: '12', icon: 'event' },
              { label: 'Prescriptions', value: '8', icon: 'description' },
              { label: 'Lab Reports', value: '5', icon: 'science' },
            ].map(stat => (
              <View key={stat.label} style={styles.statCard}>
                <View style={styles.statIcon}>
                  <MaterialIcons name={stat.icon} size={RFValue(20)} color={COLORS.primary} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.8} onPress={() => setIsEditing(false)}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgColor },
  scrollContent: { padding: 16, paddingBottom: 32 },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editBtnText: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(14), color: COLORS.primary },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(40),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarInitials: { fontFamily: FONTS.BOLD, fontSize: RFValue(28), color: COLORS.primary },
  userName: { fontFamily: FONTS.BOLD, fontSize: RFValue(20), color: COLORS.black, marginBottom: 4 },
  userPhone: { fontFamily: FONTS.REGULAR, fontSize: RFValue(14), color: COLORS.textGray, marginBottom: 10 },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  memberText: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(12), color: COLORS.primary },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(15),
    color: COLORS.black,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    gap: 12,
  },
  fieldIcon: {
    width: RFValue(36),
    height: RFValue(36),
    borderRadius: RFValue(10),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  fieldContent: { flex: 1 },
  fieldLabel: { fontFamily: FONTS.REGULAR, fontSize: RFValue(12), color: COLORS.textGray, marginBottom: 3 },
  fieldValue: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(14), color: COLORS.black },
  fieldInput: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(14),
    color: COLORS.black,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.primary,
    paddingVertical: 4,
    padding: 0,
  },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 48 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(12),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: { fontFamily: FONTS.BOLD, fontSize: RFValue(20), color: COLORS.black },
  statLabel: { fontFamily: FONTS.REGULAR, fontSize: RFValue(11), color: COLORS.textGray, textAlign: 'center' },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.error,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  cancelBtnText: { fontFamily: FONTS.SEMIBOLD, fontSize: RFValue(14), color: COLORS.error },
});

export default React.memo(PatientProfileScreen);
