import "react-native-gesture-handler";

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";

import { useAppState, AppStateProvider } from "./src/hooks/useAppState";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { LaunchScreen } from "./src/screens/LaunchScreen";
import { palette } from "./src/constants/theme";

const BootstrapGate = () => {
  const { bootstrapped } = useAppState();
  const [minimumSplashDone, setMinimumSplashDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinimumSplashDone(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!bootstrapped || !minimumSplashDone) {
    return <LaunchScreen />;
  }
  return <AppNavigator />;
};

export default function App() {
  const isWeb = Platform.OS === "web";

  return (
    <AppStateProvider>
      <StatusBar style="dark" />
      {isWeb ? (
        <View style={styles.webFrame}>
          <View style={styles.webPhoneSurface}>
            <BootstrapGate />
          </View>
        </View>
      ) : (
        <BootstrapGate />
      )}
    </AppStateProvider>
  );
}

const styles = StyleSheet.create({
  webFrame: {
    flex: 1,
    backgroundColor: "#F4EEF8",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18
  },
  webPhoneSurface: {
    width: "100%",
    maxWidth: 470,
    flex: 1,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(108, 88, 167, 0.12)",
    backgroundColor: palette.background,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 }
  }
});
