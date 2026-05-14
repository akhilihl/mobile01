import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const DEVICE_TYPE = {
  isSmallMobile: screenHeight < 640,
  isMobile: screenWidth < 600,
  isTablet: screenWidth >= 600 && screenWidth < 900,
  isLargeTablet: screenWidth >= 900,
};

export const isTablet = DEVICE_TYPE.isTablet || DEVICE_TYPE.isLargeTablet;

export const RFValue = (size: number): number => {
  if (DEVICE_TYPE.isSmallMobile) { return size - 2; }
  if (DEVICE_TYPE.isTablet) { return size + 4; }
  if (DEVICE_TYPE.isLargeTablet) { return size + 6; }
  return size;
};

export const RLine = (lineHeight: number): number => {
  if (DEVICE_TYPE.isSmallMobile) { return lineHeight - 2; }
  if (DEVICE_TYPE.isTablet) { return lineHeight + 3; }
  if (DEVICE_TYPE.isLargeTablet) { return lineHeight + 5; }
  return lineHeight;
};

export const RWidth = (width: number): number => {
  if (DEVICE_TYPE.isTablet) { return (width + screenWidth * 0.03) * 1.5; }
  if (DEVICE_TYPE.isLargeTablet) { return (width + screenWidth * 0.04) * 1.5; }
  return width;
};

export const RHeight = (height: number): number => {
  if (DEVICE_TYPE.isTablet) { return (height + screenHeight * 0.03) * 1.5; }
  if (DEVICE_TYPE.isLargeTablet) { return (height + screenHeight * 0.04) * 1.5; }
  return height;
};

export const FONTS = {
  REGULAR: 'PlusJakartaSans-Regular',
  MEDIUM: 'PlusJakartaSans-Medium',
  SEMIBOLD: 'PlusJakartaSans-SemiBold',
  DASHBOARD_SEMIBOLD: 'Quicksand-SemiBold',
  BOLD: 'PlusJakartaSans-Bold',
  EXTRABOLD: 'PlusJakartaSans-ExtraBold',
};

export const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#5A54E8',
  primaryLight: '#EEF0FF',
  white: '#FFFFFF',
  black: '#1A1A2E',
  textInputBg: '#F5F7FA',
  textInputBorder: '#E2E8F0',
  lightGray: '#9AA0A9',
  darkGray: '#4A5568',
  lightBlue: '#EEF0FF',
  titleYellow: '#F59E0B',
  titleGreen: '#10B981',
  titleLightGreen: '#34D399',
  titleRed: '#EF4444',
  titleGrey: '#F1F5F9',
  percentageGreen: '#10B981',
  percentageBlue: '#3B82F6',
  textGray: '#6B7280',
  shadeGray: '#00000033',
  bgColor: '#F5F7FA',
  bgColor2: '#F5F7FA',
  cardBg: '#FFFFFF',
  btnDisable: '#C4C1FF',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  progressBarActive: '#6C63FF',
  progressBarInActive: '#E2E8F0',
  wrapper: '#00000066',
  blink: '#00000050',
  border: '#E2E8F0',
  purple100: '#EDE9FE',
  purple200: '#DDD6FE',
  orange: '#F97316',
  teal: '#0D9488',
  pink: '#EC4899',
};

export const colorPalette = [
  { txtcolor: '#006AFF', bgColor: 'rgba(0,106,255,0.06)' },
  { txtcolor: '#28A7FE', bgColor: 'rgba(40,167,254,0.06)' },
  { txtcolor: '#22C2A5', bgColor: 'rgba(34,194,165,0.06)' },
  { txtcolor: '#FBBB00', bgColor: 'rgba(251,187,0,0.06)' },
  { txtcolor: '#FF0000', bgColor: 'rgba(255,0,0,0.06)' },
  { txtcolor: '#9400d3', bgColor: 'rgba(79,140,224,0.06)' },
  { txtcolor: '#800080', bgColor: 'rgba(128,0,128,0.06)' },
  { txtcolor: '#008080', bgColor: 'rgba(0,128,128,0.06)' },
  { txtcolor: '#FFA500', bgColor: 'rgba(255,165,0,0.06)' },
  { txtcolor: '#00FF00', bgColor: 'rgba(0,255,0,0.06)' },
];
