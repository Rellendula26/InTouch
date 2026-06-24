import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { palette } from "../constants/theme";
import { Circle, Contact } from "../types/models";
import { CircleBadge } from "./CircleBadge";
import { GlassCard } from "./GlassCard";

interface ContactRowProps {
  contact: Contact;
  circlesById: Map<string, Circle>;
  selected: boolean;
  onToggle: () => void;
}

export const ContactRow = ({ contact, circlesById, selected, onToggle }: ContactRowProps) => (
  <Pressable onPress={onToggle}>
    <GlassCard style={[styles.card, selected && styles.cardSelected]}>
      <View style={styles.topRow}>
        <View style={styles.identity}>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.phone}>{contact.phoneNumber}</Text>
        </View>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && <Text style={styles.check}>✓</Text>}
        </View>
      </View>
      {!!contact.circles.length && (
        <View style={styles.tags}>
          {contact.circles.map((circleId) => {
            const circle = circlesById.get(circleId);
            if (!circle) {
              return null;
            }
            return <CircleBadge key={circle.id} label={circle.name} color={circle.color} />;
          })}
        </View>
      )}
    </GlassCard>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 12
  },
  cardSelected: {
    borderColor: palette.accent,
    borderWidth: 2
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  identity: {
    flex: 1
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: palette.textPrimary
  },
  phone: {
    marginTop: 4,
    color: palette.textSecondary
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: palette.borderSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxSelected: {
    backgroundColor: palette.accent
  },
  check: {
    color: "#fff",
    fontWeight: "800"
  },
  tags: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
