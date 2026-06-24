import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

interface FloatingGradientProps {
  color: string;
  size: number;
  top: number;
  left: number;
  duration?: number;
  style?: ViewStyle;
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

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true
        })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [duration, floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 10]
  });

  const scale = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.05]
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
          transform: [{ translateY }, { scale }]
        },
        style
      ]}
    />
  );
};

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.7
  }
});
