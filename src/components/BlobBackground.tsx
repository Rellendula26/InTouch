import React from "react";
import { StyleSheet, View } from "react-native";

import { blobColors, palette } from "../constants/theme";
import { FloatingGradient } from "./FloatingGradient";

export const BlobBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <FloatingGradient color={blobColors[0]!} size={250} top={-70} left={-80} duration={15000} />
        <FloatingGradient color={blobColors[1]!} size={210} top={120} left={220} duration={17000} />
        <FloatingGradient color={blobColors[2]!} size={190} top={340} left={-60} duration={14500} />
        <FloatingGradient color={blobColors[3]!} size={220} top={520} left={180} duration={18000} />
        <FloatingGradient color={blobColors[4]!} size={170} top={30} left={120} duration={16000} />
        <FloatingGradient color={blobColors[5]!} size={150} top={500} left={20} duration={15500} />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "none" as const
  }
});
