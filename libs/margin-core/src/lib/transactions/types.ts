import { Signer } from "ethers";

export interface TransactionParams {
  signer: Signer;
  lbWrapperAddress: string;
}
