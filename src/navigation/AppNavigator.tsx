import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";

import { palette } from "../constants/theme";
import { useAppState } from "../hooks/useAppState";
import { CircleManagementScreen } from "../screens/CircleManagementScreen";
import { ContactSelectionScreen } from "../screens/ContactSelectionScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { RecommendationScreen } from "../screens/RecommendationScreen";
import { ReflectionScreen } from "../screens/ReflectionScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { TimelineScreen } from "../screens/TimelineScreen";
import { CirclesStackParamList, MainTabParamList, RootStackParamList } from "./types";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const CirclesStack = createNativeStackNavigator<CirclesStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.background
  }
};

const tabIcon = (icon: string) => ({ focused }: { focused: boolean }) => (
  <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.55 }}>{icon}</Text>
);

const CirclesNavigator = () => (
  <CirclesStack.Navigator>
    <CirclesStack.Screen
      name="CircleManagement"
      component={CircleManagementScreen}
      options={{ title: "Circles", headerShown: false }}
    />
    <CirclesStack.Screen
      name="ContactSelection"
      component={ContactSelectionScreen}
      options={{ title: "Contacts", headerShown: false }}
    />
  </CirclesStack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "rgba(255,255,255,0.88)",
        borderTopColor: "rgba(0,0,0,0.06)",
        position: "absolute"
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600"
      },
      tabBarActiveTintColor: palette.accent,
      tabBarInactiveTintColor: palette.textSecondary
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: tabIcon("☎️"), title: "Home" }} />
    <Tab.Screen
      name="CirclesStack"
      component={CirclesNavigator}
      options={{ tabBarIcon: tabIcon("🫧"), title: "Circles" }}
    />
    <Tab.Screen
      name="Timeline"
      component={TimelineScreen}
      options={{ tabBarIcon: tabIcon("📝"), title: "Memories" }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ tabBarIcon: tabIcon("⚙️"), title: "Settings" }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { state } = useAppState();
  return (
    <NavigationContainer theme={navTheme}>
      {!state.onboardingCompleted ? (
        <OnboardingScreen />
      ) : (
        <RootStack.Navigator>
          <RootStack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <RootStack.Screen
            name="Recommendations"
            component={RecommendationScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="Reflection" component={ReflectionScreen} options={{ headerShown: false }} />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};
