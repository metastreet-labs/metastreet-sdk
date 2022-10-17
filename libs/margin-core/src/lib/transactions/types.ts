import { Signer } from "ethers";
import { Deployment } from "../deployments";

export interface TransactionParams {
  signer: Signer;
  deployment: Deployment;
}
