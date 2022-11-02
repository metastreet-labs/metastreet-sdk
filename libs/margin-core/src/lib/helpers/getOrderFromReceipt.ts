import { PurchaseEscrowPlatform__factory } from "@metastreet-labs/pe-contracts-typechain";
import { ContractReceipt } from "ethers";
import { cleanupOrder } from "./cleanupOrder";
import { decodeOrder } from "./decodeOrder";

export const getOrderFromReceipt = (receipt: ContractReceipt) => {
  const event = receipt.events?.[0];
  if (!event) throw new Error("Event from receipt is undefined, should never happen");
  const decodedEvent = PurchaseEscrowPlatform__factory.createInterface().parseLog(event);
  const listingData = decodedEvent.args["listingData"] as string;
  return cleanupOrder(decodeOrder(listingData));
};
