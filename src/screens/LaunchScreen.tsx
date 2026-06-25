import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { blobColors, palette } from "../constants/theme";
import { type } from "../constants/typography";
import { FloatingGradient } from "../components/FloatingGradient";

export const LaunchScreen = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1100,
      useNativeDriver: false
    }).start();
  }, [progress]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer}>
        <FloatingGradient color={blobColors[0]!} size={170} top={90} left={30} duration={14000} />
        <FloatingGradient color={blobColors[1]!} size={130} top={150} left={170} duration={15000} />
        <FloatingGradient color={blobColors[3]!} size={150} top={260} left={90} duration={16000} />
      </View>

      <Text style={styles.wordmark}>InTouch</Text>
      <Text style={styles.tagline}>Real calls. Real people.</Text>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressBar, { width }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0C16",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFill,
    opacity: 0.85
  },
  wordmark: {
    color: palette.white,
    fontSize: 46,
    fontFamily: type.brand,
    fontWeight: "700"
  },
  tagline: {
    marginTop: 8,
    color: "rgba(255,255,255,0.82)",
    fontSize: 17,
    fontFamily: type.body
  },
  progressTrack: {
    marginTop: 30,
    width: 170,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden"
  },
  progressBar: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "rgba(191, 167, 248, 0.95)"
  }
});
