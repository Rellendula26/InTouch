import React, { useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { GlassCard } from "../components/GlassCard";
import { MemoryCard } from "../components/MemoryCard";
import { palette } from "../constants/theme";
import { dateKey, formatDateLabel } from "../lib/date";
import { useAppState } from "../hooks/useAppState";

export const TimelineScreen = () => {
  const { state } = useAppState();

  const circlesById = useMemo(() => new Map(state.circles.map((circle) => [circle.id, circle])), [state.circles]);

  const grouped = useMemo(() => {
    const groupedMap = new Map<string, typeof state.callLogs>();
    state.callLogs.forEach((log) => {
      const key = dateKey(log.timestamp);
      groupedMap.set(key, [...(groupedMap.get(key) ?? []), log]);
    });
    return [...groupedMap.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [state.callLogs]);

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Memories</Text>
          <Text style={styles.subtitle}>A lightweight journal of meaningful conversations.</Text>

          {!grouped.length && (
            <GlassCard style={styles.empty}>
              <Text style={styles.emptyTitle}>No call memories yet</Text>
              <Text style={styles.emptyBody}>After your next conversation, save a memory and it will show up here.</Text>
            </GlassCard>
          )}

          {grouped.map(([key, logs]) => (
            <View key={key} style={styles.group}>
              <Text style={styles.groupTitle}>{formatDateLabel(logs[0]!.timestamp)}</Text>
              {logs.map((log) => (
                <MemoryCard key={log.id} log={log} circlesById={circlesById} />
              ))}
            </View>
          ))}
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
  empty: {
    marginTop: 18
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textPrimary
  },
  emptyBody: {
    marginTop: 8,
    color: palette.textSecondary
  },
  group: {
    marginTop: 18
  },
  groupTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700",
    color: palette.textSecondary
  }
});
