import React from "react";
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text } from "react-native";

import { palette, radii } from "../constants/theme";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const PrimaryButton = ({ label, onPress, disabled, loading }: PrimaryButtonProps) => (
  <PressableButton label={label} onPress={onPress} disabled={disabled} loading={loading} />
);

const PressableButton = ({ label, onPress, disabled, loading }: PrimaryButtonProps) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 35,
      bounciness: 8
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          disabled && styles.buttonDisabled,
          pressed && !disabled && { opacity: 0.95 }
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        onPressIn={pressIn}
        onPressOut={pressOut}
      >
        {loading ? <ActivityIndicator color={palette.white} /> : <Text style={styles.label}>{label}</Text>}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.accent,
    borderRadius: radii.pill,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22
  },
  buttonDisabled: {
    opacity: 0.45
  },
  label: {
    color: palette.white,
    fontSize: 17,
    fontWeight: "700"
  }
});
