import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { COLORS, FONTS, RFValue } from '../../constants/constants';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loaderSize?: number;
  icon?: React.ReactNode;
  icon1?: React.ReactNode;
  otherstyles?: object;
  textColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
}

const PrimaryButton = ({
  disabled,
  onPress,
  title,
  isLoading,
  loaderSize,
  icon,
  icon1,
  otherstyles,
  textColor,
  backgroundColor,
  fontFamily,
}: Props) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (isLoading) {
      translateY.value = withTiming(-10, { duration: 300 });
      opacity.value = withTiming(0.5, { duration: 300 });
    } else {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [isLoading]);

  useEffect(() => {
    opacity.value = 0;
    opacity.value = withTiming(1, { duration: 200 });
  }, [title]);

  return (
    <Pressable
      disabled={isLoading ? isLoading : disabled}
      onPress={onPress}
      style={[
        styles.button,
        otherstyles,
        {
          opacity: disabled ? 0.7 : 1,
          backgroundColor: backgroundColor ?? COLORS.primary,
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          color={textColor ?? COLORS.white}
          size={loaderSize ?? RFValue(18)}
        />
      ) : (
        <Animated.View style={[styles.content, animatedTextStyle]}>
          {icon1 && <View style={styles.icon1Container}>{icon1}</View>}
          <Animated.Text
            style={[
              styles.buttonTxt,
              { color: textColor ?? COLORS.white, fontFamily: fontFamily ?? FONTS.MEDIUM },
              animatedTextStyle,
            ]}
          >
            {title}
          </Animated.Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    padding: RFValue(16),
  },
  buttonTxt: {
    color: COLORS.white,
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(14),
    includeFontPadding: false,
  },
  content: { alignItems: 'center', flexDirection: 'row' },
  icon1Container: { paddingEnd: 8 },
  iconContainer: { paddingStart: 8 },
});

export default React.memo(PrimaryButton);
