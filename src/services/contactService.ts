import * as ExpoContacts from "expo-contacts";

import { Contact } from "../types/models";

const pickBestPhoneNumber = (
  phoneNumbers: ExpoContacts.PhoneNumber[] | undefined
): string | null => {
  if (!phoneNumbers || phoneNumbers.length === 0) {
    return null;
  }
  const mobile = phoneNumbers.find((item) => item.label?.toLowerCase().includes("mobile"));
  return (mobile?.number ?? phoneNumbers[0]?.number ?? "").trim() || null;
};

export const requestContactsPermission = async (): Promise<boolean> => {
  const response = await ExpoContacts.requestPermissionsAsync();
  return response.status === "granted";
};

export const importDeviceContacts = async (): Promise<Contact[]> => {
  const response = await ExpoContacts.getContactsAsync({
    fields: [ExpoContacts.Fields.PhoneNumbers]
  });

  if (!response.data.length) {
    return [];
  }

  return response.data
    .map<Contact | null>((item) => {
      const phoneNumber = pickBestPhoneNumber(item.phoneNumbers);
      if (!phoneNumber) {
        return null;
      }
      return {
        id: item.id,
        name: item.name || "Unknown Contact",
        phoneNumber,
        circles: []
      };
    })
    .filter((item): item is Contact => item !== null);
};
