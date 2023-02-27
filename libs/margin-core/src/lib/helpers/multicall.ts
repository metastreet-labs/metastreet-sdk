import { Multicall3, Multicall3__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BytesLike } from "ethers";
import { Result } from "ethers/lib/utils";
import { SignerOrProvider } from "../fetchers/types";

export type MulticallCallStruct = Multicall3.Call3Struct;

export interface MulticallCall extends Omit<MulticallCallStruct, "allowFailure"> {
  allowFailure?: boolean;
  decode: (data: BytesLike) => Result;
  id?: string;
}

export type MulticallFunction = (
  calls: MulticallCall[]
) => Promise<(Omit<MulticallCall, "decode"> & { result: Result })[]>;

export const multicall = async (multicall3: Multicall3, calls: MulticallCall[]) => {
  const callStructs = calls.map(({ allowFailure = true, callData, target }) => ({ allowFailure, callData, target }));
  const resultStructs = await multicall3.callStatic.aggregate3(callStructs);

  const resultArray = resultStructs.map((resultStruct, ind) => {
    const { decode, ...rest } = calls[ind];
    const decodedResult = decode(resultStruct.returnData);
    return {
      result: decodedResult,
      ...rest,
    };
  });

  return resultArray;
};

export const createMulticall = (multicallContractAddress: string, signerOrProvider: SignerOrProvider) => {
  const multicall3 = Multicall3__factory.connect(multicallContractAddress, signerOrProvider);
  const multicallFunction: MulticallFunction = (calls) => multicall(multicall3, calls);
  return {
    multicall3,
    multicall: multicallFunction,
  };
};
