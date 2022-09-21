import Decimal from "decimal.js";
import Spinner from "meta-street/components/Spinner";
import { CollateralLimits } from "meta-street/lib/fetchers/getCollateralLimits";
import useCollateralLimits from "meta-street/lib/hooks/useCollateralLimits";
import useFlashFee from "meta-street/lib/hooks/useFlashFee";
import { BWLToken } from "meta-street/types";
import { toUnits } from "meta-street/utils/numbers";

type LoanInfo = {
  limits: CollateralLimits;
  flashFee: Decimal;
};

type LoanInfoContainerProps = {
  children: (info: LoanInfo) => JSX.Element;
  tokens: BWLToken[];
};

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
