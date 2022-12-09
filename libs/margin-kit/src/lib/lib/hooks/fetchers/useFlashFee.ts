import { getFlashFee, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumber, BigNumberish } from "ethers";
import { useMetaStreetQuery } from "../../../components/MetaStreetConfig/MetaStreetQueryClientProvider";
import useChainID from "../../../hooks/meta-street-config/useChainID";
import useSignerOrProvider from "../../../hooks/meta-street-config/useSignerOrProvider";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export const useFlashFee = (loanAmount: BigNumberish) => {
  const chainID = useChainID();
  const { signerOrProvider } = useSignerOrProvider();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getFlashFee({ signerOrProvider, ...deployment, loanAmount });
  });

  return useMetaStreetQuery<BigNumber, ReadableError>(useFlashFeeQKs.loanAmount(chainID, loanAmount), fetcher);
};

export const useFlashFeeQKs = {
  all: (chainID: number) => ["flash-fee", chainID],
  loanAmount: (chainID: number, loanAmount: BigNumberish) => [...useFlashFeeQKs.all(chainID), loanAmount.toString()],
};
