import type { Medication } from "../../types/api/medication";
import type { MedicationType } from "../../types/api/medication/medication_type";

export async function getMedicationRegistry(): Promise<
  Map<string, Medication>
> {
  const content = await Bun.file("assets/medication_data.csv").text();
  const map = new Map<string, Medication>();

  const lines = content.trim().split("\n");
  const rows = lines.slice(1);

  for (let medicationEntry of rows) {
    let medication = medicationEntry.split(",");

    if (medication.length === 4) {
      const GTIN = medication[0]?.trim();

      if (!GTIN) continue;

      let medicationObject: Medication = {
        gtin: GTIN,
        insulin: medication[1]?.trim() ?? "",
        treatmentType: (medication[2]?.trim() ?? "UNKNOWN") as MedicationType,
        fullName: medication[3]?.trim() ?? "",
      };

      map.set(GTIN, medicationObject);
    }
  }

  return map;
}

export const medicationRegistry = await getMedicationRegistry();