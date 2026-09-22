import { deviceRegistry } from "../data/api/devices";
import type { MedicalDevice } from "../types/api/medical_devices";

export function getMedicalDeviceInfos(gtin: string): MedicalDevice | undefined {
  return deviceRegistry.get(gtin);
}
