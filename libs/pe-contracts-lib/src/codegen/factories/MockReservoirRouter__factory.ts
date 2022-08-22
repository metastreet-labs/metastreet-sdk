/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  MockReservoirRouter,
  MockReservoirRouterInterface,
} from "../MockReservoirRouter";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "enum IReservoirRouter.ExchangeKind",
        name: "",
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
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "singleERC721ListingFillWithPrecheck",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x6080806040523461001657610258908161001c8239f35b600080fdfe608060408181526004918236101561001657600080fd5b600090813560e01c90816306c575ce14610114575063150b7a021461003a57600080fd5b34610111576080366003190112610111576001600160a01b0383358181160361010c576024359081160361010c5767ffffffffffffffff6064358181116100e057366023820112156100e05780850135918083116100f957845195601f8401601f19908116603f01168701918211878310176100e45750845281855236602483830101116100e057906020948160248794018483013701015251630a85bd0160e11b8152f35b8280fd5b604190634e487b7160e01b6000525260246000fd5b634e487b7160e01b845260418652602484fd5b600080fd5b80fd5b9050836101003660031901126100e05767ffffffffffffffff813581811161021e573660238201121561021e5780830135828111610212573691016024011161021a576006602435101561021a576044356001600160a01b038181169182900361021257608435908082168092036102165760a435818116036102165760c435908116036102125760e43561ffff81160361021257813b15610212576064858780948294632142170760e11b845230898501526024840152833560448401525af18015610208576101e457838551f35b82116101f557508252828080838551f35b634e487b7160e01b835260419052602482fd5b85513d86823e3d90fd5b8580fd5b8680fd5b8380fd5b8480fdfea2646970667358221220e2305ce780a361810ba39fecc598dc232433e596ea9fb1f1b7429a3d0d148cb564736f6c634300080f0033";

type MockReservoirRouterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockReservoirRouterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockReservoirRouter__factory extends ContractFactory {
  constructor(...args: MockReservoirRouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockReservoirRouter> {
    return super.deploy(overrides || {}) as Promise<MockReservoirRouter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockReservoirRouter {
    return super.attach(address) as MockReservoirRouter;
  }
  override connect(signer: Signer): MockReservoirRouter__factory {
    return super.connect(signer) as MockReservoirRouter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockReservoirRouterInterface {
    return new utils.Interface(_abi) as MockReservoirRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockReservoirRouter {
    return new Contract(address, _abi, signerOrProvider) as MockReservoirRouter;
  }
}
