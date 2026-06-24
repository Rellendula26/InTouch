export type UUID = string;

export type CallStatus = "connected" | "no_answer" | "call_later";

export interface Circle {
  id: UUID;
  name: string;
  color: string;
  createdAt: string;
}

export interface Contact {
  id: UUID;
  name: string;
  phoneNumber: string;
  circles: UUID[];
}

export interface CallLog {
  id: UUID;
  contactId: UUID;
  contactName: string;
  timestamp: string;
  status: CallStatus;
  note: string;
  circleIds: UUID[];
}

export interface ReminderTime {
  hour: number;
  minute: number;
}

export interface AppState {
  onboardingCompleted: boolean;
  circles: Circle[];
  contacts: Contact[];
  callLogs: CallLog[];
  selectedCircleIds: UUID[];
  notificationsEnabled: boolean;
  reminderTime: ReminderTime;
}
