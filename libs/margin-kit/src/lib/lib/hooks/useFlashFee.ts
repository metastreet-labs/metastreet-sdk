import Decimal from "decimal.js";
import { BigNumberish } from "ethers";
import { getReadableError } from "meta-street/utils/errors";
import { useProvider, useQuery } from "wagmi";
import getFlashFee from "../fetchers/getFlashFee";

const useFlashFee = (loanAmount: BigNumberish) => {
  const provider = useProvider();

  const { data, error } = useQuery<Decimal, Error>(flashFeeQueryKeys.loanAmount(loanAmount), () =>
    getFlashFee(provider, loanAmount)
  );

  const flashFee = data;
  const flashFeeError = error && getReadableError(error);

  return { flashFee, flashFeeError };
};

const flashFeeQueryKeys = {
  all: () => ["flash-fee"],
  loanAmount: (loanAmount: BigNumberish) => [...flashFeeQueryKeys.all(), loanAmount.toString()],
};

export default useFlashFee;
