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
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";

export declare namespace INoteAdapter {
  export type LoanInfoStruct = {
    loanId: PromiseOrValue<BigNumberish>;
    borrower: PromiseOrValue<string>;
    principal: PromiseOrValue<BigNumberish>;
    repayment: PromiseOrValue<BigNumberish>;
    maturity: PromiseOrValue<BigNumberish>;
    duration: PromiseOrValue<BigNumberish>;
    currencyToken: PromiseOrValue<string>;
    collateralToken: PromiseOrValue<string>;
    collateralTokenId: PromiseOrValue<BigNumberish>;
  };

  export type LoanInfoStructOutput = [
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    BigNumber
  ] & {
    loanId: BigNumber;
    borrower: string;
    principal: BigNumber;
    repayment: BigNumber;
    maturity: BigNumber;
    duration: BigNumber;
    currencyToken: string;
    collateralToken: string;
    collateralTokenId: BigNumber;
  };
}

export interface INoteAdapterInterface extends utils.Interface {
  functions: {
    "getLiquidateCalldata(uint256)": FunctionFragment;
    "getLoanInfo(uint256)": FunctionFragment;
    "getUnwrapCalldata(uint256)": FunctionFragment;
    "isExpired(uint256)": FunctionFragment;
    "isLiquidated(uint256)": FunctionFragment;
    "isRepaid(uint256)": FunctionFragment;
    "isSupported(uint256,address)": FunctionFragment;
    "name()": FunctionFragment;
    "noteToken()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getLiquidateCalldata"
      | "getLoanInfo"
      | "getUnwrapCalldata"
      | "isExpired"
      | "isLiquidated"
      | "isRepaid"
      | "isSupported"
      | "name"
      | "noteToken"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "getLiquidateCalldata", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "getLoanInfo", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "getUnwrapCalldata", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "isExpired", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "isLiquidated", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "isRepaid", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(
    functionFragment: "isSupported",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "noteToken", values?: undefined): string;

  decodeFunctionResult(functionFragment: "getLiquidateCalldata", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getLoanInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getUnwrapCalldata", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isExpired", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLiquidated", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRepaid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isSupported", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "noteToken", data: BytesLike): Result;

  events: {};
}

export interface INoteAdapter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: INoteAdapterInterface;

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
    getLiquidateCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string]>;

    getLoanInfo(
      noteTokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[INoteAdapter.LoanInfoStructOutput]>;

    getUnwrapCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string]>;

    isExpired(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;

    isLiquidated(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;

    isRepaid(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;

    isSupported(
      noteTokenId: PromiseOrValue<BigNumberish>,
      currencyToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    noteToken(overrides?: CallOverrides): Promise<[string]>;
  };

  getLiquidateCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string]>;

  getLoanInfo(
    noteTokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<INoteAdapter.LoanInfoStructOutput>;

  getUnwrapCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string]>;

  isExpired(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;

  isLiquidated(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;

  isRepaid(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;

  isSupported(
    noteTokenId: PromiseOrValue<BigNumberish>,
    currencyToken: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  noteToken(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getLiquidateCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string]>;

    getLoanInfo(
      noteTokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<INoteAdapter.LoanInfoStructOutput>;

    getUnwrapCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string]>;

    isExpired(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;

    isLiquidated(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;

    isRepaid(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;

    isSupported(
      noteTokenId: PromiseOrValue<BigNumberish>,
      currencyToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    noteToken(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getLiquidateCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    getLoanInfo(noteTokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    getUnwrapCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    isExpired(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    isLiquidated(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    isRepaid(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    isSupported(
      noteTokenId: PromiseOrValue<BigNumberish>,
      currencyToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    noteToken(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getLiquidateCalldata(
      loanId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLoanInfo(noteTokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUnwrapCalldata(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isExpired(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isLiquidated(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isRepaid(loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isSupported(
      noteTokenId: PromiseOrValue<BigNumberish>,
      currencyToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    noteToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
