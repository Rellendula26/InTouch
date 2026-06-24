import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { palette, radii } from "../constants/theme";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const PrimaryButton = ({ label, onPress, disabled, loading }: PrimaryButtonProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      disabled && styles.buttonDisabled,
      pressed && !disabled && { opacity: 0.9 }
    ]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? <ActivityIndicator color={palette.white} /> : <Text style={styles.label}>{label}</Text>}
  </Pressable>
);

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
