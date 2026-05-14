import React, { useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, isTablet, RFValue } from '../../constants/constants';
import authStyles from '../../constants/authenticationStyles';

interface Props extends Pick<TextInputProps, 'keyboardType' | 'inputMode' | 'autoCapitalize' | 'multiline' | 'numberOfLines'> {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  onBlur?: (e: unknown) => void;
  onFocus?: (e: unknown) => void;
  error?: string;
  type?: string;
  inputtype?: TextInputProps['keyboardType'];
  bluronsubmit?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  editable?: boolean;
  otherStyles?: ViewStyle;
  otherInputStyles?: object;
  children1?: React.ReactNode;
  children2?: React.ReactNode;
  borderColor?: string;
  Ref?: React.RefObject<TextInput>;
  textAlignVertical?: TextInputProps['textAlignVertical'];
  countView?: boolean;
  countChildren?: React.ReactNode;
}

const PrimaryInput = ({
  label,
  placeholder,
  value,
  onChangeText = () => {},
  onSubmitEditing = () => {},
  onBlur = () => {},
  onFocus = () => {},
  error,
  type,
  inputtype,
  inputMode,
  bluronsubmit,
  maxLength,
  autoFocus,
  autoCapitalize,
  editable = true,
  otherStyles,
  otherInputStyles,
  children1,
  children2,
  numberOfLines,
  borderColor,
  multiline,
  Ref,
  textAlignVertical,
  countView,
  countChildren,
}: Props) => {
  const animatedLabelPosition = useState(new Animated.Value(editable ? 0 : 1))[0];
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: unknown) => {
    setIsFocused(true);
    Animated.timing(animatedLabelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus(event);
  };

  const handleBlur = (event: unknown) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedLabelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur(event);
  };

  const focusedColor = error ? COLORS.titleRed : isFocused ? COLORS.primary : COLORS.darkGray;

  const labelStyle = {
    top: animatedLabelPosition.interpolate({ inputRange: [0, 1], outputRange: [12, -12] }),
    opacity: animatedLabelPosition.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
    color: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['#4F5968', focusedColor],
    }),
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [13, RFValue(11)],
    }),
    fontFamily: FONTS.MEDIUM,
    backgroundColor: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', editable ? COLORS.white : '#F7F8F9'],
    }),
  };

  return (
    <View style={otherStyles}>
      <View
        style={[
          styles.codeInput,
          {
            backgroundColor: editable
              ? isFocused || value || error ? COLORS.white : COLORS.textInputBg
              : '#F7F8F9',
            borderColor: borderColor
              ? borderColor
              : error ? COLORS.titleRed : isFocused ? COLORS.primary : COLORS.textInputBorder,
          },
        ]}
      >
        {children1}
        <TextInput
          ref={Ref}
          placeholder={placeholder}
          style={[styles.text, otherInputStyles, { flex: 1 }]}
          placeholderTextColor="#9AA0A9"
          maxLength={maxLength}
          textAlignVertical={textAlignVertical}
          numberOfLines={numberOfLines}
          keyboardType={inputtype}
          inputMode={inputMode}
          blurOnSubmit={bluronsubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          value={value}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          editable={editable}
          cursorColor="#031227"
          multiline={multiline}
        />
        {(label && isFocused) || value || error ? (
          <Animated.Text style={[authStyles.label, labelStyle]}>{label}</Animated.Text>
        ) : null}
        {children2}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
        {type === 'mob' ? null : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : countView ? (
          <View />
        ) : null}
        {countView ? countChildren : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeInput: {
    alignItems: 'center',
    backgroundColor: COLORS.textInputBg,
    borderColor: COLORS.textInputBorder,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: RFValue(12),
    paddingVertical: Platform.OS === 'ios' ? 16 : undefined,
  },
  errorText: {
    color: COLORS.titleRed,
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(12),
    includeFontPadding: false,
    marginTop: 4,
  },
  text: {
    color: COLORS.black,
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(14),
    padding: isTablet ? RFValue(12) : undefined,
  },
});

export default React.memo(PrimaryInput);
