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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../../components/AppHeader/AppHeader';
import PrimaryButton from '../../components/button/PrimaryButton';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

const RELATIONS = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other'];
const GENDERS = ['Male', 'Female', 'Other'];

interface Props {
  navigation: any;
}

const AddFamilyMemberScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !relation || !gender) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', `${name} has been added as a family member`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Add Family Member"
        onBackPress={() => navigation.goBack()}
        showNotification={false}
        showMenu={false}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarPlaceholder}>
          <MaterialIcons name="person-add" size={RFValue(40)} color={COLORS.primary} />
          <Text style={styles.avatarNote}>Family Member Details</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            placeholderTextColor={COLORS.textGray}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Relationship *</Text>
          <View style={styles.chipGroup}>
            {RELATIONS.map(rel => (
              <TouchableOpacity
                key={rel}
                style={[styles.chip, relation === rel && styles.chipActive]}
                activeOpacity={0.8}
                onPress={() => setRelation(rel)}
              >
                <Text style={[styles.chipText, relation === rel && styles.chipTextActive]}>{rel}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Gender *</Text>
          <View style={styles.chipGroup}>
            {GENDERS.map(g => (
              <TouchableOpacity
                key={g}
                style={[styles.chip, gender === g && styles.chipActive]}
                activeOpacity={0.8}
                onPress={() => setGender(g)}
              >
                <Text style={[styles.chipText, gender === g && styles.chipTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={COLORS.textGray}
            value={dob}
            onChangeText={setDob}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 XXXXX XXXXX"
            placeholderTextColor={COLORS.textGray}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.submitSection}>
          <PrimaryButton title="Add Member" onPress={handleSave} isLoading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgColor },
  scrollContent: { padding: 20, paddingBottom: 32 },
  avatarPlaceholder: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
  },
  avatarNote: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(15),
    color: COLORS.black,
  },
  section: { marginBottom: 20 },
  fieldLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(13),
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(14),
    color: COLORS.black,
  },
  chipGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontFamily: FONTS.MEDIUM, fontSize: RFValue(13), color: COLORS.darkGray },
  chipTextActive: { color: COLORS.white },
  submitSection: { marginTop: 8 },
});

export default React.memo(AddFamilyMemberScreen);
