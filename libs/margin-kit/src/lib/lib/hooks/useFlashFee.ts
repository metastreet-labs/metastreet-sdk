import { getFlashFee, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumber, BigNumberish } from "ethers";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";

const useFlashFee = (loanAmount: BigNumberish) => {
  const { provider, deployment } = useDefinedMetaStreetDeployment();

  return useQuery<BigNumber, ReadableError>(flashFeeQueryKeys.loanAmount(loanAmount), () =>
    getFlashFee({
      signerOrProvider: provider,
      deployment,
      loanAmount,
    })
  );
};

const flashFeeQueryKeys = {
  all: () => ["flash-fee"],
  loanAmount: (loanAmount: BigNumberish) => [...flashFeeQueryKeys.all(), loanAmount.toString()],
};

export default useFlashFee;
