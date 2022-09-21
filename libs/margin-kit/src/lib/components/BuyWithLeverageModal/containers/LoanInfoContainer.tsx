import Decimal from "decimal.js";
import { CollateralLimits } from "../../../lib/fetchers/getCollateralLimits";
import useCollateralLimits from "../../../lib/hooks/useCollateralLimits";
import useFlashFee from "../../../lib/hooks/useFlashFee";
import { BWLToken } from "../../../types";
import { toUnits } from "../../../utils/numbers";
import Spinner from "../../Spinner";

interface LoanInfo {
  limits: CollateralLimits;
  flashFee: Decimal;
}

interface LoanInfoContainerProps {
  children: (info: LoanInfo) => JSX.Element;
  tokens: BWLToken[];
}

const LoanInfoContainer = (props: LoanInfoContainerProps) => {
  const { tokens, children } = props;
  const totalPrice = tokens.reduce((s, t) => s + t.tokenPrice, 0);
  const totalPriceUnits = toUnits(totalPrice).toString();

  const { limits, limitsError } = useCollateralLimits(tokens);
  const { flashFee, flashFeeError } = useFlashFee(totalPriceUnits);

  const loadingOrError = (error?: string) => {
    return (
      <div className="flex h-56 items-center justify-center">
        {error ? <span>{error}</span> : <Spinner className="h-10 w-10" />}
      </div>
    );
  };

  if (limits && flashFee) return children({ limits, flashFee });

  const error = limitsError || flashFeeError;
  if (error) return loadingOrError(error);

  return loadingOrError();
};

export default LoanInfoContainer;
