import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { createId } from "../lib/id";
import { disableReminders, scheduleDailyReminder } from "../services/notificationService";
import { recommendationService } from "../services/recommendationService";
import { defaultAppState, loadAppState, saveAppState } from "../storage/appStateStorage";
import { AppState, CallLog, CallStatus, Circle, Contact, ReminderTime } from "../types/models";

interface AppContextValue {
  state: AppState;
  bootstrapped: boolean;
  setOnboardingCompleted: (value: boolean) => void;
  createCircle: (name: string, color: string) => void;
  updateCircle: (circleId: string, updates: Partial<Pick<Circle, "name" | "color">>) => void;
  deleteCircle: (circleId: string) => void;
  setContacts: (contacts: Contact[]) => void;
  assignContactsToCircles: (contactIds: string[], circleIds: string[]) => void;
  setSelectedCircleIds: (circleIds: string[]) => void;
  pickThreePeople: () => Contact[];
  replaceRecommendation: (currentRecommendations: Contact[], contactId: string) => Contact[];
  addCallLog: (input: {
    contactId: string;
    contactName: string;
    status: CallStatus;
    note?: string;
  }) => void;
  setReminderEnabled: (enabled: boolean) => Promise<void>;
  setReminderTime: (time: ReminderTime) => Promise<void>;
  getLastCallDateByContactId: (contactId: string) => string | null;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultAppState);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      const loaded = await loadAppState();
      setState(loaded);
      setBootstrapped(true);
    };
    void hydrate();
  }, []);

  useEffect(() => {
    if (!bootstrapped) {
      return;
    }
    void saveAppState(state);
  }, [bootstrapped, state]);

  const setOnboardingCompleted = useCallback((value: boolean) => {
    setState((current) => ({ ...current, onboardingCompleted: value }));
  }, []);

  const createCircle = useCallback((name: string, color: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    setState((current) => ({
      ...current,
      circles: [
        ...current.circles,
        { id: createId(), name: trimmed, color, createdAt: new Date().toISOString() }
      ]
    }));
  }, []);

  const updateCircle = useCallback(
    (circleId: string, updates: Partial<Pick<Circle, "name" | "color">>) => {
      setState((current) => ({
        ...current,
        circles: current.circles.map((circle) =>
          circle.id === circleId ? { ...circle, ...updates, name: updates.name?.trim() || circle.name } : circle
        )
      }));
    },
    []
  );

  const deleteCircle = useCallback((circleId: string) => {
    setState((current) => ({
      ...current,
      circles: current.circles.filter((circle) => circle.id !== circleId),
      selectedCircleIds: current.selectedCircleIds.filter((id) => id !== circleId),
      contacts: current.contacts.map((contact) => ({
        ...contact,
        circles: contact.circles.filter((id) => id !== circleId)
      }))
    }));
  }, []);

  const setContacts = useCallback((contacts: Contact[]) => {
    setState((current) => {
      const existingById = new Map(current.contacts.map((contact) => [contact.id, contact]));
      const merged = contacts.map((contact) => {
        const existing = existingById.get(contact.id);
        if (!existing) {
          return contact;
        }
        return { ...contact, circles: existing.circles };
      });
      return { ...current, contacts: merged };
    });
  }, []);

  const assignContactsToCircles = useCallback((contactIds: string[], circleIds: string[]) => {
    if (!contactIds.length || !circleIds.length) {
      return;
    }
    const targetContacts = new Set(contactIds);
    setState((current) => ({
      ...current,
      contacts: current.contacts.map((contact) => {
        if (!targetContacts.has(contact.id)) {
          return contact;
        }
        const merged = new Set([...contact.circles, ...circleIds]);
        return { ...contact, circles: [...merged] };
      })
    }));
  }, []);

  const setSelectedCircleIds = useCallback((circleIds: string[]) => {
    setState((current) => ({ ...current, selectedCircleIds: circleIds }));
  }, []);

  const pickThreePeople = useCallback((): Contact[] => {
    return recommendationService.pickContacts(
      {
        contacts: state.contacts,
        selectedCircleIds: state.selectedCircleIds,
        callLogs: state.callLogs
      },
      3
    );
  }, [state.callLogs, state.contacts, state.selectedCircleIds]);

  const replaceRecommendation = useCallback(
    (currentRecommendations: Contact[], contactId: string): Contact[] => {
      const replacement = recommendationService.pickContacts(
        {
          contacts: state.contacts,
          selectedCircleIds: state.selectedCircleIds,
          callLogs: state.callLogs
        },
        1,
        currentRecommendations.map((item) => item.id)
      )[0];

      if (!replacement) {
        return currentRecommendations;
      }

      return currentRecommendations.map((item) => (item.id === contactId ? replacement : item));
    },
    [state.callLogs, state.contacts, state.selectedCircleIds]
  );

  const addCallLog = useCallback(
    (input: { contactId: string; contactName: string; status: CallStatus; note?: string }) => {
      setState((current) => {
        const contact = current.contacts.find((item) => item.id === input.contactId);
        const newLog: CallLog = {
          id: createId(),
          contactId: input.contactId,
          contactName: input.contactName,
          timestamp: new Date().toISOString(),
          status: input.status,
          note: input.note?.trim() ?? "",
          circleIds: contact?.circles ?? []
        };
        return { ...current, callLogs: [newLog, ...current.callLogs] };
      });
    },
    []
  );

  const setReminderEnabled = useCallback(async (enabled: boolean) => {
    setState((current) => ({ ...current, notificationsEnabled: enabled }));
    if (enabled) {
      await scheduleDailyReminder(state.reminderTime);
      return;
    }
    await disableReminders();
  }, [state.reminderTime]);

  const setReminderTime = useCallback(async (time: ReminderTime) => {
    setState((current) => ({ ...current, reminderTime: time }));
    if (state.notificationsEnabled) {
      await scheduleDailyReminder(time);
    }
  }, [state.notificationsEnabled]);

  const getLastCallDateByContactId = useCallback(
    (contactId: string): string | null => {
      const log = state.callLogs.find((item) => item.contactId === contactId);
      return log ? log.timestamp : null;
    },
    [state.callLogs]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      bootstrapped,
      setOnboardingCompleted,
      createCircle,
      updateCircle,
      deleteCircle,
      setContacts,
      assignContactsToCircles,
      setSelectedCircleIds,
      pickThreePeople,
      replaceRecommendation,
      addCallLog,
      setReminderEnabled,
      setReminderTime,
      getLastCallDateByContactId
    }),
    [
      addCallLog,
      assignContactsToCircles,
      bootstrapped,
      createCircle,
      deleteCircle,
      getLastCallDateByContactId,
      pickThreePeople,
      replaceRecommendation,
      setContacts,
      setOnboardingCompleted,
      setReminderEnabled,
      setReminderTime,
      setSelectedCircleIds,
      state,
      updateCircle
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppState = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
};
