/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace LoanPriceOracle {
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
    loanToValueRateComponent: LoanPriceOracle.PiecewiseLinearModelStruct;
    durationRateComponent: LoanPriceOracle.PiecewiseLinearModelStruct;
    rateComponentWeights: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ];
  };

  export type CollateralParametersStructOutput = [
    boolean,
    LoanPriceOracle.PiecewiseLinearModelStructOutput,
    LoanPriceOracle.PiecewiseLinearModelStructOutput,
    [number, number, number]
  ] & {
    active: boolean;
    loanToValueRateComponent: LoanPriceOracle.PiecewiseLinearModelStructOutput;
    durationRateComponent: LoanPriceOracle.PiecewiseLinearModelStructOutput;
    rateComponentWeights: [number, number, number];
  };
}

export interface LoanPriceOracleInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "IMPLEMENTATION_VERSION()": FunctionFragment;
    "PARAMETER_ADMIN_ROLE()": FunctionFragment;
    "collateralOracle()": FunctionFragment;
    "currencyToken()": FunctionFragment;
    "getCollateralParameters(address)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getUtilizationParameters()": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "minimumLoanDuration()": FunctionFragment;
    "priceLoan(address,uint256,uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setCollateralOracle(address)": FunctionFragment;
    "setCollateralParameters(address,bytes)": FunctionFragment;
    "setMinimumLoanDuration(uint256)": FunctionFragment;
    "setUtilizationParameters(bytes)": FunctionFragment;
    "supportedCollateralTokens()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "IMPLEMENTATION_VERSION"
      | "PARAMETER_ADMIN_ROLE"
      | "collateralOracle"
      | "currencyToken"
      | "getCollateralParameters"
      | "getRoleAdmin"
      | "getUtilizationParameters"
      | "grantRole"
      | "hasRole"
      | "minimumLoanDuration"
      | "priceLoan"
      | "renounceRole"
      | "revokeRole"
      | "setCollateralOracle"
      | "setCollateralParameters"
      | "setMinimumLoanDuration"
      | "setUtilizationParameters"
      | "supportedCollateralTokens"
      | "supportsInterface"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "IMPLEMENTATION_VERSION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PARAMETER_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "collateralOracle",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currencyToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCollateralParameters",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUtilizationParameters",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "minimumLoanDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "priceLoan",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setCollateralOracle",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setCollateralParameters",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setMinimumLoanDuration",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUtilizationParameters",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportedCollateralTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "IMPLEMENTATION_VERSION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PARAMETER_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collateralOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currencyToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollateralParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUtilizationParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minimumLoanDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "priceLoan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setCollateralOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCollateralParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMinimumLoanDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUtilizationParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportedCollateralTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "CollateralOracleUpdated(address)": EventFragment;
    "CollateralParametersUpdated(address)": EventFragment;
    "MinimumLoanDurationUpdated(uint256)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "UtilizationParametersUpdated()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CollateralOracleUpdated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "CollateralParametersUpdated"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MinimumLoanDurationUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "UtilizationParametersUpdated"
  ): EventFragment;
}

export interface CollateralOracleUpdatedEventObject {
  collateralOracle: string;
}
export type CollateralOracleUpdatedEvent = TypedEvent<
  [string],
  CollateralOracleUpdatedEventObject
>;

export type CollateralOracleUpdatedEventFilter =
  TypedEventFilter<CollateralOracleUpdatedEvent>;

export interface CollateralParametersUpdatedEventObject {
  collateralToken: string;
}
export type CollateralParametersUpdatedEvent = TypedEvent<
  [string],
  CollateralParametersUpdatedEventObject
>;

export type CollateralParametersUpdatedEventFilter =
  TypedEventFilter<CollateralParametersUpdatedEvent>;

export interface MinimumLoanDurationUpdatedEventObject {
  duration: BigNumber;
}
export type MinimumLoanDurationUpdatedEvent = TypedEvent<
  [BigNumber],
  MinimumLoanDurationUpdatedEventObject
>;

export type MinimumLoanDurationUpdatedEventFilter =
  TypedEventFilter<MinimumLoanDurationUpdatedEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface UtilizationParametersUpdatedEventObject {}
export type UtilizationParametersUpdatedEvent = TypedEvent<
  [],
  UtilizationParametersUpdatedEventObject
>;

export type UtilizationParametersUpdatedEventFilter =
  TypedEventFilter<UtilizationParametersUpdatedEvent>;

export interface LoanPriceOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LoanPriceOracleInterface;

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
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    IMPLEMENTATION_VERSION(overrides?: CallOverrides): Promise<[string]>;

    PARAMETER_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    collateralOracle(overrides?: CallOverrides): Promise<[string]>;

    currencyToken(overrides?: CallOverrides): Promise<[string]>;

    getCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[LoanPriceOracle.CollateralParametersStructOutput]>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getUtilizationParameters(
      overrides?: CallOverrides
    ): Promise<[LoanPriceOracle.PiecewiseLinearModelStructOutput]>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    minimumLoanDuration(overrides?: CallOverrides): Promise<[BigNumber]>;

    priceLoan(
      collateralToken: PromiseOrValue<string>,
      collateralTokenId: PromiseOrValue<BigNumberish>,
      principal: PromiseOrValue<BigNumberish>,
      repayment: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      maturity: PromiseOrValue<BigNumberish>,
      utilization: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setCollateralOracle(
      collateralOracle_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      packedCollateralParameters: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMinimumLoanDuration(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUtilizationParameters(
      packedUtilizationParameters: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportedCollateralTokens(overrides?: CallOverrides): Promise<[string[]]>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  IMPLEMENTATION_VERSION(overrides?: CallOverrides): Promise<string>;

  PARAMETER_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  collateralOracle(overrides?: CallOverrides): Promise<string>;

  currencyToken(overrides?: CallOverrides): Promise<string>;

  getCollateralParameters(
    collateralToken: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<LoanPriceOracle.CollateralParametersStructOutput>;

  getRoleAdmin(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getUtilizationParameters(
    overrides?: CallOverrides
  ): Promise<LoanPriceOracle.PiecewiseLinearModelStructOutput>;

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  minimumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;

  priceLoan(
    collateralToken: PromiseOrValue<string>,
    collateralTokenId: PromiseOrValue<BigNumberish>,
    principal: PromiseOrValue<BigNumberish>,
    repayment: PromiseOrValue<BigNumberish>,
    duration: PromiseOrValue<BigNumberish>,
    maturity: PromiseOrValue<BigNumberish>,
    utilization: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setCollateralOracle(
    collateralOracle_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setCollateralParameters(
    collateralToken: PromiseOrValue<string>,
    packedCollateralParameters: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMinimumLoanDuration(
    duration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUtilizationParameters(
    packedUtilizationParameters: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportedCollateralTokens(overrides?: CallOverrides): Promise<string[]>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    IMPLEMENTATION_VERSION(overrides?: CallOverrides): Promise<string>;

    PARAMETER_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    collateralOracle(overrides?: CallOverrides): Promise<string>;

    currencyToken(overrides?: CallOverrides): Promise<string>;

    getCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<LoanPriceOracle.CollateralParametersStructOutput>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getUtilizationParameters(
      overrides?: CallOverrides
    ): Promise<LoanPriceOracle.PiecewiseLinearModelStructOutput>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    minimumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;

    priceLoan(
      collateralToken: PromiseOrValue<string>,
      collateralTokenId: PromiseOrValue<BigNumberish>,
      principal: PromiseOrValue<BigNumberish>,
      repayment: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      maturity: PromiseOrValue<BigNumberish>,
      utilization: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setCollateralOracle(
      collateralOracle_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      packedCollateralParameters: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMinimumLoanDuration(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setUtilizationParameters(
      packedUtilizationParameters: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportedCollateralTokens(overrides?: CallOverrides): Promise<string[]>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "CollateralOracleUpdated(address)"(
      collateralOracle?: null
    ): CollateralOracleUpdatedEventFilter;
    CollateralOracleUpdated(
      collateralOracle?: null
    ): CollateralOracleUpdatedEventFilter;

    "CollateralParametersUpdated(address)"(
      collateralToken?: PromiseOrValue<string> | null
    ): CollateralParametersUpdatedEventFilter;
    CollateralParametersUpdated(
      collateralToken?: PromiseOrValue<string> | null
    ): CollateralParametersUpdatedEventFilter;

    "MinimumLoanDurationUpdated(uint256)"(
      duration?: null
    ): MinimumLoanDurationUpdatedEventFilter;
    MinimumLoanDurationUpdated(
      duration?: null
    ): MinimumLoanDurationUpdatedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;

    "UtilizationParametersUpdated()"(): UtilizationParametersUpdatedEventFilter;
    UtilizationParametersUpdated(): UtilizationParametersUpdatedEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    IMPLEMENTATION_VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    PARAMETER_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    collateralOracle(overrides?: CallOverrides): Promise<BigNumber>;

    currencyToken(overrides?: CallOverrides): Promise<BigNumber>;

    getCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUtilizationParameters(overrides?: CallOverrides): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minimumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;

    priceLoan(
      collateralToken: PromiseOrValue<string>,
      collateralTokenId: PromiseOrValue<BigNumberish>,
      principal: PromiseOrValue<BigNumberish>,
      repayment: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      maturity: PromiseOrValue<BigNumberish>,
      utilization: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setCollateralOracle(
      collateralOracle_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      packedCollateralParameters: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMinimumLoanDuration(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUtilizationParameters(
      packedUtilizationParameters: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportedCollateralTokens(overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    IMPLEMENTATION_VERSION(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PARAMETER_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    collateralOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currencyToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUtilizationParameters(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minimumLoanDuration(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    priceLoan(
      collateralToken: PromiseOrValue<string>,
      collateralTokenId: PromiseOrValue<BigNumberish>,
      principal: PromiseOrValue<BigNumberish>,
      repayment: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      maturity: PromiseOrValue<BigNumberish>,
      utilization: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setCollateralOracle(
      collateralOracle_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setCollateralParameters(
      collateralToken: PromiseOrValue<string>,
      packedCollateralParameters: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMinimumLoanDuration(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUtilizationParameters(
      packedUtilizationParameters: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportedCollateralTokens(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
