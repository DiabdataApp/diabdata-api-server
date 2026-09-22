import type { DeviceType } from "./device_type";

export interface MedicalDevice {
    gtin: string;
    manufacturer: string;
    deviceType: DeviceType;
    fullName: string;
    daysLifespan: number;
}