import { DeviceType, getDeviceType } from '../utils/device';

interface FloorConfig {
  mediaType: string;
  size: number[];
  deviceType: DeviceType;
  timeOfDay: number;
}

const BASE_FLOORS = {
  banner: {
    '300x250': 1.2,
    '300x600': 1.8,
    '728x90': 1.0,
  }
};

const DEVICE_MULTIPLIERS = {
  desktop: 1.0,
  tablet: 0.8,
  mobile: 0.6
};

const TIME_MULTIPLIERS = {
  peak: 1.2,    // 8AM - 8PM
  offPeak: 0.8  // 8PM - 8AM
};

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