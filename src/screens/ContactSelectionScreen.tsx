import React, { useMemo, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BlobBackground } from "../components/BlobBackground";
import { ContactRow } from "../components/ContactRow";
import { GlassCard } from "../components/GlassCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { palette } from "../constants/theme";
import { useAppState } from "../hooks/useAppState";
import { importDeviceContacts, requestContactsPermission } from "../services/contactService";

export const ContactSelectionScreen = () => {
  const { state, setContacts, assignContactsToCircles } = useAppState();
  const [search, setSearch] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [targetCircleIds, setTargetCircleIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const circlesById = useMemo(() => new Map(state.circles.map((circle) => [circle.id, circle])), [state.circles]);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return state.contacts;
    }
    return state.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) || contact.phoneNumber.toLowerCase().includes(query)
    );
  }, [search, state.contacts]);

  const toggleContact = (contactId: string) => {
    setSelectedContactIds((current) =>
      current.includes(contactId) ? current.filter((id) => id !== contactId) : [...current, contactId]
    );
  };

  const toggleTargetCircle = (circleId: string) => {
    setTargetCircleIds((current) =>
      current.includes(circleId) ? current.filter((id) => id !== circleId) : [...current, circleId]
    );
  };

  const importContacts = async () => {
    setLoading(true);
    try {
      const granted = await requestContactsPermission();
      if (!granted) {
        Alert.alert(
          "Permission Needed",
          "Enable contacts access from settings to import and assign people to circles."
        );
        return;
      }
      const imported = await importDeviceContacts();
      setContacts(imported);
      Alert.alert("Contacts Imported", `${imported.length} contacts are now available in InTouch.`);
    } catch {
      Alert.alert("Import failed", "Could not import contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const assignSelected = () => {
    if (!selectedContactIds.length || !targetCircleIds.length) {
      return;
    }
    assignContactsToCircles(selectedContactIds, targetCircleIds);
    setSelectedContactIds([]);
    Alert.alert("Saved", "Contacts were assigned to selected circles.");
  };

  return (
    <BlobBackground>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View>
              <Text style={styles.title}>Contacts</Text>
              <Text style={styles.subtitle}>Choose people and assign them to one or more circles.</Text>

              <GlassCard style={styles.tools}>
                <PrimaryButton label="Import Contacts" onPress={importContacts} loading={loading} />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search by name or phone"
                  placeholderTextColor={palette.textSecondary}
                  style={styles.input}
                />
                <Text style={styles.helper}>Assign selected contacts to:</Text>
                <View style={styles.circleWrap}>
                  {state.circles.map((circle) => {
                    const selected = targetCircleIds.includes(circle.id);
                    return (
                      <TouchableOpacity
                        key={circle.id}
                        onPress={() => toggleTargetCircle(circle.id)}
                        style={[
                          styles.targetCircle,
                          {
                            borderColor: circle.color,
                            backgroundColor: selected ? `${circle.color}44` : "rgba(255,255,255,0.6)"
                          }
                        ]}
                      >
                        <Text style={[styles.targetText, { color: circle.color }]}>{circle.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <PrimaryButton
                  label="Assign Selected Contacts"
                  onPress={assignSelected}
                  disabled={!selectedContactIds.length || !targetCircleIds.length}
                />
              </GlassCard>
            </View>
          }
          renderItem={({ item }) => (
            <ContactRow
              contact={item}
              circlesById={circlesById}
              selected={selectedContactIds.includes(item.id)}
              onToggle={() => toggleContact(item.id)}
            />
          )}
          ListEmptyComponent={
            <GlassCard>
              <Text style={styles.emptyTitle}>No contacts found</Text>
              <Text style={styles.emptyBody}>Import contacts to begin building your circles.</Text>
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
    color: palette.textSecondary
  },
  tools: {
    marginTop: 18,
    gap: 12
  },
  input: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    paddingHorizontal: 12,
    color: palette.textPrimary,
    backgroundColor: "rgba(255,255,255,0.7)"
  },
  helper: {
    color: palette.textSecondary,
    fontWeight: "600"
  },
  circleWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  targetCircle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1
  },
  targetText: {
    fontWeight: "600"
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
