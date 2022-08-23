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
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";

export interface IVaultInterface extends utils.Interface {
  functions: {
    "currencyToken()": FunctionFragment;
    "deposit(uint8,uint256)": FunctionFragment;
    "loanPriceOracle()": FunctionFragment;
    "lpToken(uint8)": FunctionFragment;
    "name()": FunctionFragment;
    "noteAdapters(address)": FunctionFragment;
    "onCollateralLiquidated(address,uint256,uint256)": FunctionFragment;
    "onLoanExpired(address,uint256)": FunctionFragment;
    "onLoanRepaid(address,uint256)": FunctionFragment;
    "redeem(uint8,uint256)": FunctionFragment;
    "redemptionSharePrice(uint8)": FunctionFragment;
    "sellNote(address,uint256,uint256)": FunctionFragment;
    "sellNoteAndDeposit(address,uint256,uint256,uint256[2])": FunctionFragment;
    "sharePrice(uint8)": FunctionFragment;
    "supportedNoteTokens()": FunctionFragment;
    "utilization()": FunctionFragment;
    "withdraw(uint8,uint256)": FunctionFragment;
    "withdrawCollateral(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "currencyToken"
      | "deposit"
      | "loanPriceOracle"
      | "lpToken"
      | "name"
      | "noteAdapters"
      | "onCollateralLiquidated"
      | "onLoanExpired"
      | "onLoanRepaid"
      | "redeem"
      | "redemptionSharePrice"
      | "sellNote"
      | "sellNoteAndDeposit"
      | "sharePrice"
      | "supportedNoteTokens"
      | "utilization"
      | "withdraw"
      | "withdrawCollateral"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "currencyToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "loanPriceOracle", values?: undefined): string;
  encodeFunctionData(functionFragment: "lpToken", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "noteAdapters", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "onCollateralLiquidated",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "onLoanExpired",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "onLoanRepaid",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "redemptionSharePrice", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(
    functionFragment: "sellNote",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "sellNoteAndDeposit",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ]
  ): string;
  encodeFunctionData(functionFragment: "sharePrice", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "supportedNoteTokens", values?: undefined): string;
  encodeFunctionData(functionFragment: "utilization", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawCollateral",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "currencyToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "loanPriceOracle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lpToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "noteAdapters", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onCollateralLiquidated", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onLoanExpired", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onLoanRepaid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redemptionSharePrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sellNote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sellNoteAndDeposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sharePrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "supportedNoteTokens", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "utilization", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawCollateral", data: BytesLike): Result;

  events: {
    "CollateralLiquidated(address,uint256,uint256[2])": EventFragment;
    "CollateralWithdrawn(address,uint256,address,uint256,address)": EventFragment;
    "Deposited(address,uint8,uint256,uint256)": EventFragment;
    "LoanLiquidated(address,uint256,uint256[2])": EventFragment;
    "LoanRepaid(address,uint256,uint256,uint256[2])": EventFragment;
    "NotePurchased(address,address,uint256,uint256,uint256,uint256[2])": EventFragment;
    "Redeemed(address,uint8,uint256,uint256)": EventFragment;
    "Withdrawn(address,uint8,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CollateralLiquidated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CollateralWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LoanLiquidated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LoanRepaid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NotePurchased"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Redeemed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}

export interface CollateralLiquidatedEventObject {
  noteToken: string;
  loanId: BigNumber;
  trancheReturns: [BigNumber, BigNumber];
}
export type CollateralLiquidatedEvent = TypedEvent<
  [string, BigNumber, [BigNumber, BigNumber]],
  CollateralLiquidatedEventObject
>;

export type CollateralLiquidatedEventFilter = TypedEventFilter<CollateralLiquidatedEvent>;

export interface CollateralWithdrawnEventObject {
  noteToken: string;
  loanId: BigNumber;
  collateralToken: string;
  collateralTokenId: BigNumber;
  collateralLiquidator: string;
}
export type CollateralWithdrawnEvent = TypedEvent<
  [string, BigNumber, string, BigNumber, string],
  CollateralWithdrawnEventObject
>;

export type CollateralWithdrawnEventFilter = TypedEventFilter<CollateralWithdrawnEvent>;

export interface DepositedEventObject {
  account: string;
  trancheId: number;
  amount: BigNumber;
  shares: BigNumber;
}
export type DepositedEvent = TypedEvent<[string, number, BigNumber, BigNumber], DepositedEventObject>;

export type DepositedEventFilter = TypedEventFilter<DepositedEvent>;

export interface LoanLiquidatedEventObject {
  noteToken: string;
  loanId: BigNumber;
  trancheLosses: [BigNumber, BigNumber];
}
export type LoanLiquidatedEvent = TypedEvent<[string, BigNumber, [BigNumber, BigNumber]], LoanLiquidatedEventObject>;

export type LoanLiquidatedEventFilter = TypedEventFilter<LoanLiquidatedEvent>;

export interface LoanRepaidEventObject {
  noteToken: string;
  loanId: BigNumber;
  adminFee: BigNumber;
  trancheReturns: [BigNumber, BigNumber];
}
export type LoanRepaidEvent = TypedEvent<[string, BigNumber, BigNumber, [BigNumber, BigNumber]], LoanRepaidEventObject>;

export type LoanRepaidEventFilter = TypedEventFilter<LoanRepaidEvent>;

export interface NotePurchasedEventObject {
  account: string;
  noteToken: string;
  noteTokenId: BigNumber;
  loanId: BigNumber;
  purchasePrice: BigNumber;
  trancheContributions: [BigNumber, BigNumber];
}
export type NotePurchasedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber, [BigNumber, BigNumber]],
  NotePurchasedEventObject
>;

export type NotePurchasedEventFilter = TypedEventFilter<NotePurchasedEvent>;

export interface RedeemedEventObject {
  account: string;
  trancheId: number;
  shares: BigNumber;
  amount: BigNumber;
}
export type RedeemedEvent = TypedEvent<[string, number, BigNumber, BigNumber], RedeemedEventObject>;

export type RedeemedEventFilter = TypedEventFilter<RedeemedEvent>;

export interface WithdrawnEventObject {
  account: string;
  trancheId: number;
  amount: BigNumber;
}
export type WithdrawnEvent = TypedEvent<[string, number, BigNumber], WithdrawnEventObject>;

export type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;

export interface IVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IVaultInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    currencyToken(overrides?: CallOverrides): Promise<[string]>;

    deposit(
      trancheId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    loanPriceOracle(overrides?: CallOverrides): Promise<[string]>;

    lpToken(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    noteAdapters(noteToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;

    onCollateralLiquidated(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      proceeds: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    onLoanExpired(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    onLoanRepaid(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    redeem(
      trancheId: PromiseOrValue<BigNumberish>,
      shares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    redemptionSharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;

    sellNote(
      noteToken: PromiseOrValue<string>,
      noteTokenId: PromiseOrValue<BigNumberish>,
      minPurchasePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sellNoteAndDeposit(
      noteToken: PromiseOrValue<string>,
      noteTokenId: PromiseOrValue<BigNumberish>,
      minPurchasePrice: PromiseOrValue<BigNumberish>,
      allocation: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;

    supportedNoteTokens(overrides?: CallOverrides): Promise<[string[]]>;

    utilization(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdraw(
      trancheId: PromiseOrValue<BigNumberish>,
      maxAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawCollateral(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  currencyToken(overrides?: CallOverrides): Promise<string>;

  deposit(
    trancheId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  loanPriceOracle(overrides?: CallOverrides): Promise<string>;

  lpToken(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

  name(overrides?: CallOverrides): Promise<string>;

  noteAdapters(noteToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

  onCollateralLiquidated(
    noteToken: PromiseOrValue<string>,
    loanId: PromiseOrValue<BigNumberish>,
    proceeds: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  onLoanExpired(
    noteToken: PromiseOrValue<string>,
    loanId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  onLoanRepaid(
    noteToken: PromiseOrValue<string>,
    loanId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  redeem(
    trancheId: PromiseOrValue<BigNumberish>,
    shares: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  redemptionSharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

  sellNote(
    noteToken: PromiseOrValue<string>,
    noteTokenId: PromiseOrValue<BigNumberish>,
    minPurchasePrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sellNoteAndDeposit(
    noteToken: PromiseOrValue<string>,
    noteTokenId: PromiseOrValue<BigNumberish>,
    minPurchasePrice: PromiseOrValue<BigNumberish>,
    allocation: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

  supportedNoteTokens(overrides?: CallOverrides): Promise<string[]>;

  utilization(overrides?: CallOverrides): Promise<BigNumber>;

  withdraw(
    trancheId: PromiseOrValue<BigNumberish>,
    maxAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawCollateral(
    noteToken: PromiseOrValue<string>,
    loanId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    currencyToken(overrides?: CallOverrides): Promise<string>;

    deposit(
      trancheId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    loanPriceOracle(overrides?: CallOverrides): Promise<string>;

    lpToken(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

    name(overrides?: CallOverrides): Promise<string>;

    noteAdapters(noteToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

    onCollateralLiquidated(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      proceeds: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    onLoanExpired(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    onLoanRepaid(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    redeem(
      trancheId: PromiseOrValue<BigNumberish>,
      shares: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    redemptionSharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    sellNote(
      noteToken: PromiseOrValue<string>,
      noteTokenId: PromiseOrValue<BigNumberish>,
      minPurchasePrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    sellNoteAndDeposit(
      noteToken: PromiseOrValue<string>,
      noteTokenId: PromiseOrValue<BigNumberish>,
      minPurchasePrice: PromiseOrValue<BigNumberish>,
      allocation: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: CallOverrides
    ): Promise<void>;

    sharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    supportedNoteTokens(overrides?: CallOverrides): Promise<string[]>;

    utilization(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      trancheId: PromiseOrValue<BigNumberish>,
      maxAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawCollateral(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CollateralLiquidated(address,uint256,uint256[2])"(
      noteToken?: PromiseOrValue<string> | null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      trancheReturns?: null
    ): CollateralLiquidatedEventFilter;
    CollateralLiquidated(
      noteToken?: PromiseOrValue<string> | null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      trancheReturns?: null
    ): CollateralLiquidatedEventFilter;

    "CollateralWithdrawn(address,uint256,address,uint256,address)"(
      noteToken?: PromiseOrValue<string> | null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      collateralToken?: null,
      collateralTokenId?: null,
      collateralLiquidator?: null
    ): CollateralWithdrawnEventFilter;
    CollateralWithdrawn(
      noteToken?: PromiseOrValue<string> | null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      collateralToken?: null,
      collateralTokenId?: null,
      collateralLiquidator?: null
    ): CollateralWithdrawnEventFilter;

    "Deposited(address,uint8,uint256,uint256)"(
      account?: PromiseOrValue<string> | null,
      trancheId?: PromiseOrValue<BigNumberish> | null,
      amount?: null,
      shares?: null
    ): DepositedEventFilter;
    Deposited(
      account?: PromiseOrValue<string> | null,
      trancheId?: PromiseOrValue<BigNumberish> | null,
      amount?: null,
      shares?: null
    ): DepositedEventFilter;

    "LoanLiquidated(address,uint256,uint256[2])"(
      noteToken?: PromiseOrValue<string> | null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      trancheLosses?: null
    ): LoanLiquidatedEventFilter;
    LoanLiquidated(
      noteToken?: PromiseOrValue<string> | null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      trancheLosses?: null
    ): LoanLiquidatedEventFilter;

    "LoanRepaid(address,uint256,uint256,uint256[2])"(
      noteToken?: PromiseOrValue<string> | null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      adminFee?: null,
      trancheReturns?: null
    ): LoanRepaidEventFilter;
    LoanRepaid(
      noteToken?: PromiseOrValue<string> | null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      adminFee?: null,
      trancheReturns?: null
    ): LoanRepaidEventFilter;

    "NotePurchased(address,address,uint256,uint256,uint256,uint256[2])"(
      account?: PromiseOrValue<string> | null,
      noteToken?: PromiseOrValue<string> | null,
      noteTokenId?: null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      purchasePrice?: null,
      trancheContributions?: null
    ): NotePurchasedEventFilter;
    NotePurchased(
      account?: PromiseOrValue<string> | null,
      noteToken?: PromiseOrValue<string> | null,
      noteTokenId?: null,
      loanId?: PromiseOrValue<BigNumberish> | null,
      purchasePrice?: null,
      trancheContributions?: null
    ): NotePurchasedEventFilter;

    "Redeemed(address,uint8,uint256,uint256)"(
      account?: PromiseOrValue<string> | null,
      trancheId?: PromiseOrValue<BigNumberish> | null,
      shares?: null,
      amount?: null
    ): RedeemedEventFilter;
    Redeemed(
      account?: PromiseOrValue<string> | null,
      trancheId?: PromiseOrValue<BigNumberish> | null,
      shares?: null,
      amount?: null
    ): RedeemedEventFilter;

    "Withdrawn(address,uint8,uint256)"(
      account?: PromiseOrValue<string> | null,
      trancheId?: PromiseOrValue<BigNumberish> | null,
      amount?: null
    ): WithdrawnEventFilter;
    Withdrawn(
      account?: PromiseOrValue<string> | null,
      trancheId?: PromiseOrValue<BigNumberish> | null,
      amount?: null
    ): WithdrawnEventFilter;
  };

  estimateGas: {
    currencyToken(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      trancheId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    loanPriceOracle(overrides?: CallOverrides): Promise<BigNumber>;

    lpToken(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    noteAdapters(noteToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    onCollateralLiquidated(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      proceeds: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    onLoanExpired(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    onLoanRepaid(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    redeem(
      trancheId: PromiseOrValue<BigNumberish>,
      shares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    redemptionSharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    sellNote(
      noteToken: PromiseOrValue<string>,
      noteTokenId: PromiseOrValue<BigNumberish>,
      minPurchasePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sellNoteAndDeposit(
      noteToken: PromiseOrValue<string>,
      noteTokenId: PromiseOrValue<BigNumberish>,
      minPurchasePrice: PromiseOrValue<BigNumberish>,
      allocation: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    supportedNoteTokens(overrides?: CallOverrides): Promise<BigNumber>;

    utilization(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      trancheId: PromiseOrValue<BigNumberish>,
      maxAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawCollateral(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    currencyToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      trancheId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    loanPriceOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lpToken(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    noteAdapters(noteToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onCollateralLiquidated(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      proceeds: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    onLoanExpired(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    onLoanRepaid(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    redeem(
      trancheId: PromiseOrValue<BigNumberish>,
      shares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    redemptionSharePrice(
      trancheId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sellNote(
      noteToken: PromiseOrValue<string>,
      noteTokenId: PromiseOrValue<BigNumberish>,
      minPurchasePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sellNoteAndDeposit(
      noteToken: PromiseOrValue<string>,
      noteTokenId: PromiseOrValue<BigNumberish>,
      minPurchasePrice: PromiseOrValue<BigNumberish>,
      allocation: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sharePrice(trancheId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    supportedNoteTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    utilization(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      trancheId: PromiseOrValue<BigNumberish>,
      maxAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawCollateral(
      noteToken: PromiseOrValue<string>,
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
