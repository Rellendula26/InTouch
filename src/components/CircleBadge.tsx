import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { radii } from "../constants/theme";

interface CircleBadgeProps {
  label: string;
  color: string;
}

export const CircleBadge = ({ label, color }: CircleBadgeProps) => (
  <View style={[styles.badge, { backgroundColor: `${color}44`, borderColor: `${color}88` }]}>
    <Text style={[styles.text, { color }]} numberOfLines={1}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 6
  },
  text: {
    fontSize: 12,
    fontWeight: "600"
  }
});
