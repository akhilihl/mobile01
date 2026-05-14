import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, DEVICE_TYPE, FONTS, RFValue } from '../../constants/constants';
import HomeScreen from '../../screens/Home/HomeScreen';
import BookingsScreen from '../../screens/Bookings/BookingsScreen';
import MyPrescriptionsScreen from '../../screens/Records/MyPrescriptionsScreen';
import MyVitalsScreen from '../../screens/Reports/MyVitalsScreen';
import MoreScreen from '../../screens/More/MoreScreen';

export type BottomTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Records: undefined;
  Reports: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface TabIconProps {
  focused: boolean;
  iconName: string;
  label: string;
}

const TabIcon = ({ focused, iconName, label }: TabIconProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focused ? 1.1 : 1, { duration: 200 }) }],
  }));
  return (
    <View style={styles.iconWrapper}>
      <Animated.View style={animatedStyle}>
        <MaterialIcons
          name={iconName}
          size={RFValue(23)}
          color={focused ? COLORS.primary : COLORS.lightGray}
        />
      </Animated.View>
      <Text style={[styles.label, { color: focused ? COLORS.primary : COLORS.lightGray }]}>
        {label}
      </Text>
    </View>
  );
};

interface Props {
  onAuthState?: () => void;
  navigation?: any;
}

const BottomTab = ({ onAuthState, navigation }: Props) => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: styles.tabBar,
    }}
    initialRouteName="Home"
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} iconName="home" label="Home" />,
      }}
    />
    <Tab.Screen
      name="Bookings"
      component={BookingsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} iconName="event" label="Bookings" />,
      }}
    />
    <Tab.Screen
      name="Records"
      component={MyPrescriptionsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} iconName="description" label="Records" />,
      }}
    />
    <Tab.Screen
      name="Reports"
      component={MyVitalsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} iconName="insert-chart" label="Reports" />,
      }}
    />
    <Tab.Screen
      name="More"
      options={{
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} iconName="grid-view" label="More" />,
      }}
    >
      {props => <MoreScreen {...props} onAuthState={onAuthState} />}
    </Tab.Screen>
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    width: DEVICE_TYPE.isTablet || DEVICE_TYPE.isLargeTablet ? 72 : 56,
  },
  label: {
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(9),
    marginTop: 2,
  },
  tabBar: {
    height: Platform.OS === 'ios' ? 88 : 64,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 16,
  },
});

export default BottomTab;
