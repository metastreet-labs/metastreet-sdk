/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ILoanReceiver, ILoanReceiverInterface } from "../ILoanReceiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "noteToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "onLoanExpired",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "noteToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "onLoanRepaid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ILoanReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): ILoanReceiverInterface {
    return new utils.Interface(_abi) as ILoanReceiverInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ILoanReceiver {
    return new Contract(address, _abi, signerOrProvider) as ILoanReceiver;
  }
}
