import { DeviceType, getDeviceType } from '../utils/device';

export const getFloorPrice = (
  mediaType: string,
  size: number[],
  domain: string
): number => {
  const deviceType = getDeviceType();
  const hour = new Date().getHours();
  const isPeakHour = hour >= 8 && hour <= 20;
  
  const sizeKey = `${size[0]}x${size[1]}`;
  const baseFloor = BASE_FLOORS[mediaType]?.[sizeKey] || 0.5;
  const deviceMultiplier = DEVICE_MULTIPLIERS[deviceType];
  const timeMultiplier = isPeakHour ? TIME_MULTIPLIERS.peak : TIME_MULTIPLIERS.offPeak;
  
  return baseFloor * deviceMultiplier * timeMultiplier;
};