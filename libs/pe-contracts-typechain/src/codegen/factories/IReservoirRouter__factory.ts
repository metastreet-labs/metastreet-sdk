/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IReservoirRouter, IReservoirRouterInterface } from "../IReservoirRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "enum IReservoirRouter.ExchangeKind",
        name: "exchangeKind",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "expectedOwner",
        type: "address",
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "feeBps",
        type: "uint16",
      },
    ],
    name: "singleERC721ListingFillWithPrecheck",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export class IReservoirRouter__factory {
  static readonly abi = _abi;
  static createInterface(): IReservoirRouterInterface {
    return new utils.Interface(_abi) as IReservoirRouterInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IReservoirRouter {
    return new Contract(address, _abi, signerOrProvider) as IReservoirRouter;
  }
}
