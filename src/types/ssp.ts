export interface BidRequest {
  id: string;
  adUnitCode: string;
  sizes: number[][];
  floor: number;
  timeout: number;
  siteId: string;
  userId: string;
}

export interface BidResponse {
  bidder: string;
  cpm: number;
  currency: string;
  width: number;
  height: number;
  ad: string;
  meta: {
    advertiserDomains: string[];
    mediaType: string;
  };
}

export interface SSPProvider {
  readonly name: string;
  readonly endpoint: string;
  requestBids(request: BidRequest): Promise<BidResponse[]>;
}