import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONTS, isTablet, RFValue, RLine } from './constants';

const screenHeight = Dimensions.get('screen').height;

export const authStyles = StyleSheet.create({
  accountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  accountTxt: {
    color: COLORS.black,
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(12),
  },
  btnContainer: {
    alignItems: 'center',
    bottom: 0,
    height: screenHeight / 9,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: screenHeight / 8.4,
  },
  btnView: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 100,
    justifyContent: 'center',
    padding: screenHeight * 0.014,
  },
  cell: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEDEE',
    borderRadius: 8,
    borderWidth: isTablet ? 2 : 1,
    height: RFValue(48),
    justifyContent: 'center',
    width: RFValue(47),
  },
  cellText: {
    color: '#031227',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(14),
    fontWeight: '400',
  },
  codeFieldRoot: { color: 'black', justifyContent: 'space-around', marginTop: 20 },
  container: { backgroundColor: COLORS.white, flex: 1 },
  content: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 },
  descTxt: {
    color: '#68717D',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    lineHeight: RLine(22),
  },
  errorText: {
    color: COLORS.titleRed,
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(12),
    marginTop: 4,
  },
  focusCell: { borderColor: COLORS.darkGray, borderWidth: 2 },
  headingTxt: {
    color: COLORS.black,
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(25),
    lineHeight: RLine(36),
    paddingTop: 14,
  },
  inputContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 24,
  },
  label: {
    left: 10,
    paddingHorizontal: 5,
    position: 'absolute',
    zIndex: 1,
  },
  messageTxt: {
    color: '#68717D',
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(12),
    paddingTop: 12,
    textAlign: 'center',
  },
  noteTxt: {
    color: '#9AA0A9',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    lineHeight: RFValue(16),
    paddingTop: 12,
  },
  onboardContainer: { backgroundColor: COLORS.primary, flex: 1 },
  otpContainer: { backgroundColor: COLORS.white, flex: 1, padding: 16 },
  phoneNumTxt: {
    color: '#1C2A3D',
    fontFamily: FONTS.MEDIUM,
    fontWeight: '500',
  },
  registerTxt: {
    color: COLORS.primary,
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(12),
    textDecorationLine: 'underline',
  },
  resendTxt: {
    color: COLORS.primary,
    fontFamily: FONTS.SEMIBOLD,
    textDecorationLine: 'underline',
  },
  rowView: { alignItems: 'center', flexDirection: 'row' },
  signInContainer: { flex: 1, padding: 16 },
  terms: {
    color: '#68717D',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    includeFontPadding: false,
  },
  termsColor: { color: COLORS.primary, fontFamily: FONTS.MEDIUM },
  welcomeText: {
    color: COLORS.darkGray,
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(14),
    lineHeight: RLine(22),
    paddingTop: 6,
  },
  welcomeTitle: {
    color: COLORS.black,
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(32),
  },
  whatsAppAlert: { alignItems: 'center', flexDirection: 'row', paddingTop: 4 },
  whatsAppAlertTxt: {
    color: COLORS.lightGray,
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(12),
    includeFontPadding: false,
    paddingStart: 4,
  },
});

export default authStyles;
