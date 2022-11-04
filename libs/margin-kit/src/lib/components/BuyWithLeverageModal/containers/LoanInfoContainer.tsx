import { GetCollateralLimitsResult } from "@metastreet-labs/margin-core";
import { BigNumber, BigNumberish } from "ethers";
import useCollateralLimits from "../../../lib/hooks/useCollateralLimits";
import useFlashFee from "../../../lib/hooks/useFlashFee";
import Spinner from "../../Spinner";

interface LoanInfo {
  limits: GetCollateralLimitsResult;
  flashFee: BigNumber;
}

interface LoanInfoContainerProps {
  children: (info: LoanInfo) => JSX.Element;
  collectionAddress: string;
  tokenID: string;
  flashLoanAmount: BigNumberish;
}

const LoanInfoContainer = (props: LoanInfoContainerProps) => {
  const { flashLoanAmount, children, ...token } = props;

  const { data: limits, error: limitsError } = useCollateralLimits(token);
  const { data: flashFee, error: flashFeeError } = useFlashFee(flashLoanAmount);

  const loadingOrError = (error?: string) => {
    return (
      <div className="flex h-56 items-center justify-center">
        {error ? <span>{error}</span> : <Spinner className="h-10 w-10" />}
      </div>
    );
  };

  if (limits && flashFee) return children({ limits, flashFee });

  const error = limitsError || flashFeeError;
  if (error) return loadingOrError(error.message);

  return loadingOrError();
};

export default LoanInfoContainer;
