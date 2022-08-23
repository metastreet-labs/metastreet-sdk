import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { Deployment } from "./deployments";

export type SignerOrProvider = Signer | Provider;

export interface FetcherParams {
  signerOrProvider: SignerOrProvider;
  deployment: Deployment;
}
