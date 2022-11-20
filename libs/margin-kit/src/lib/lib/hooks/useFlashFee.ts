import { getFlashFee, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumber, BigNumberish } from "ethers";
import { useProvider, useQuery } from "wagmi";
import useChainID from "../../hooks/useChainID";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

const useFlashFee = (loanAmount: BigNumberish) => {
  const chainID = useChainID();
  const provider = useProvider();

  const [fetcher, enabled] = useFetcherWithDeployment((deployment) => {
    return getFlashFee({
      signerOrProvider: provider,
      deployment,
      loanAmount,
    });
  });

  return useQuery<BigNumber, ReadableError>(flashFeeQueryKeys.loanAmount(chainID, loanAmount), fetcher, { enabled });
};

const flashFeeQueryKeys = {
  all: (chainID: number) => ["flash-fee", chainID],
  loanAmount: (chainID: number, loanAmount: BigNumberish) => [...flashFeeQueryKeys.all(chainID), loanAmount.toString()],
};

export default useFlashFee;
