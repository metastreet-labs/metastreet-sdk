import { GetCollateralLimitsResult } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import useCollateralLimits from "../../../lib/hooks/useCollateralLimits";
import useFlashFee from "../../../lib/hooks/useFlashFee";
import { BWLToken } from "../../../types";
import { toUnits } from "../../../utils/numbers";
import Spinner from "../../Spinner";

interface LoanInfo {
  limits: GetCollateralLimitsResult;
  flashFee: BigNumber;
}

interface LoanInfoContainerProps {
  children: (info: LoanInfo) => JSX.Element;
  tokens: BWLToken[];
}

const LoanInfoContainer = (props: LoanInfoContainerProps) => {
  const { tokens, children } = props;
  const totalPrice = tokens.reduce((s, t) => s + t.tokenPrice, 0);
  const totalPriceUnits = toUnits(totalPrice).toString();

  const { data: limits, error: limitsError } = useCollateralLimits(tokens[0]);
  const { data: flashFee, error: flashFeeError } = useFlashFee(totalPriceUnits);

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
