import { getFlashFee, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumber, BigNumberish } from "ethers";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";

const useFlashFee = (loanAmount: BigNumberish) => {
  const { provider, deployment, chainID } = useDefinedMetaStreetDeployment();

  return useQuery<BigNumber, ReadableError>(flashFeeQueryKeys.loanAmount(chainID, loanAmount), () =>
    getFlashFee({
      signerOrProvider: provider,
      deployment,
      loanAmount,
    })
  );
};

const flashFeeQueryKeys = {
  all: (chainID: number) => ["flash-fee", chainID],
  loanAmount: (chainID: number, loanAmount: BigNumberish) => [...flashFeeQueryKeys.all(chainID), loanAmount.toString()],
};

export default useFlashFee;
