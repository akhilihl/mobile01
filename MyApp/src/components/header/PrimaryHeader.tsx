import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, RFValue, RLine } from '../../constants/constants';
import { capitalizeFirstLetter } from '../../utils/textFormat';

interface Props {
  headerName?: string;
  subheader?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  otherStyles?: object;
  color?: string;
}

const PrimaryHeader = ({ headerName, subheader, children, onPress, otherStyles, color }: Props) => {
  return (
    <View style={[styles.header, otherStyles]}>
      <View style={styles.rowView}>
        {onPress ? (
          <TouchableOpacity onPress={onPress}>
            <MaterialIcons
              name="arrow-back"
              size={RFValue(24)}
              color={color ?? COLORS.black}
              style={{ paddingEnd: 12 }}
            />
          </TouchableOpacity>
        ) : null}
        <View style={{ flex: 1 }}>
          {headerName && (
            <Text
              numberOfLines={1}
              style={[
                styles.headerTxt,
                {
                  fontSize: subheader ? RFValue(14) : RFValue(16),
                  color: color ?? COLORS.black,
                },
              ]}
            >
              {capitalizeFirstLetter(headerName)}
            </Text>
          )}
          {subheader && (
            <Text numberOfLines={1} style={styles.subheaderTxt}>
              {capitalizeFirstLetter(subheader)}
            </Text>
          )}
        </View>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(12),
    width: '100%',
  },
  headerTxt: {
    color: COLORS.black,
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(16),
    includeFontPadding: false,
    lineHeight: RLine(24),
  },
  rowView: { alignItems: 'center', flex: 1, flexDirection: 'row' },
  subheaderTxt: {
    color: COLORS.shadeGray,
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(12),
    lineHeight: RLine(16),
  },
});

export default React.memo(PrimaryHeader);
