import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onBackPress?: () => void;
  showNotification?: boolean;
  notificationCount?: number;
  showMenu?: boolean;
  rightContent?: React.ReactNode;
}

const AppHeader = ({
  title,
  subtitle,
  onMenuPress,
  onNotificationPress,
  onBackPress,
  showNotification = true,
  notificationCount = 0,
  showMenu = true,
  rightContent,
}: AppHeaderProps) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" translucent={false} />
      <View style={styles.leftSection}>
        {onBackPress ? (
          <TouchableOpacity onPress={onBackPress} style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={RFValue(24)} color={COLORS.black} />
          </TouchableOpacity>
        ) : showMenu ? (
          <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialIcons name="menu" size={RFValue(24)} color={COLORS.black} />
          </TouchableOpacity>
        ) : null}

        {title ? (
          <View style={{ marginLeft: onBackPress || showMenu ? 8 : 0 }}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        ) : !onBackPress ? (
          <View style={styles.logoContainer}>
            <View style={styles.logoBadge}>
              <MaterialIcons name="local-hospital" size={RFValue(16)} color={COLORS.white} />
            </View>
            <Text style={styles.logoText}>HCare</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.rightSection}>
        {rightContent}
        {showNotification && (
          <TouchableOpacity onPress={onNotificationPress} style={styles.notifBtn} activeOpacity={0.7}>
            <MaterialIcons name="notifications-none" size={RFValue(26)} color={COLORS.black} />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 9 ? '9+' : String(notificationCount)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    padding: 4,
  },
  notifBtn: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: RFValue(32),
    height: RFValue(32),
    borderRadius: RFValue(8),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(20),
    color: COLORS.primary,
  },
  title: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(17),
    color: COLORS.black,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    color: COLORS.textGray,
    marginTop: 1,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.titleRed,
    borderRadius: 8,
    minWidth: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontFamily: FONTS.BOLD,
  },
});

export default React.memo(AppHeader);
