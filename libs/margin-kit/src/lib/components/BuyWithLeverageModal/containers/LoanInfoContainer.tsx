import { BigNumber, BigNumberish } from "ethers";
import useFlashFee from "../../../lib/hooks/useFlashFee";
import { useSupportingVaultsLimits } from "../../../lib/hooks/useSupportingVaultsLimits";
import { VaultLimits } from "../../../lib/hooks/useVaultsLimits";
import Spinner from "../../Spinner";

interface LoanInfo {
  limits: VaultLimits[];
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

  const { data: flashFee, error: flashFeeError } = useFlashFee(flashLoanAmount);
  const { data: limits, error: limitsError } = useSupportingVaultsLimits(token);

  const loadingOrError = (error?: string) => {
    return (
      <div className="flex h-56 items-center justify-center">
        {error ? <span>{error}</span> : <Spinner className="h-10 w-10" />}
      </div>
    );
  };

  if (!limits || !flashFee) {
    const error = limitsError || flashFeeError;
    return loadingOrError(error?.message);
  }

  if (limits && flashFee) return children({ limits, flashFee });

  return loadingOrError();
};

export default LoanInfoContainer;
