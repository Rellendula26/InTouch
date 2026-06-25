import { Platform } from "react-native";

const iosBrand = "AvenirNext-DemiBold";
const iosBody = "AvenirNext-Regular";

export const type = {
  brand: Platform.select({ ios: iosBrand, default: "System" }),
  heading: Platform.select({ ios: iosBrand, default: "System" }),
  body: Platform.select({ ios: iosBody, default: "System" })
};
