import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { CircleBadge } from "../components/CircleBadge";
import { GlassCard } from "../components/GlassCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { circleColorOptions, palette } from "../constants/theme";
import { useAppState } from "../hooks/useAppState";
import { CirclesStackParamList } from "../navigation/types";

type CircleNav = NativeStackNavigationProp<CirclesStackParamList, "CircleManagement">;

export const CircleManagementScreen = () => {
  const navigation = useNavigation<CircleNav>();
  const { state, createCircle, updateCircle, deleteCircle } = useAppState();
  const [draftName, setDraftName] = useState("");
  const [draftColor, setDraftColor] = useState(circleColorOptions[0]!);
  const [editingCircleId, setEditingCircleId] = useState<string | null>(null);

  const contactCountByCircleId = useMemo(() => {
    const counts = new Map<string, number>();
    state.contacts.forEach((contact) => {
      contact.circles.forEach((circleId) => {
        counts.set(circleId, (counts.get(circleId) ?? 0) + 1);
      });
    });
    return counts;
  }, [state.contacts]);

  const resetForm = () => {
    setDraftName("");
    setDraftColor(circleColorOptions[0]!);
    setEditingCircleId(null);
  };

  const submitCircle = () => {
    if (editingCircleId) {
      updateCircle(editingCircleId, { name: draftName, color: draftColor });
    } else {
      createCircle(draftName, draftColor);
    }
    resetForm();
  };

  const startEdit = (circleId: string) => {
    const circle = state.circles.find((item) => item.id === circleId);
    if (!circle) {
      return;
    }
    setEditingCircleId(circle.id);
    setDraftName(circle.name);
    setDraftColor(circle.color);
  };

  const confirmDelete = (circleId: string) => {
    Alert.alert("Delete circle?", "This removes it from all contact assignments.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteCircle(circleId) }
    ]);
  };

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={state.circles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View>
              <Text style={styles.title}>Circles</Text>
              <Text style={styles.subtitle}>Create warm relationship groups and keep them intentional.</Text>

              <GlassCard style={styles.formCard}>
                <Text style={styles.formTitle}>{editingCircleId ? "Edit Circle" : "Create Circle"}</Text>
                <TextInput
                  value={draftName}
                  onChangeText={setDraftName}
                  placeholder="Circle name"
                  placeholderTextColor={palette.textSecondary}
                  style={styles.input}
                />
                <View style={styles.colorRow}>
                  {circleColorOptions.map((color) => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => setDraftColor(color)}
                      style={[styles.colorDot, { backgroundColor: color }, draftColor === color && styles.colorSelected]}
                    />
                  ))}
                </View>
                <PrimaryButton
                  label={editingCircleId ? "Save Circle" : "Create Circle"}
                  onPress={submitCircle}
                  disabled={!draftName.trim()}
                />
                <TouchableOpacity onPress={() => navigation.navigate("ContactSelection")} style={styles.linkButton}>
                  <Text style={styles.linkText}>Assign contacts to circles</Text>
                </TouchableOpacity>
              </GlassCard>
            </View>
          }
          renderItem={({ item }) => (
            <GlassCard style={styles.circleCard}>
              <View style={styles.circleRow}>
                <View style={styles.circleLeft}>
                  <CircleBadge label={item.name} color={item.color} />
                  <Text style={styles.count}>{contactCountByCircleId.get(item.id) ?? 0} contacts</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => startEdit(item.id)}>
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                    <Text style={[styles.actionText, styles.delete]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </GlassCard>
          )}
          ListEmptyComponent={
            <GlassCard>
              <Text style={styles.emptyTitle}>Start with one circle</Text>
              <Text style={styles.emptyBody}>Try Family, Close Friends, Mentors, or create your own.</Text>
            </GlassCard>
          }
        />
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
    color: palette.textSecondary,
    lineHeight: 22
  },
  formCard: {
    marginTop: 18
  },
  formTitle: {
    fontSize: 18,
    color: palette.textPrimary,
    fontWeight: "700",
    marginBottom: 10
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 16,
    color: palette.textPrimary
  },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 12
  },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  colorSelected: {
    borderColor: palette.textPrimary,
    borderWidth: 2
  },
  linkButton: {
    marginTop: 12
  },
  linkText: {
    color: palette.accent,
    fontWeight: "600"
  },
  circleCard: {
    marginTop: 12
  },
  circleRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  circleLeft: {
    flex: 1
  },
  count: {
    marginTop: 6,
    color: palette.textSecondary
  },
  actions: {
    flexDirection: "row",
    gap: 14
  },
  actionText: {
    color: palette.accent,
    fontWeight: "700"
  },
  delete: {
    color: "#B56767"
  },
  emptyTitle: {
    fontSize: 17,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  emptyBody: {
    marginTop: 8,
    color: palette.textSecondary
  }
});
