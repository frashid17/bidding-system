export interface PrebidConfig {
  debug?: boolean;
  bidderTimeout?: number;
  priceGranularity?: string;
}

export interface AdUnit {
  code: string;
  mediaTypes: {
    banner: {
      sizes: number[][];
    };
  };
  floors?: {
    values: {
      [key: string]: number;
    };
  };
  bids: Array<{
    bidder: string;
    params: Record<string, any>;
  }>;
  getFloor?: () => any;
}