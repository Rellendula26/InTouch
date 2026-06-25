import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import React, { useEffect, useMemo, useRef } from "react";
import { Alert, Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { CircleBadge } from "../components/CircleBadge";
import { GlassCard } from "../components/GlassCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { appCopy } from "../constants/copy";
import { palette } from "../constants/theme";
import { type } from "../constants/typography";
import { useAppState } from "../hooks/useAppState";
import { dateKey } from "../lib/date";
import { RootStackParamList } from "../navigation/types";

type HomeNavigation = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigation>();
  const { state, setSelectedCircleIds, pickThreePeople, isDailyUnlocked, getDailyPromptContact } = useAppState();
  const ctaPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(ctaPulse, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: false
        }),
        Animated.timing(ctaPulse, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: false
        })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [ctaPulse]);

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

  const handleUnlockCall = async () => {
    const contact = getDailyPromptContact();
    if (!contact) {
      return;
    }

    const target = `tel:${contact.phoneNumber}`;
    const canOpen = await Linking.canOpenURL(target);
    if (!canOpen) {
      Alert.alert("Call unavailable", "Could not open your phone dialer for this contact.");
      return;
    }
    await Linking.openURL(target);
    navigation.navigate("Reflection", { contact });
  };

  const openCircles = () => {
    navigation.navigate("MainTabs", {
      screen: "CirclesStack",
      params: { screen: "CircleManagement" }
    });
  };

  const openContacts = () => {
    navigation.navigate("MainTabs", {
      screen: "CirclesStack",
      params: { screen: "ContactSelection" }
    });
  };

  const eligibleContacts = state.contacts.filter((contact) => {
    if (!state.selectedCircleIds.length) {
      return true;
    }
    return contact.circles.some((circleId) => state.selectedCircleIds.includes(circleId));
  });

  const streak = useMemo(() => {
    const connectedDays = new Set(
      state.callLogs.filter((log) => log.status === "connected").map((log) => dateKey(log.timestamp))
    );

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    let currentStreak = 0;
    for (let i = 0; i < 365; i += 1) {
      const day = new Date(startOfToday);
      day.setDate(startOfToday.getDate() - i);
      const key = dateKey(day.toISOString());
      if (!connectedDays.has(key)) {
        break;
      }
      currentStreak += 1;
    }

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfToday);
      day.setDate(startOfToday.getDate() - (6 - i));
      return dateKey(day.toISOString());
    });
    const weekConnectedCount = last7Days.filter((key) => connectedDays.has(key)).length;

    return {
      currentStreak,
      weekConnectedCount,
      last7Days,
      connectedDays
    };
  }, [state.callLogs]);

  const dailyPromptContact = getDailyPromptContact();

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{appCopy.title}</Text>
          <Text style={styles.subtitle}>{appCopy.thesis}</Text>

          <GlassCard style={styles.streakCard}>
            <View style={styles.streakTop}>
              <Text style={styles.streakIcon}>🔥</Text>
              <View style={styles.streakMeta}>
                <Text style={styles.streakValue}>
                  {streak.currentStreak > 0 ? `${streak.currentStreak}-day call streak` : "Start today's streak"}
                </Text>
                <Text style={styles.streakHint}>
                  You've kept in touch {streak.weekConnectedCount} day{streak.weekConnectedCount === 1 ? "" : "s"} this
                  week.
                </Text>
              </View>
            </View>
            <View style={styles.dotRow}>
              {streak.last7Days.map((key) => (
                <View
                  key={key}
                  style={[
                    styles.dot,
                    streak.connectedDays.has(key) ? styles.dotActive : styles.dotInactive
                  ]}
                />
              ))}
            </View>
          </GlassCard>

          {!isDailyUnlocked && !!dailyPromptContact && (
            <GlassCard style={styles.lockCard}>
              <Text style={styles.lockTitle}>Your people are waiting.</Text>
              <Text style={styles.lockBody}>
                Make one call to unlock today's circles and 3-person picks.
              </Text>
              <View style={styles.lockTarget}>
                <Text style={styles.lockTargetLabel}>Today's unlock call</Text>
                <Text style={styles.lockTargetName}>{dailyPromptContact.name}</Text>
              </View>
              <PrimaryButton label="🔓 Make a call" onPress={handleUnlockCall} />
            </GlassCard>
          )}

          <GlassCard style={styles.heroCard}>
            <Text style={styles.heroText}>Pick someone to call today.</Text>
            <Text style={styles.supportText}>
              {eligibleContacts.length} possible connection{eligibleContacts.length === 1 ? "" : "s"} right now
            </Text>
            <View style={styles.ctaWrap}>
              <Animated.View
                style={[
                  styles.ctaPulse,
                  {
                    opacity: ctaPulse.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.42] }),
                    transform: [
                      {
                        scale: ctaPulse.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.06] })
                      }
                    ]
                  }
                ]}
              />
              <PrimaryButton
                label="✨ Pick 3 People"
                onPress={handlePickThree}
                disabled={eligibleContacts.length === 0 || !isDailyUnlocked}
              />
            </View>
            {!isDailyUnlocked && (
              <Text style={styles.lockHint}>Complete one call to unlock your full daily suggestions.</Text>
            )}
            {!!state.selectedCircleIds.length && (
              <TouchableOpacity onPress={() => setSelectedCircleIds([])} style={styles.resetLink}>
                <Text style={styles.resetText}>Clear filters and draw from everyone</Text>
              </TouchableOpacity>
            )}
          </GlassCard>

          <Text style={styles.sectionTitle}>Draw from circles</Text>
          <Text style={styles.sectionSubtitle}>
            Circles are custom relationship groups like Family, Mentors, or Close Friends.
          </Text>
          {!state.circles.length && (
            <GlassCard style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No circles yet</Text>
              <Text style={styles.emptyBody}>
                Create one circle to make calling feel intentional instead of random.
              </Text>
              <PrimaryButton label="Create Your First Circle" onPress={openCircles} />
            </GlassCard>
          )}
          {!state.contacts.length && (
            <GlassCard style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No contacts imported yet</Text>
              <Text style={styles.emptyBody}>
                Import contacts and assign a few people to circles so daily call picks are ready.
              </Text>
              <PrimaryButton label="Import & Assign Contacts" onPress={openContacts} />
            </GlassCard>
          )}
          {!!state.circles.length && !!state.contacts.length && !eligibleContacts.length && (
            <GlassCard style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No matches in selected circles</Text>
              <Text style={styles.emptyBody}>
                Try another circle or add contacts to your current ones.
              </Text>
              <PrimaryButton label="Manage Circle Contacts" onPress={openContacts} />
            </GlassCard>
          )}
          <View style={[styles.chipsWrap, !isDailyUnlocked && styles.chipsDisabled]}>
            {!!state.circles.length && (
              <TouchableOpacity onPress={() => setSelectedCircleIds([])} activeOpacity={0.9}>
                <View style={[styles.allChip, !state.selectedCircleIds.length && styles.allChipActive]}>
                  <Text style={[styles.allChipText, !state.selectedCircleIds.length && styles.allChipTextActive]}>
                    Everyone
                  </Text>
                </View>
              </TouchableOpacity>
            )}
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
    color: palette.textPrimary,
    fontFamily: type.brand
  },
  subtitle: {
    marginTop: 8,
    fontSize: 17,
    color: palette.textSecondary
  },
  heroCard: {
    marginTop: 14,
    gap: 12
  },
  streakCard: {
    marginTop: 22
  },
  lockCard: {
    marginTop: 14,
    gap: 10
  },
  lockTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.textPrimary,
    fontFamily: type.heading
  },
  lockBody: {
    color: palette.textSecondary,
    lineHeight: 20,
    fontFamily: type.body
  },
  lockTarget: {
    backgroundColor: "rgba(139, 116, 217, 0.1)",
    borderRadius: 14,
    padding: 12
  },
  lockTargetLabel: {
    color: palette.textSecondary,
    fontSize: 12,
    fontWeight: "600"
  },
  lockTargetName: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: palette.textPrimary,
    fontFamily: type.heading
  },
  streakTop: {
    flexDirection: "row",
    alignItems: "center"
  },
  streakIcon: {
    fontSize: 24
  },
  streakMeta: {
    marginLeft: 10,
    flex: 1
  },
  streakValue: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textPrimary
  },
  streakHint: {
    marginTop: 4,
    color: palette.textSecondary
  },
  dotRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 8
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  dotActive: {
    backgroundColor: palette.accent
  },
  dotInactive: {
    backgroundColor: "rgba(139,116,217,0.2)"
  },
  heroText: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
    color: palette.textPrimary,
    fontFamily: type.heading
  },
  supportText: {
    fontSize: 15,
    color: palette.textSecondary
  },
  ctaWrap: {
    position: "relative"
  },
  ctaPulse: {
    position: "absolute",
    top: -6,
    left: 8,
    right: 8,
    bottom: -6,
    borderRadius: 999,
    backgroundColor: "rgba(139, 116, 217, 0.28)"
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 6,
    fontSize: 19,
    fontWeight: "700",
    color: palette.textPrimary
  },
  sectionSubtitle: {
    color: palette.textSecondary,
    marginBottom: 12
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
  allChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: palette.borderSoft,
    borderWidth: 1.5,
    backgroundColor: "rgba(255,255,255,0.6)"
  },
  allChipActive: {
    borderColor: palette.accent,
    backgroundColor: "rgba(139,116,217,0.15)"
  },
  allChipText: {
    color: palette.textSecondary,
    fontWeight: "600"
  },
  allChipTextActive: {
    color: palette.accent
  },
  emptyCard: {
    marginBottom: 12,
    gap: 10
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
  },
  resetLink: {
    marginTop: 4,
    alignSelf: "flex-start"
  },
  resetText: {
    color: palette.accent,
    fontWeight: "600"
  },
  lockHint: {
    color: palette.textSecondary,
    fontSize: 13
  },
  chipsDisabled: {
    opacity: 0.55
  }
});
