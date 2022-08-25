import { BigNumber } from "ethers";

export enum LeverageBuyStatus {
  Uninitialized = "Uninitialized",
  Active = "Active",
  Repaid = "Repaid",
  Liquidated = "Liquidated",
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
}

export enum LeverageBuyEventType {
  Purchased = "Purchased",
  Refinanced = "Refinanced",
  Repaid = "Repaid",
  Liquidated = "Liquidated",
}

export interface LeverageBuyEvent {
  id: string;
  type: LeverageBuyEventType;
  timestamp: number;
  leverageBuy: LeverageBuy;
  previousLeverageBuy?: LeverageBuy;
}
