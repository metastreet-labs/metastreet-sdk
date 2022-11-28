import { getFlashFee, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumber, BigNumberish } from "ethers";
import { useQuery } from "wagmi";
import useChainID from "../../../hooks/useChainID";
import useSignerOrProvider from "../../../hooks/useSignerOrProvider";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export const useFlashFee = (loanAmount: BigNumberish) => {
  const chainID = useChainID();
  const { signerOrProvider } = useSignerOrProvider();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getFlashFee({ signerOrProvider, ...deployment, loanAmount });
  });

  return useQuery<BigNumber, ReadableError>(useFlashFeeQKs.loanAmount(chainID, loanAmount), fetcher);
};

export const useFlashFeeQKs = {
  all: (chainID: number) => ["flash-fee", chainID],
  loanAmount: (chainID: number, loanAmount: BigNumberish) => [...useFlashFeeQKs.all(chainID), loanAmount.toString()],
};
