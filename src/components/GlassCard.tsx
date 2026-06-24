import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { palette, radii } from "../constants/theme";

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GlassCard = ({ children, style }: GlassCardProps) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3
  }
});
