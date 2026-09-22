import type { MedicationType } from "./medication_type";

export interface Medication {
    gtin: string;
    insulin: string;
    treatmentType: MedicationType;
    fullName: string;
}