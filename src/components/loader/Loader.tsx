import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { COLORS } from '../../constants/constants';

const Loader = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
    <StatusBar backgroundColor="#FFFFFF" translucent={false} barStyle="dark-content" />
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

export default Loader;
