import React, { useEffect, useMemo, useRef } from "react";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface FloatingGradientProps {
  color: string;
  size: number;
  top: number;
  left: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export const FloatingGradient = ({
  color,
  size,
  top,
  left,
  duration = 9000,
  style
}: FloatingGradientProps) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const travel = useMemo(() => Math.max(6, Math.round(size * 0.05)), [size]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration,
          useNativeDriver: false
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration,
          useNativeDriver: false
        })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [duration, floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-travel, travel]
  });

  const translateX = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [travel * -0.8, travel * 0.8]
  });

  const scale = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.97, 1.04]
  });

  const opacity = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 0.78]
  });

  const rotate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-4deg", "4deg"]
  });

  return (
    <Animated.View
      style={[
        styles.blob,
        {
          backgroundColor: color,
          width: size,
          height: size,
          top,
          left,
          opacity,
          transform: [{ translateY }, { translateX }, { scale }, { rotate }]
        },
        style
      ]}
    />
  );
};

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
    borderRadius: 999
  }
});
