import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { GlassCard } from "../components/GlassCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { palette } from "../constants/theme";
import { useAppState } from "../hooks/useAppState";
import { RootStackParamList } from "../navigation/types";
import { CallStatus } from "../types/models";

type ReflectionRoute = RouteProp<RootStackParamList, "Reflection">;

const options: Array<{ value: CallStatus; label: string }> = [
  { value: "connected", label: "Connected" },
  { value: "no_answer", label: "No Answer" },
  { value: "call_later", label: "Call Later" }
];

export const ReflectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ReflectionRoute>();
  const { addCallLog } = useAppState();
  const [status, setStatus] = useState<CallStatus>("connected");
  const [note, setNote] = useState("");

  const save = () => {
    addCallLog({
      contactId: route.params.contact.id,
      contactName: route.params.contact.name,
      status,
      note
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "MainTabs", params: { screen: "Home" } }]
      })
    );
  };

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>How did it go?</Text>
          <Text style={styles.subtitle}>with {route.params.contact.name}</Text>

          <GlassCard>
            <View style={styles.statusGrid}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setStatus(option.value)}
                  style={[styles.statusButton, status === option.value && styles.statusButtonSelected]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      status === option.value && styles.statusTextSelected
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {status === "connected" && (
              <View style={styles.noteContainer}>
                <Text style={styles.noteLabel}>What did you talk about?</Text>
                <TextInput
                  value={note}
                  onChangeText={setNote}
                  placeholder="Add a short memory..."
                  placeholderTextColor={palette.textSecondary}
                  multiline
                  style={styles.noteInput}
                />
              </View>
            )}

            <PrimaryButton label="Save Memory" onPress={save} />
          </GlassCard>
        </View>
      </SafeAreaView>
    </BlobBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: palette.textPrimary
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
    color: palette.textSecondary
  },
  statusGrid: {
    gap: 10,
    marginBottom: 14
  },
  statusButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.72)"
  },
  statusButtonSelected: {
    borderColor: palette.accent,
    backgroundColor: "rgba(139,116,217,0.16)"
  },
  statusText: {
    color: palette.textPrimary,
    fontWeight: "600"
  },
  statusTextSelected: {
    color: palette.accent
  },
  noteContainer: {
    marginBottom: 14
  },
  noteLabel: {
    fontWeight: "600",
    marginBottom: 8,
    color: palette.textPrimary
  },
  noteInput: {
    minHeight: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.72)",
    color: palette.textPrimary,
    textAlignVertical: "top"
  }
});
