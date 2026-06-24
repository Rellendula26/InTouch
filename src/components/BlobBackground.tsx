import React from "react";
import { StyleSheet, View } from "react-native";

import { blobColors, palette } from "../constants/theme";
import { FloatingGradient } from "./FloatingGradient";

export const BlobBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <FloatingGradient color={blobColors[0]!} size={220} top={-50} left={-60} duration={10000} />
        <FloatingGradient color={blobColors[1]!} size={190} top={140} left={220} duration={12000} />
        <FloatingGradient color={blobColors[2]!} size={180} top={350} left={-40} duration={9500} />
        <FloatingGradient color={blobColors[3]!} size={200} top={520} left={190} duration={11000} />
        <FloatingGradient color={blobColors[4]!} size={160} top={40} left={130} duration={8500} />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background
  }
});
