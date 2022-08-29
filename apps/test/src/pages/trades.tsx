import {
  DeploymentProvider,
  useCollateralLimits,
  UseCollateralLimitsParams,
  useDeployment,
  useFlashFee,
  UseFlashFeeParams,
  useLeverageBuyEvents,
} from "@metastreet-labs/margin-wagmi";

const MaxDebt = ({
  collectionAddress,
  tokenID,
  repayment,
}: Pick<UseCollateralLimitsParams, "collectionAddress" | "tokenID"> & {
  repayment: UseFlashFeeParams["loanAmount"];
}) => {
  const {
    data: collateralLimits,
    isLoading: isCollateralLimitsQueryLoading,
    error: collateralLimitsQueryError,
  } = useCollateralLimits({ collectionAddress, tokenID });
  const {
    data: flashFee,
    isLoading: isFlashFeeQueryLoading,
    error: flashFeeQueryError,
  } = useFlashFee({ loanAmount: repayment });

  if (collateralLimitsQueryError || flashFeeQueryError) {
    const error = collateralLimitsQueryError ?? flashFeeQueryError;
    return <p>{error.message}</p>;
  }

  if (isCollateralLimitsQueryLoading || isFlashFeeQueryLoading) {
    return <p>Loading...</p>;
  }

  const maxDebt = collateralLimits.maxPrincipal.sub(flashFee);

  return <p>{`Max Debt: ${maxDebt}`}</p>;
};

const LeverageBuyEvents = () => {
  // const { address } = useAccount();
  const { data } = useLeverageBuyEvents({
    first: 1000,
    // owner: address,
    owner: "0xf2391397fa352cad37023731d37b8013c87592c1",
    skip: 0,
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  if (data.length <= 0) {
    return <p>No positions</p>;
  }

  return (
    <>
      {data.map(({ id, leverageBuy: { collectionAddress, tokenID, duration, repayment } }) => (
        <div key={id}>
          <p>{`${repayment} wei due in ${duration / 60 / 60 / 24} days`}</p>
          <MaxDebt collectionAddress={collectionAddress} tokenID={tokenID} repayment={repayment} />
        </div>
      ))}
    </>
  );
};

const CorrectNetworkChecker = () => {
  const { chainId } = useDeployment();
  if (chainId == 4) return null;
  return <p>Switch to Rinkeby!</p>;
};

const Trades = () => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <DeploymentProvider>
      <CorrectNetworkChecker />
      <LeverageBuyEvents />
    </DeploymentProvider>
  );
};

export default Trades;
