import type { MedicalDevice } from "../../types/api/medical_devices";
import type { DeviceType } from "../../types/api/medical_devices/device_type";

async function getMedicalDeviceRegistry(): Promise<
  Map<string, MedicalDevice>
> {
  const content = await Bun.file("assets/medical_devices.csv").text();
  const map = new Map<string, MedicalDevice>();

  const lines = content.trim().split("\n");
  const rows = lines.slice(1);

  for (let medicalDevice of rows) {
    let device = medicalDevice.split(",");

    if (device.length == 5) {
      const GTIN = device[0]?.trim();

      if (!GTIN) continue;

      let medicalDeviceObject: MedicalDevice = {
        gtin: GTIN,
        manufacturer: device[1]?.trim() ?? "",
        deviceType: (device[2]?.trim() ?? "UNKNOWN") as DeviceType,
        fullName: device[3]?.trim() ?? "",
        daysLifespan: parseInt(device[4]?.trim() ?? "0"),
      };

      map.set(GTIN, medicalDeviceObject);
    }
  }

  return map;
}

export const deviceRegistry = await getMedicalDeviceRegistry();
