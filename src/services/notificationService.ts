import * as Notifications from "expo-notifications";

import { reminderMessages } from "../constants/copy";
import { ReminderTime } from "../types/models";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export const requestNotificationPermission = async (): Promise<boolean> => {
  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }
  const result = await Notifications.requestPermissionsAsync();
  return (
    result.granted || result.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

export const scheduleDailyReminder = async ({ hour, minute }: ReminderTime): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  const body = reminderMessages[Math.floor(Math.random() * reminderMessages.length)]!;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "InTouch",
      body
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute
    }
  });
};

export const disableReminders = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
