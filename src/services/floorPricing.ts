import { getDeviceType } from '../utils/device';

type MediaType = 'banner';
type AdSize = '300x250' | '300x600' | '728x90';
type DeviceType = 'desktop' | 'tablet' | 'mobile';

const BASE_FLOORS: Record<MediaType, Record<AdSize, number>> = {
  banner: {
    '300x250': 1.2,
    '300x600': 1.8,
    '728x90': 1.0,
  }
};

const DEVICE_MULTIPLIERS: Record<DeviceType, number> = {
  desktop: 1.0,
  tablet: 0.8,
  mobile: 0.6
};

const TIME_MULTIPLIERS = {
  peak: 1.2,    // 8AM - 8PM
  offPeak: 0.8  // 8PM - 8AM
} as const;

export const getFloorPrice = (
  mediaType: MediaType,
  size: number[],
): number => {
  const deviceType = getDeviceType();
  const hour = new Date().getHours();
  const isPeakHour = hour >= 8 && hour <= 20;
  const sizeKey = `${size[0]}x${size[1]}` as AdSize;
  const baseFloor = BASE_FLOORS[mediaType]?.[sizeKey] || 0.5;
  const deviceMultiplier = DEVICE_MULTIPLIERS[deviceType];
  const timeMultiplier = isPeakHour ? TIME_MULTIPLIERS.peak : TIME_MULTIPLIERS.offPeak;
  
  return baseFloor * deviceMultiplier * timeMultiplier;
};