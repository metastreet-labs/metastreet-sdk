import { getFlashFee, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumber, BigNumberish } from "ethers";
import { useQuery } from "wagmi";
import useDeployment from "./ useDeployment";

const useFlashFee = (loanAmount: BigNumberish) => {
  const { provider, deployment } = useDeployment();

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
