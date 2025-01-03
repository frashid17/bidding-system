export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export const getDeviceType = (): DeviceType => {
  const width = window.innerWidth;
  
  if (width >= 1024) {
    return 'desktop';
  } else if (width >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
};