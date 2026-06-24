import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { palette } from "../constants/theme";
import { formatDateLabel } from "../lib/date";
import { CallLog, Circle } from "../types/models";
import { CircleBadge } from "./CircleBadge";
import { GlassCard } from "./GlassCard";

interface MemoryCardProps {
  log: CallLog;
  circlesById: Map<string, Circle>;
}

const statusLabel: Record<CallLog["status"], string> = {
  connected: "Connected",
  no_answer: "No Answer",
  call_later: "Call Later"
};

export const MemoryCard = ({ log, circlesById }: MemoryCardProps) => (
  <GlassCard style={styles.card}>
    <Text style={styles.name}>{log.contactName}</Text>
    <Text style={styles.meta}>
      {statusLabel[log.status]} • {formatDateLabel(log.timestamp)}
    </Text>
    {!!log.circleIds.length && (
      <View style={styles.badgesWrap}>
        {log.circleIds.slice(0, 3).map((circleId) => {
          const circle = circlesById.get(circleId);
          if (!circle) {
            return null;
          }
          return <CircleBadge key={circle.id} label={circle.name} color={circle.color} />;
        })}
      </View>
    )}
    {!!log.note && <Text style={styles.note}>{log.note}</Text>}
  </GlassCard>
);

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textPrimary
  },
  meta: {
    marginTop: 4,
    color: palette.textSecondary
  },
  badgesWrap: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  note: {
    marginTop: 10,
    color: palette.textPrimary,
    lineHeight: 20
  }
});
