import Decimal from "decimal.js";
import { BigNumberish } from "ethers";
import { useProvider, useQuery } from "wagmi";
import { getReadableError } from "../../utils/errors";
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
