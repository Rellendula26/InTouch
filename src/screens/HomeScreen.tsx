import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { CircleBadge } from "../components/CircleBadge";
import { GlassCard } from "../components/GlassCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { appCopy } from "../constants/copy";
import { palette } from "../constants/theme";
import { useAppState } from "../hooks/useAppState";
import { RootStackParamList } from "../navigation/types";

type HomeNavigation = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigation>();
  const { state, setSelectedCircleIds, pickThreePeople } = useAppState();

  const toggleCircle = (circleId: string) => {
    if (state.selectedCircleIds.includes(circleId)) {
      setSelectedCircleIds(state.selectedCircleIds.filter((id) => id !== circleId));
      return;
    }
    setSelectedCircleIds([...state.selectedCircleIds, circleId]);
  };

  const handlePickThree = () => {
    const contacts = pickThreePeople();
    navigation.navigate("Recommendations", { contacts });
  };

  const eligibleContacts = state.contacts.filter((contact) => {
    if (!state.selectedCircleIds.length) {
      return true;
    }
    return contact.circles.some((circleId) => state.selectedCircleIds.includes(circleId));
  });

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{appCopy.title}</Text>
          <Text style={styles.subtitle}>{appCopy.thesis}</Text>

          <GlassCard style={styles.heroCard}>
            <Text style={styles.heroText}>Pick one person to call today.</Text>
            <Text style={styles.supportText}>
              {eligibleContacts.length} contact{eligibleContacts.length === 1 ? "" : "s"} available
            </Text>
            <PrimaryButton
              label="Pick 3 People"
              onPress={handlePickThree}
              disabled={eligibleContacts.length === 0}
            />
          </GlassCard>

          <Text style={styles.sectionTitle}>Draw from circles</Text>
          {!state.circles.length && (
            <GlassCard>
              <Text style={styles.emptyTitle}>No circles yet</Text>
              <Text style={styles.emptyBody}>
                Create your first circle in the Circles tab, then come back here to focus your suggestions.
              </Text>
            </GlassCard>
          )}
          <View style={styles.chipsWrap}>
            {state.circles.map((circle) => (
              <TouchableOpacity key={circle.id} onPress={() => toggleCircle(circle.id)} activeOpacity={0.9}>
                <View
                  style={[
                    styles.circleChip,
                    state.selectedCircleIds.includes(circle.id) && {
                      borderColor: circle.color,
                      backgroundColor: `${circle.color}44`
                    }
                  ]}
                >
                  <CircleBadge label={circle.name} color={circle.color} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </BlobBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: palette.textPrimary
  },
  subtitle: {
    marginTop: 8,
    fontSize: 17,
    color: palette.textSecondary
  },
  heroCard: {
    marginTop: 24,
    gap: 12
  },
  heroText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: palette.textPrimary
  },
  supportText: {
    fontSize: 15,
    color: palette.textSecondary
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 12,
    fontSize: 19,
    fontWeight: "700",
    color: palette.textPrimary
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  circleChip: {
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "transparent"
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: palette.textPrimary
  },
  emptyBody: {
    marginTop: 8,
    color: palette.textSecondary,
    lineHeight: 20
  }
});
