import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "./keys";
import { AppState } from "../types/models";

export const defaultAppState: AppState = {
  onboardingCompleted: false,
  circles: [],
  contacts: [],
  callLogs: [],
  selectedCircleIds: [],
  notificationsEnabled: false,
  reminderTime: { hour: 20, minute: 0 }
};

export const loadAppState = async (): Promise<AppState> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.appState);
    if (!value) {
      return defaultAppState;
    }
    const parsed = JSON.parse(value) as Partial<AppState>;
    return {
      ...defaultAppState,
      ...parsed,
      reminderTime: parsed.reminderTime ?? defaultAppState.reminderTime
    };
  } catch {
    return defaultAppState;
  }
};

export const saveAppState = async (state: AppState): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.appState, JSON.stringify(state));
};
