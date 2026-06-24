import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { GlassCard } from "../components/GlassCard";
import { palette } from "../constants/theme";
import { formatTimeLabel } from "../lib/date";
import { useAppState } from "../hooks/useAppState";
import { requestNotificationPermission } from "../services/notificationService";
import { ReminderTime } from "../types/models";

const reminderOptions: ReminderTime[] = [
  { hour: 8, minute: 0 },
  { hour: 12, minute: 30 },
  { hour: 18, minute: 0 },
  { hour: 20, minute: 0 },
  { hour: 21, minute: 30 }
];

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { state, setReminderEnabled, setReminderTime } = useAppState();

  const onToggleNotifications = async (value: boolean) => {
    if (!value) {
      await setReminderEnabled(false);
      return;
    }
    const granted = await requestNotificationPermission();
    if (!granted) {
      Alert.alert(
        "Notifications disabled",
        "Enable notification permissions in system settings to receive reminders."
      );
      return;
    }
    await setReminderEnabled(true);
  };

  const exportData = () => {
    const payload = {
      circles: state.circles,
      contacts: state.contacts,
      callLogs: state.callLogs
    };
    Alert.alert(
      "Export Preview",
      `This future-ready export currently generates local JSON (${JSON.stringify(payload).length} bytes).`
    );
  };

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Keep reminders gentle and in your control.</Text>

          <GlassCard style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Daily reminders</Text>
              <Switch
                value={state.notificationsEnabled}
                onValueChange={onToggleNotifications}
                thumbColor="#fff"
                trackColor={{ false: "#D8CEDF", true: "#B3A1EA" }}
              />
            </View>
            <Text style={styles.rowCaption}>
              Someone would probably love to hear from you.
            </Text>
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Reminder Time</Text>
            <View style={styles.timesWrap}>
              {reminderOptions.map((option) => {
                const selected =
                  state.reminderTime.hour === option.hour && state.reminderTime.minute === option.minute;
                return (
                  <TouchableOpacity
                    key={`${option.hour}-${option.minute}`}
                    onPress={() => setReminderTime(option)}
                    style={[styles.timeButton, selected && styles.timeButtonSelected]}
                  >
                    <Text style={[styles.timeLabel, selected && styles.timeLabelSelected]}>
                      {formatTimeLabel(option.hour, option.minute)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </GlassCard>

          <GlassCard style={styles.section}>
            <TouchableOpacity onPress={() => navigation.navigate("CirclesStack" as never)}>
              <Text style={styles.linkTitle}>Manage Circles</Text>
              <Text style={styles.rowCaption}>Create, edit, and organize your relationship circles.</Text>
            </TouchableOpacity>
          </GlassCard>

          <GlassCard style={styles.section}>
            <TouchableOpacity onPress={exportData}>
              <Text style={styles.linkTitle}>Export Local Data</Text>
              <Text style={styles.rowCaption}>
                Future-ready export entry point for your on-device relationship history.
              </Text>
            </TouchableOpacity>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </BlobBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    padding: 20,
    paddingBottom: 120
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: palette.textPrimary
  },
  subtitle: {
    marginTop: 8,
    color: palette.textSecondary
  },
  section: {
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: palette.textPrimary,
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: palette.textPrimary
  },
  rowCaption: {
    marginTop: 8,
    color: palette.textSecondary,
    lineHeight: 20
  },
  timesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    backgroundColor: "rgba(255,255,255,0.72)"
  },
  timeButtonSelected: {
    borderColor: palette.accent,
    backgroundColor: "rgba(139,116,217,0.15)"
  },
  timeLabel: {
    color: palette.textPrimary,
    fontWeight: "600"
  },
  timeLabelSelected: {
    color: palette.accent
  },
  linkTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: palette.textPrimary
  }
});
