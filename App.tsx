import "react-native-gesture-handler";

import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { palette } from "./src/constants/theme";
import { useAppState, AppStateProvider } from "./src/hooks/useAppState";
import { AppNavigator } from "./src/navigation/AppNavigator";

const BootstrapGate = () => {
  const { bootstrapped } = useAppState();
  if (!bootstrapped) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={palette.accent} />
      </View>
    );
  }
  return <AppNavigator />;
};

export default function App() {
  return (
    <AppStateProvider>
      <StatusBar style="dark" />
      <BootstrapGate />
    </AppStateProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.background
  }
});
