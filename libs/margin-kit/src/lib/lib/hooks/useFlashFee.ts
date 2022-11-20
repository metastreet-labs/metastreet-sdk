import { getFlashFee, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumber, BigNumberish } from "ethers";
import { useQuery } from "wagmi";
import useChainID from "../../hooks/useChainID";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

const useFlashFee = (loanAmount: BigNumberish) => {
  const chainID = useChainID();
  const { signerOrProvider } = useSignerOrProvider();

  const [fetcher, enabled] = useFetcherWithDeployment((deployment) => {
    return getFlashFee({ signerOrProvider, ...deployment, loanAmount });
  });

  return useQuery<BigNumber, ReadableError>(flashFeeQueryKeys.loanAmount(chainID, loanAmount), fetcher, { enabled });
};

const flashFeeQueryKeys = {
  all: (chainID: number) => ["flash-fee", chainID],
  loanAmount: (chainID: number, loanAmount: BigNumberish) => [...flashFeeQueryKeys.all(chainID), loanAmount.toString()],
};

export default useFlashFee;
