import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { FONTS, RFValue, RLine } from '../../constants/constants';
import { capitalizeFirstLetter } from '../../utils/textFormat';

interface Props {
  Source?: React.ReactNode;
  imgChildren?: React.ReactNode;
  btnText?: string;
  content?: string;
  _onPress?: () => void;
  error?: string;
}

const SnackBar = ({ Source, imgChildren, btnText, content, _onPress, error }: Props) => {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 500 });
    opacity.value = withTiming(1, { duration: 500 });
    return () => {
      translateY.value = withDelay(300, withTiming(100, { duration: 500 }));
      opacity.value = withDelay(300, withTiming(0, { duration: 500 }));
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        { backgroundColor: error ? '#FF5252' : '#333333' },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {Source && Source}
        {content ? (
          <Text style={styles.content}>{capitalizeFirstLetter(content)}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={_onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {imgChildren ?? null}
        {btnText ? <Text style={styles.btnText}>{btnText}</Text> : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: '#02BF59',
    fontFamily: FONTS.SEMIBOLD,
    fontSize: RFValue(12),
    fontWeight: '600',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#333333',
    borderColor: '#8B8B8B',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(14),
  },
  content: {
    color: 'white',
    fontFamily: FONTS.MEDIUM,
    fontSize: RFValue(14),
    fontWeight: '400',
    lineHeight: RLine(20),
    marginHorizontal: 10,
  },
});

export default React.memo(SnackBar);
