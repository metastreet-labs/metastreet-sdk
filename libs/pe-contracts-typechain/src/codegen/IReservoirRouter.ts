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
  PayableOverrides,
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

export interface IReservoirRouterInterface extends utils.Interface {
  functions: {
    "singleERC721ListingFillWithPrecheck(bytes,uint8,address,uint256,address,address,address,uint16)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "singleERC721ListingFillWithPrecheck"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "singleERC721ListingFillWithPrecheck",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "singleERC721ListingFillWithPrecheck",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IReservoirRouter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IReservoirRouterInterface;

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
    singleERC721ListingFillWithPrecheck(
      data: PromiseOrValue<BytesLike>,
      exchangeKind: PromiseOrValue<BigNumberish>,
      collection: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      expectedOwner: PromiseOrValue<string>,
      feeRecipient: PromiseOrValue<string>,
      feeBps: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  singleERC721ListingFillWithPrecheck(
    data: PromiseOrValue<BytesLike>,
    exchangeKind: PromiseOrValue<BigNumberish>,
    collection: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
    expectedOwner: PromiseOrValue<string>,
    feeRecipient: PromiseOrValue<string>,
    feeBps: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    singleERC721ListingFillWithPrecheck(
      data: PromiseOrValue<BytesLike>,
      exchangeKind: PromiseOrValue<BigNumberish>,
      collection: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      expectedOwner: PromiseOrValue<string>,
      feeRecipient: PromiseOrValue<string>,
      feeBps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    singleERC721ListingFillWithPrecheck(
      data: PromiseOrValue<BytesLike>,
      exchangeKind: PromiseOrValue<BigNumberish>,
      collection: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      expectedOwner: PromiseOrValue<string>,
      feeRecipient: PromiseOrValue<string>,
      feeBps: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    singleERC721ListingFillWithPrecheck(
      data: PromiseOrValue<BytesLike>,
      exchangeKind: PromiseOrValue<BigNumberish>,
      collection: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      expectedOwner: PromiseOrValue<string>,
      feeRecipient: PromiseOrValue<string>,
      feeBps: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
