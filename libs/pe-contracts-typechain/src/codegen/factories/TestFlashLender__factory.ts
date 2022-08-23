/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, BigNumberish, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { TestFlashLender, TestFlashLenderInterface } from "../TestFlashLender";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "currencyToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "flashLoanFeeBp_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "currencyToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "flashFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC3156FlashBorrower",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "flashLoan",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flashLoanFeeBp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "maxFlashLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "feeBp",
        type: "uint256",
      },
    ],
    name: "setFlashLoanFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080346100af57601f610b4d38819003918201601f19168301916001600160401b038311848410176100b45780849260409485528339810103126100af5780516001600160a01b0391828216918290036100af57602001519060005460018060a01b0319903382821617600055604051943391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600087a36001541617600155600255610a8290816100cb8239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe60806040526004361015610013575b600080fd5b6000803560e01c9081630c533703146100de575080635cffe9de146100d5578063613255ab146100cc5780636b2fa374146100c3578063715018a6146100ba5780638da5cb5b146100b1578063a1db9782146100a8578063d9d98ce41461009f578063e92d0d5d146100965763f2fde38b1461008e57600080fd5b61000e610326565b5061000e6102f7565b5061000e6102cb565b5061000e610282565b5061000e610258565b5061000e6101f5565b5061000e6101cb565b5061000e61019b565b5061000e61010e565b346100fa57806003193601126100fa5760025460805260206080f35b80fd5b6001600160a01b0381160361000e57565b503461000e57608036600319011261000e5760043561012c816100fd565b602435610138816100fd565b6064359067ffffffffffffffff9081831161000e573660238401121561000e57826004013591821161000e57366024838501011161000e576101979360246101859401916044359161065b565b60405190151581529081906020820190565b0390f35b503461000e57602036600319011261000e5760206101c36004356101be816100fd565b6104d6565b604051908152f35b503461000e57600036600319011261000e576001546040516001600160a01b039091168152602090f35b503461000e576000806003193601126100fa5780546001600160a01b038116906102203383146103c1565b6001600160a01b03191682556040519082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08284a3f35b503461000e57600036600319011261000e576000546040516001600160a01b039091168152602090f35b503461000e57604036600319011261000e576102c96004356102a3816100fd565b6000546001600160a01b0391906102bd90831633146103c1565b60243591339116610774565b005b503461000e57604036600319011261000e5760206101c36004356102ee816100fd565b602435906105b3565b503461000e57602036600319011261000e5761031e60018060a01b036000541633146103c1565b600435600255005b503461000e57602036600319011261000e57600435610344816100fd565b6000546001600160a01b039061035d90821633146103c1565b81161561036d576102c99061040c565b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b156103c857565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b600080546001600160a01b039283166001600160a01b03198216811783556040519093909116917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3565b50634e487b7160e01b600052604160045260246000fd5b6040810190811067ffffffffffffffff82111761048b57604052565b610493610458565b604052565b90601f8019910116810190811067ffffffffffffffff82111761048b57604052565b9081602091031261000e575190565b506040513d6000823e3d90fd5b6001546001600160a01b039081169116819003610556576020602491604051928380926370a0823160e01b82523060048301525afa908115610549575b60009161051e575090565b61053f915060203d8111610542575b6105378183610498565b8101906104ba565b90565b503d61052d565b6105516104c9565b610513565b50600090565b1561056357565b60405162461bcd60e51b81526020600482015260116024820152702ab739bab83837b93a32b2103a37b5b2b760791b6044820152606490fd5b50634e487b7160e01b600052601160045260246000fd5b60015461271092916105d2916001600160a01b0391821691161461055c565b6002549080600019048211811515166105ea57020490565b6105f261059c565b020490565b156105fe57565b60405162461bcd60e51b815260206004820152601960248201527f49455243333135363a2043616c6c6261636b206661696c6564000000000000006044820152606490fd5b8119811161064f570190565b61065761059c565b0190565b61072a7f439148f0bbc682ca079e46d6e2c2f0c1e3b820f1a291b069d8882abf8cf18dd9610744966020869760c461073c976106bf8a60018060a01b036106b681600154169e8f956106b184821697881461055c565b6105b3565b9a16809d610774565b8460405195869485936323e30c8b60e01b855233600486015260248501528c60448501528a606485015260a060848501528160a4850152848401376000838284010152601f8019910116810103018160008b5af1908115610767575b600091610749575b50146105f7565b6001546001600160a01b031692610643565b9130916107d3565b600190565b610761915060203d8111610542576105378183610498565b38610723565b61076f6104c9565b61071b565b60405163a9059cbb60e01b60208201526001600160a01b0390921660248301526044808301939093529181526107c4916080820167ffffffffffffffff8111838210176107c6575b6040526108a2565b565b6107ce610458565b6107bc565b6040516323b872dd60e01b60208201526001600160a01b0392831660248201529290911660448301526064808301939093529181526107c49160a0820182811067ffffffffffffffff8211176107c6576040526108a2565b9081602091031261000e5751801515810361000e5790565b1561084a57565b60405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608490fd5b6040516001600160a01b0391909116916108bb8261046f565b6020928383527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656484840152803b15610932576000828192828761090d9796519301915af1610907610977565b906109c5565b8051908161091a57505050565b826107c49361092d93830101910161082b565b610843565b60405162461bcd60e51b815260048101859052601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b3d156109c0573d9067ffffffffffffffff82116109b3575b604051916109a7601f8201601f191660200184610498565b82523d6000602084013e565b6109bb610458565b61098f565b606090565b909190156109d1575090565b8151156109e15750805190602001fd5b6040519062461bcd60e51b82528160208060048301528251928360248401526000915b848310610a33575050918060449311610a26575b601f01601f19168101030190fd5b6000838284010152610a18565b8183018101518684016044015285935091820191610a0456fea26469706673582212204a8234551125fd6c30efb4f4e90d9b07954f7984d04eade37ac5c281f56b420b64736f6c634300080f0033";

type TestFlashLenderConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: TestFlashLenderConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class TestFlashLender__factory extends ContractFactory {
  constructor(...args: TestFlashLenderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    currencyToken_: PromiseOrValue<string>,
    flashLoanFeeBp_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestFlashLender> {
    return super.deploy(currencyToken_, flashLoanFeeBp_, overrides || {}) as Promise<TestFlashLender>;
  }
  override getDeployTransaction(
    currencyToken_: PromiseOrValue<string>,
    flashLoanFeeBp_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(currencyToken_, flashLoanFeeBp_, overrides || {});
  }
  override attach(address: string): TestFlashLender {
    return super.attach(address) as TestFlashLender;
  }
  override connect(signer: Signer): TestFlashLender__factory {
    return super.connect(signer) as TestFlashLender__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestFlashLenderInterface {
    return new utils.Interface(_abi) as TestFlashLenderInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): TestFlashLender {
    return new Contract(address, _abi, signerOrProvider) as TestFlashLender;
  }
}
