import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";
import React, { useMemo, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { CircleBadge } from "../components/CircleBadge";
import { GlassCard } from "../components/GlassCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { palette } from "../constants/theme";
import { formatDateLabel } from "../lib/date";
import { RootStackParamList } from "../navigation/types";
import { useAppState } from "../hooks/useAppState";

type RecommendationRoute = RouteProp<RootStackParamList, "Recommendations">;
type RecommendationNav = NativeStackNavigationProp<RootStackParamList, "Recommendations">;

export const RecommendationScreen = () => {
  const navigation = useNavigation<RecommendationNav>();
  const route = useRoute<RecommendationRoute>();
  const { state, pickThreePeople, replaceRecommendation, getLastCallDateByContactId, isDailyUnlocked } = useAppState();
  const [recommendations, setRecommendations] = useState(route.params.contacts);

  const circlesById = useMemo(() => new Map(state.circles.map((circle) => [circle.id, circle])), [state.circles]);

  const handleReplace = (contactId: string) => {
    setRecommendations((current) => replaceRecommendation(current, contactId));
  };

  const handleRefreshAll = () => {
    setRecommendations(pickThreePeople());
  };

  const handleCall = async (phoneNumber: string, contactId: string) => {
    const contact = recommendations.find((item) => item.id === contactId);
    if (!contact) {
      return;
    }
    const target = `tel:${phoneNumber}`;
    const canOpen = await Linking.canOpenURL(target);
    if (!canOpen) {
      Alert.alert("Call unavailable", "Could not open your phone dialer for this contact.");
      return;
    }
    await Linking.openURL(target);
    navigation.navigate("Reflection", { contact });
  };

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Pick 3 people</Text>
          <Text style={styles.subtitle}>Call one now. Save the memory after.</Text>

          {isDailyUnlocked && (
            <GlassCard style={styles.quickBar}>
              <View style={styles.quickBarTop}>
                <Text style={styles.quickLabel}>Today's 3</Text>
                <TouchableOpacity onPress={handleRefreshAll}>
                  <Text style={styles.refreshText}>Refresh all</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.quickHint}>Tap call on any card to start your conversation fast.</Text>
            </GlassCard>
          )}

          {!isDailyUnlocked && (
            <GlassCard style={styles.lockedCard}>
              <Text style={styles.emptyTitle}>Daily picks are locked</Text>
              <Text style={styles.emptyBody}>Make one call from Home first, then your 3-person picks unlock.</Text>
              <PrimaryButton
                label="Back to Home"
                onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
              />
            </GlassCard>
          )}

          {isDailyUnlocked && !recommendations.length && (
            <GlassCard>
              <Text style={styles.emptyTitle}>No recommendations yet</Text>
              <Text style={styles.emptyBody}>Go back and adjust circles, then pick 3 again.</Text>
            </GlassCard>
          )}

          {isDailyUnlocked &&
            recommendations.map((contact, index) => {
            const lastCallDate = getLastCallDateByContactId(contact.id);
            return (
              <GlassCard key={contact.id} style={[styles.card, index === 0 && styles.firstCard]}>
                <View style={styles.cardTop}>
                  <Text style={styles.rankPill}>#{index + 1}</Text>
                </View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.meta}>
                  Last call: {lastCallDate ? formatDateLabel(lastCallDate) : "No calls logged yet"}
                </Text>
                <View style={styles.badgesWrap}>
                  {contact.circles.map((circleId) => {
                    const circle = circlesById.get(circleId);
                    if (!circle) {
                      return null;
                    }
                    return <CircleBadge key={circle.id} label={circle.name} color={circle.color} />;
                  })}
                </View>
                <View style={styles.actionRow}>
                  <View style={styles.grow}>
                    <PrimaryButton label="Call" onPress={() => handleCall(contact.phoneNumber, contact.id)} />
                  </View>
                  <TouchableOpacity onPress={() => handleReplace(contact.id)} style={styles.replaceButton}>
                    <Text style={styles.replaceText}>Replace</Text>
                  </TouchableOpacity>
                </View>
              </GlassCard>
            );
          })}
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
    fontSize: 34,
    color: palette.textPrimary,
    fontWeight: "800"
  },
  subtitle: {
    marginTop: 8,
    color: palette.textSecondary,
    marginBottom: 12
  },
  quickBar: {
    marginBottom: 6
  },
  quickBarTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  quickLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textPrimary
  },
  refreshText: {
    color: palette.accent,
    fontWeight: "700"
  },
  quickHint: {
    marginTop: 6,
    color: palette.textSecondary
  },
  card: {
    marginTop: 12
  },
  firstCard: {
    borderColor: "rgba(139, 116, 217, 0.35)",
    borderWidth: 1.2
  },
  lockedCard: {
    marginTop: 4,
    gap: 10
  },
  cardTop: {
    alignItems: "flex-start"
  },
  rankPill: {
    color: palette.accent,
    fontWeight: "700",
    fontSize: 12,
    backgroundColor: "rgba(139, 116, 217, 0.15)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden"
  },
  contactName: {
    fontSize: 22,
    fontWeight: "700",
    color: palette.textPrimary
  },
  meta: {
    marginTop: 6,
    color: palette.textSecondary
  },
  badgesWrap: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14
  },
  grow: {
    flex: 1
  },
  replaceButton: {
    marginLeft: 12,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  replaceText: {
    color: palette.accent,
    fontWeight: "700"
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textPrimary
  },
  emptyBody: {
    marginTop: 8,
    color: palette.textSecondary
  }
});
