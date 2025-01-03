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
  bids: {
    bidder: string;
    params: any;
  }[];
}