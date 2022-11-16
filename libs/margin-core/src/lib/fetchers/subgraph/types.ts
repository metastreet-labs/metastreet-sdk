import { BigNumber } from "ethers";

export enum LeverageBuyStatus {
  Uninitialized = "Uninitialized",
  Active = "Active",
  Repaid = "Repaid",
  Liquidated = "Liquidated",
}

export enum Marketplace {
  Seaport,
}

export interface ListingData {
  listingPrice: BigNumber;
  consideration: BigNumber;
  totalFees: BigNumber;
  marketPlace: Marketplace;
  endTime: number;
  raw: string;
}

export interface LeverageBuy {
  id: string;
  escrowID: string;
  status: LeverageBuyStatus;
  collectionAddress: string;
  tokenID: string;
  tokenURI: string;
  purchasePrice: BigNumber;
  downPayment: BigNumber;
  principal: BigNumber;
  repayment: BigNumber;
  duration: number;
  maturity: number;
  listingData?: ListingData;
}

export enum LeverageBuyEventType {
  Purchased = "Purchased",
  Refinanced = "Refinanced",
  Repaid = "Repaid",
  Liquidated = "Liquidated",
  Listed = "Listed",
  Delisted = "Delisted",
  Sold = "Sold",
}

export interface LeverageBuyEvent {
  id: string;
  type: LeverageBuyEventType;
  timestamp: number;
  leverageBuy: LeverageBuy;
  previousLeverageBuy?: LeverageBuy;
}
