import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";

export type SignerOrProvider = Signer | Provider;

export interface FetcherParams {
  signerOrProvider: SignerOrProvider;
  lbWrapperAddress: string;
}
