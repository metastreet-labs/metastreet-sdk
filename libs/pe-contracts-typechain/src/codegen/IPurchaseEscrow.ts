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
  PayableOverrides,
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

export declare namespace IPurchaseEscrow {
  export type PurchaseEscrowTermsStruct = {
    status: PromiseOrValue<BigNumberish>;
    token: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    principal: PromiseOrValue<BigNumberish>;
    repayment: PromiseOrValue<BigNumberish>;
    startTime: PromiseOrValue<BigNumberish>;
    duration: PromiseOrValue<BigNumberish>;
  };

  export type PurchaseEscrowTermsStructOutput = [
    number,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    status: number;
    token: string;
    tokenId: BigNumber;
    principal: BigNumber;
    repayment: BigNumber;
    startTime: BigNumber;
    duration: BigNumber;
  };
}

export interface IPurchaseEscrowInterface extends utils.Interface {
  functions: {
    "buyerNoteToken()": FunctionFragment;
    "create(address,address,uint256,uint256,uint256,uint64)": FunctionFragment;
    "currencyToken()": FunctionFragment;
    "lenderNoteToken()": FunctionFragment;
    "liquidate(uint256)": FunctionFragment;
    "purchaseEscrows(uint256)": FunctionFragment;
    "repay(uint256)": FunctionFragment;
    "repayETH(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "buyerNoteToken"
      | "create"
      | "currencyToken"
      | "lenderNoteToken"
      | "liquidate"
      | "purchaseEscrows"
      | "repay"
      | "repayETH"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "buyerNoteToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "currencyToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lenderNoteToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "liquidate",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseEscrows",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "repay",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "repayETH",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "buyerNoteToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "currencyToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lenderNoteToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "liquidate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseEscrows",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "repay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "repayETH", data: BytesLike): Result;

  events: {
    "PurchaseEscrowCreated(uint256,address,address,address,uint256,uint256,uint256,uint64)": EventFragment;
    "PurchaseEscrowLiquidated(uint256)": EventFragment;
    "PurchaseEscrowRepaid(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PurchaseEscrowCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PurchaseEscrowLiquidated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PurchaseEscrowRepaid"): EventFragment;
}

export interface PurchaseEscrowCreatedEventObject {
  escrowId: BigNumber;
  lender: string;
  buyer: string;
  token: string;
  tokenId: BigNumber;
  principal: BigNumber;
  repayment: BigNumber;
  duration: BigNumber;
}
export type PurchaseEscrowCreatedEvent = TypedEvent<
  [
    BigNumber,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ],
  PurchaseEscrowCreatedEventObject
>;

export type PurchaseEscrowCreatedEventFilter =
  TypedEventFilter<PurchaseEscrowCreatedEvent>;

export interface PurchaseEscrowLiquidatedEventObject {
  escrowId: BigNumber;
}
export type PurchaseEscrowLiquidatedEvent = TypedEvent<
  [BigNumber],
  PurchaseEscrowLiquidatedEventObject
>;

export type PurchaseEscrowLiquidatedEventFilter =
  TypedEventFilter<PurchaseEscrowLiquidatedEvent>;

export interface PurchaseEscrowRepaidEventObject {
  escrowId: BigNumber;
}
export type PurchaseEscrowRepaidEvent = TypedEvent<
  [BigNumber],
  PurchaseEscrowRepaidEventObject
>;

export type PurchaseEscrowRepaidEventFilter =
  TypedEventFilter<PurchaseEscrowRepaidEvent>;

export interface IPurchaseEscrow extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPurchaseEscrowInterface;

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
    buyerNoteToken(overrides?: CallOverrides): Promise<[string]>;

    create(
      buyer: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      principal: PromiseOrValue<BigNumberish>,
      repayment: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    currencyToken(overrides?: CallOverrides): Promise<[string]>;

    lenderNoteToken(overrides?: CallOverrides): Promise<[string]>;

    liquidate(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    purchaseEscrows(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IPurchaseEscrow.PurchaseEscrowTermsStructOutput]>;

    repay(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    repayETH(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  buyerNoteToken(overrides?: CallOverrides): Promise<string>;

  create(
    buyer: PromiseOrValue<string>,
    token: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    principal: PromiseOrValue<BigNumberish>,
    repayment: PromiseOrValue<BigNumberish>,
    duration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  currencyToken(overrides?: CallOverrides): Promise<string>;

  lenderNoteToken(overrides?: CallOverrides): Promise<string>;

  liquidate(
    escrowId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  purchaseEscrows(
    escrowId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IPurchaseEscrow.PurchaseEscrowTermsStructOutput>;

  repay(
    escrowId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  repayETH(
    escrowId: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    buyerNoteToken(overrides?: CallOverrides): Promise<string>;

    create(
      buyer: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      principal: PromiseOrValue<BigNumberish>,
      repayment: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currencyToken(overrides?: CallOverrides): Promise<string>;

    lenderNoteToken(overrides?: CallOverrides): Promise<string>;

    liquidate(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    purchaseEscrows(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IPurchaseEscrow.PurchaseEscrowTermsStructOutput>;

    repay(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    repayETH(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "PurchaseEscrowCreated(uint256,address,address,address,uint256,uint256,uint256,uint64)"(
      escrowId?: PromiseOrValue<BigNumberish> | null,
      lender?: null,
      buyer?: null,
      token?: null,
      tokenId?: null,
      principal?: null,
      repayment?: null,
      duration?: null
    ): PurchaseEscrowCreatedEventFilter;
    PurchaseEscrowCreated(
      escrowId?: PromiseOrValue<BigNumberish> | null,
      lender?: null,
      buyer?: null,
      token?: null,
      tokenId?: null,
      principal?: null,
      repayment?: null,
      duration?: null
    ): PurchaseEscrowCreatedEventFilter;

    "PurchaseEscrowLiquidated(uint256)"(
      escrowId?: PromiseOrValue<BigNumberish> | null
    ): PurchaseEscrowLiquidatedEventFilter;
    PurchaseEscrowLiquidated(
      escrowId?: PromiseOrValue<BigNumberish> | null
    ): PurchaseEscrowLiquidatedEventFilter;

    "PurchaseEscrowRepaid(uint256)"(
      escrowId?: PromiseOrValue<BigNumberish> | null
    ): PurchaseEscrowRepaidEventFilter;
    PurchaseEscrowRepaid(
      escrowId?: PromiseOrValue<BigNumberish> | null
    ): PurchaseEscrowRepaidEventFilter;
  };

  estimateGas: {
    buyerNoteToken(overrides?: CallOverrides): Promise<BigNumber>;

    create(
      buyer: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      principal: PromiseOrValue<BigNumberish>,
      repayment: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    currencyToken(overrides?: CallOverrides): Promise<BigNumber>;

    lenderNoteToken(overrides?: CallOverrides): Promise<BigNumber>;

    liquidate(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    purchaseEscrows(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    repay(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    repayETH(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buyerNoteToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    create(
      buyer: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      principal: PromiseOrValue<BigNumberish>,
      repayment: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    currencyToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lenderNoteToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    liquidate(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    purchaseEscrows(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    repay(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    repayETH(
      escrowId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
