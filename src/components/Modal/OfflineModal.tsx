import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, RFValue, RLine } from '../../constants/constants';
import PrimaryButton from '../button/PrimaryButton';

const { height, width } = Dimensions.get('window');

interface Props {
  loader?: boolean;
  offlinePress?: () => void;
}

const OfflineModal = ({ loader, offlinePress }: Props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: COLORS.white, padding: 16 }}>
      <View style={styles.container}>
        <MaterialIcons name="wifi-off" size={RFValue(72)} color={COLORS.primary} />
        <View>
          <Text style={styles.headerText}>No internet connection</Text>
          <Text style={[styles.text, { marginTop: 4 }]}>Something wrong with your connection,</Text>
          <Text style={styles.text}>Please try again.</Text>
        </View>
      </View>
      <PrimaryButton
        title="Reload"
        onPress={offlinePress ?? (() => {})}
        backgroundColor={COLORS.white}
        textColor={COLORS.primary}
        otherstyles={{ borderWidth: 1, borderColor: COLORS.primary }}
      />
      {loader ? (
        <View style={{ position: 'absolute', height, width, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : null}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  headerText: {
    color: '#031227',
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(24),
    fontWeight: '600',
    lineHeight: RLine(33),
    textAlign: 'center',
  },
  text: {
    color: '#818993',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(15),
    fontWeight: '500',
    lineHeight: RLine(21),
    textAlign: 'center',
  },
});

export default React.memo(OfflineModal);
