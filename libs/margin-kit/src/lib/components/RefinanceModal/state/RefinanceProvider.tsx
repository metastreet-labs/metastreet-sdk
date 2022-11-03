import { GetCollateralLimitsResult, LeverageBuy } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { PropsWithChildren } from "react";
import RefinanceContext, { RefinanceContextType } from "./RefinanceContext";
import useRefinanceForm from "./useRefinanceForm";
import useRefinanceTransaction from "./useRefinanceTransaction";

type RefinanceProviderProps = PropsWithChildren & {
  leverageBuy: LeverageBuy;
  limits: GetCollateralLimitsResult;
  flashFee: BigNumber;
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
};

const RefinanceProvider = (props: RefinanceProviderProps) => {
  const { leverageBuy, limits, flashFee, children, ...callbacks } = props;
  const { formState, ...formActions } = useRefinanceForm({ leverageBuy, limits, flashFee });
  const { transactionState, refinance } = useRefinanceTransaction({ formState, ...leverageBuy, ...callbacks });

  const contextValue: RefinanceContextType = {
    formState,
    transactionState,
    actions: { ...formActions, refinance },
    leverageBuy,
    limits,
    flashFee,
  };
  return <RefinanceContext.Provider value={contextValue}>{children}</RefinanceContext.Provider>;
};

export default RefinanceProvider;
