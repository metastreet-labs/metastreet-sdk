/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace ILoanPriceOracleParameters {
  export type PiecewiseLinearModelStruct = {
    offset: PromiseOrValue<BigNumberish>;
    slope1: PromiseOrValue<BigNumberish>;
    slope2: PromiseOrValue<BigNumberish>;
    target: PromiseOrValue<BigNumberish>;
    max: PromiseOrValue<BigNumberish>;
  };

  export type PiecewiseLinearModelStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    offset: BigNumber;
    slope1: BigNumber;
    slope2: BigNumber;
    target: BigNumber;
    max: BigNumber;
  };

  export type CollateralParametersStruct = {
    active: PromiseOrValue<boolean>;
    loanToValueRateComponent: ILoanPriceOracleParameters.PiecewiseLinearModelStruct;
    durationRateComponent: ILoanPriceOracleParameters.PiecewiseLinearModelStruct;
    rateComponentWeights: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ];
  };

  export type CollateralParametersStructOutput = [
    boolean,
    ILoanPriceOracleParameters.PiecewiseLinearModelStructOutput,
    ILoanPriceOracleParameters.PiecewiseLinearModelStructOutput,
    [number, number, number]
  ] & {
    active: boolean;
    loanToValueRateComponent: ILoanPriceOracleParameters.PiecewiseLinearModelStructOutput;
    durationRateComponent: ILoanPriceOracleParameters.PiecewiseLinearModelStructOutput;
    rateComponentWeights: [number, number, number];
  };
}

export interface ILoanPriceOracleParametersInterface extends utils.Interface {
  functions: {
    "collateralOracle()": FunctionFragment;
    "getCollateralParameters(address)": FunctionFragment;
    "minimumLoanDuration()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "collateralOracle"
      | "getCollateralParameters"
      | "minimumLoanDuration"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "collateralOracle",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCollateralParameters",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "minimumLoanDuration",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "collateralOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollateralParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minimumLoanDuration",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ILoanPriceOracleParameters extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ILoanPriceOracleParametersInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    collateralOracle(overrides?: CallOverrides): Promise<[string]>;

    getCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[ILoanPriceOracleParameters.CollateralParametersStructOutput]>;

    minimumLoanDuration(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  collateralOracle(overrides?: CallOverrides): Promise<string>;

  getCollateralParameters(
    collateralToken: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<ILoanPriceOracleParameters.CollateralParametersStructOutput>;

  minimumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    collateralOracle(overrides?: CallOverrides): Promise<string>;

    getCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<ILoanPriceOracleParameters.CollateralParametersStructOutput>;

    minimumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    collateralOracle(overrides?: CallOverrides): Promise<BigNumber>;

    getCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minimumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    collateralOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minimumLoanDuration(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
