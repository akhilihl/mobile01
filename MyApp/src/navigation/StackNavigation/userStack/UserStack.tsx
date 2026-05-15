import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { NetworkContext } from '../../../contexts/NetworkContext/NetworkContext';
import OfflineModal from '../../../components/Modal/OfflineModal';
import BottomTab from '../../bottomNavigation/BottomTab';
import BookAppointmentScreen from '../../../screens/Bookings/BookAppointmentScreen';
import SelectSlotScreen from '../../../screens/Bookings/SelectSlotScreen';
import BookingSuccessScreen from '../../../screens/Bookings/BookingSuccessScreen';
import NotificationsScreen from '../../../screens/More/NotificationsScreen';
import PatientProfileScreen from '../../../screens/More/PatientProfileScreen';
import AddFamilyMemberScreen from '../../../screens/More/AddFamilyMemberScreen';
import { COLORS, FONTS, RFValue } from '../../../constants/constants';

export type UserStackParamList = {
  BottomTab: undefined;
  BookAppointment: undefined;
  SelectSlot: { doctorId: string; doctorName: string; doctorDesignation: string };
  BookingSuccess: { doctorName: string; date: string; time: string; location: string };
  Notifications: undefined;
  PatientProfile: undefined;
  AddFamilyMember: undefined;
  PrescriptionDetail: { prescriptionId: string };
  LabReportDetail: { reportId: string };
};

const Stack = createNativeStackNavigator<UserStackParamList>();

const DetailPlaceholder = ({ navigation, title }: { navigation: any; title: string }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
    <View style={placeholderStyles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
        <MaterialIcons name="arrow-back" size={RFValue(24)} color={COLORS.black} />
      </TouchableOpacity>
      <Text style={placeholderStyles.title}>{title}</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MaterialIcons name="description" size={RFValue(56)} color={COLORS.textGray} />
      <Text style={placeholderStyles.comingSoon}>Coming Soon</Text>
    </View>
  </SafeAreaView>
);

const placeholderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  title: { fontFamily: FONTS.SEMIBOLD, fontSize: RFValue(17), color: COLORS.black },
  comingSoon: { fontFamily: FONTS.SEMIBOLD, fontSize: RFValue(18), color: COLORS.textGray, marginTop: 12 },
});

interface Props {
  onAuthState: () => void;
}

const UserStack = ({ onAuthState }: Props) => {
  const { isConnected, loader, setIsConnected } = useContext(NetworkContext);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
      <Modal visible={isConnected} statusBarTranslucent={false}>
        <OfflineModal
          loader={loader}
          offlinePress={() => setIsConnected(false)}
        />
      </Modal>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
          <Stack.Screen name="BottomTab">
            {props => <BottomTab {...props} onAuthState={onAuthState} />}
          </Stack.Screen>
          <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
          <Stack.Screen name="SelectSlot" component={SelectSlotScreen} />
          <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="PatientProfile" component={PatientProfileScreen} />
          <Stack.Screen name="AddFamilyMember" component={AddFamilyMemberScreen} />
          <Stack.Screen name="PrescriptionDetail">
            {({ navigation }) => (
              <DetailPlaceholder navigation={navigation} title="Prescription Details" />
            )}
          </Stack.Screen>
          <Stack.Screen name="LabReportDetail">
            {({ navigation }) => (
              <DetailPlaceholder navigation={navigation} title="Lab Report Details" />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default React.memo(UserStack);
