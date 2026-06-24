import { NavigatorScreenParams } from "@react-navigation/native";

import { Contact } from "../types/models";

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Recommendations: { contacts: Contact[] };
  Reflection: { contact: Contact };
};

export type MainTabParamList = {
  Home: undefined;
  CirclesStack: NavigatorScreenParams<CirclesStackParamList>;
  Timeline: undefined;
  Settings: undefined;
};

export type CirclesStackParamList = {
  CircleManagement: undefined;
  ContactSelection: undefined;
};
