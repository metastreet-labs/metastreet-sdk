import { BigNumber } from "ethers";
import { LeverageBuy, LeverageBuyEvent, LeverageBuyEventType, LeverageBuyStatus } from "./types";

export interface RawLeverageBuy {
  id: string;
  escrowId: string;
  status: string;
  token: string;
  tokenId: string;
  tokenURI: string;
  purchasePrice: string;
  downpayment: string;
  principal: string;
  repayment: string;
  duration: string;
  maturity: string;
}

export interface RawLeverageBuyEvent {
  id: string;
  type: string;
  timestamp: string;
  leverageBuy: RawLeverageBuy;
  previousLeverageBuy?: RawLeverageBuy;
}

export const transformRawLeverageBuy = (raw: RawLeverageBuy): LeverageBuy => {
  return {
    id: raw.id,
    escrowID: raw.escrowId,
    status: raw.status as LeverageBuyStatus,
    collectionAddress: raw.token,
    tokenID: raw.tokenId,
    tokenURI: raw.tokenURI,
    purchasePrice: BigNumber.from(raw.purchasePrice),
    downPayment: BigNumber.from(raw.downpayment),
    principal: BigNumber.from(raw.principal),
    repayment: BigNumber.from(raw.repayment),
    duration: parseInt(raw.duration),
    maturity: Date.now() / 1000 + parseInt(raw.duration),
  };
};

export const transformRawLeverageBuyEvent = (raw: RawLeverageBuyEvent): LeverageBuyEvent => {
  return {
    id: raw.id,
    type: raw.type as LeverageBuyEventType,
    timestamp: parseInt(raw.timestamp),
    leverageBuy: transformRawLeverageBuy(raw.leverageBuy),
    previousLeverageBuy: raw.leverageBuy && transformRawLeverageBuy(raw.leverageBuy),
  };
};
