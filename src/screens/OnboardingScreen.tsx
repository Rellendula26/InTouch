import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { GlassCard } from "../components/GlassCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { appCopy } from "../constants/copy";
import { palette } from "../constants/theme";
import { type } from "../constants/typography";
import { useAppState } from "../hooks/useAppState";
import { importDeviceContacts, requestContactsPermission } from "../services/contactService";

export const OnboardingScreen = () => {
  const { setContacts, setOnboardingCompleted } = useAppState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetStarted = async () => {
    setLoading(true);
    setError(null);
    try {
      const granted = await requestContactsPermission();
      if (!granted) {
        setError("Contacts access is optional, but needed for suggestions. You can enable it later in settings.");
        setOnboardingCompleted(true);
        return;
      }
      const contacts = await importDeviceContacts();
      setContacts(contacts);
      setOnboardingCompleted(true);
    } catch {
      setError("Could not load contacts right now. You can continue and import later.");
      setOnboardingCompleted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.brand}>{appCopy.title}</Text>
          <Text style={styles.headline}>{appCopy.onboardingHeadline}</Text>
          <Text style={styles.subheadline}>{appCopy.onboardingSubheadline}</Text>

          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>A real call beats another scroll.</Text>
            <Text style={styles.cardBody}>
              InTouch helps you call people you care about with less friction and more intention.
            </Text>
            <PrimaryButton label="Get Started" onPress={handleGetStarted} loading={loading} />
            {!!error && <Text style={styles.error}>{error}</Text>}
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
    paddingHorizontal: 24
  },
  brand: {
    fontSize: 42,
    fontWeight: "800",
    color: palette.textPrimary,
    fontFamily: type.brand
  },
  headline: {
    marginTop: 16,
    fontSize: 33,
    lineHeight: 40,
    color: palette.textPrimary,
    fontWeight: "700",
    fontFamily: type.heading
  },
  subheadline: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 26,
    color: palette.textSecondary
  },
  card: {
    marginTop: 28,
    gap: 14
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.textPrimary,
    fontFamily: type.heading
  },
  cardBody: {
    color: palette.textSecondary,
    lineHeight: 21
  },
  error: {
    color: palette.textSecondary,
    marginTop: 4
  }
});
