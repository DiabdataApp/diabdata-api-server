import { medicationRegistry } from "../data/api/medications";
import type { Medication } from "../types/api/medication";

export function getMedicationInfo(gtin: string): Medication | undefined {
  return medicationRegistry.get(gtin);
}
