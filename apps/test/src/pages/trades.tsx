import {
  DeploymentProvider,
  useCollateralLimits,
  UseCollateralLimitsParams,
  useDeployment,
  useFlashFee,
  UseFlashFeeParams,
  useLeverageBuyEvents,
  useLeverageBuys,
  useRepayETH,
} from "@metastreet-labs/margin-wagmi";
import { BigNumber, Signer } from "ethers";
import { useAccount, useSigner } from "wagmi";

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

const SignerProvider = ({ children }: { children: (params: { signer: Signer }) => JSX.Element }) => {
  const { data } = useSigner();
  if (!data) {
    return <div>Loading...</div>;
  }
  return children({ signer: data });
};

const Repay = ({ escrowID, repayment, signer }: { escrowID: string; repayment: BigNumber; signer: Signer }) => {
  const repayETH = useRepayETH({ escrowID, repayment, signer });
  return <button onClick={repayETH}>Repay</button>;
};

// const Refinance = () => {
//   return <>
//     <button onClick={}>Refinance</button>
//     <div>Modal</div>
//   </>
// }

const LeverageBuys = () => {
  const { address } = useAccount();
  const { data } = useLeverageBuys({
    first: 1000,
    owner: address,
    // owner: "0x70d3Bc54ecAdB55c98AFEC3399bAB17e89F65F61",
    skip: 0,
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  if (data.length <= 0) {
    return <p>No transactions</p>;
  }

  return (
    <>
      {data.map(({ id, escrowID, repayment, duration, maturity, collectionAddress, tokenID }) => {
        const maturityDate = new Date(0);
        maturityDate.setUTCSeconds(maturity);

        return (
          <div key={id}>
            <p>{`${repayment} wei due in ${duration / 60 / 60 / 24} days on ${maturityDate}`}</p>
            <MaxDebt collectionAddress={collectionAddress} tokenID={tokenID} repayment={repayment} />
            <SignerProvider>
              {({ signer }) => <Repay signer={signer} escrowID={escrowID} repayment={repayment} />}
            </SignerProvider>
          </div>
        );
      })}
    </>
  );
};
const PastTransactions = () => {
  const { address } = useAccount();
  const { data } = useLeverageBuyEvents({
    first: 1000,
    owner: address,
    // owner: "0xf2391397fa352cad37023731d37b8013c87592c1",
    skip: 0,
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  if (data.length <= 0) {
    return <p>No transactions</p>;
  }

  return (
    <>
      {data.map(({ id, type, timestamp, leverageBuy: { duration } }) => {
        const createdAt = new Date(0);
        createdAt.setUTCSeconds(timestamp);
        return (
          <div key={id}>
            <p>{`${type} transaction on ${createdAt}. Loan duration: ${duration / 60 / 60 / 24} days`}</p>
          </div>
        );
      })}
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
      <LeverageBuys />
      <PastTransactions />
    </DeploymentProvider>
  );
};

export default Trades;
