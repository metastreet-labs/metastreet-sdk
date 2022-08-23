/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  MockLoanPriceOracle,
  MockLoanPriceOracleInterface,
} from "../MockLoanPriceOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "currencyToken_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InsufficientTimeRemaining",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "ParameterOutOfBounds",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsupportedCollateral",
    type: "error",
  },
  {
    inputs: [],
    name: "collateralOracle",
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
    inputs: [
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
    ],
    name: "collateralValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
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
        name: "",
        type: "address",
      },
    ],
    name: "getCollateralParameters",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "active",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint72",
                name: "offset",
                type: "uint72",
              },
              {
                internalType: "uint72",
                name: "slope1",
                type: "uint72",
              },
              {
                internalType: "uint72",
                name: "slope2",
                type: "uint72",
              },
              {
                internalType: "uint96",
                name: "target",
                type: "uint96",
              },
              {
                internalType: "uint96",
                name: "max",
                type: "uint96",
              },
            ],
            internalType:
              "struct ILoanPriceOracleParameters.PiecewiseLinearModel",
            name: "loanToValueRateComponent",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint72",
                name: "offset",
                type: "uint72",
              },
              {
                internalType: "uint72",
                name: "slope1",
                type: "uint72",
              },
              {
                internalType: "uint72",
                name: "slope2",
                type: "uint72",
              },
              {
                internalType: "uint96",
                name: "target",
                type: "uint96",
              },
              {
                internalType: "uint96",
                name: "max",
                type: "uint96",
              },
            ],
            internalType:
              "struct ILoanPriceOracleParameters.PiecewiseLinearModel",
            name: "durationRateComponent",
            type: "tuple",
          },
          {
            internalType: "uint16[3]",
            name: "rateComponentWeights",
            type: "uint16[3]",
          },
        ],
        internalType: "struct ILoanPriceOracleParameters.CollateralParameters",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumLoanDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "collateralTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "principal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repayment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "utilization",
        type: "uint256",
      },
    ],
    name: "priceLoan",
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
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "collateralTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "principal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "utilization",
        type: "uint256",
      },
    ],
    name: "priceLoanRepayment",
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
        internalType: "enum MockLoanPriceOracle.MockError",
        name: "error",
        type: "uint8",
      },
    ],
    name: "setError",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "repayment",
        type: "uint256",
      },
    ],
    name: "setRepayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60803461007457601f61059638819003918201601f19168301916001600160401b038311848410176100795780849260209460405283398101031261007457516001600160a01b0381169081900361007457600080546001600160a01b03191691909117905560405161050690816100908239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe6080604081815260048036101561001557600080fd5b600092833560e01c908163034ac28f146103af5781632b56cc331461039557816363eac183146102f8575080636b2fa374146102d057806391b7f5ed146102b75780639f24f55a14610299578063a217d5ce1461027e578063d3e4d5fd14610255578063d4e04df1146102245763e8b966621461009157600080fd5b346102205760208060031936011261021c576100ab6103e7565b506100b461044f565b918483526100c06104a5565b828401526100cc6104a5565b83850152835160609367ffffffffffffffff9190858201838111838210176102095787528590813684370152610100610485565b94868652868487015286818701526706f05b59d3b2000085870152670853a0d2313c00006080870152610131610485565b91878352878584015287828401526936e342998b8b02000000868401526980124610f0445a000000608084015281519386850191858310908311176101f65750816101bd916101c894939996995261c35085526161a8808a8701528186015261019861044f565b60018082528a8201998a52828201948552970194855251868152965187890190610402565b5160c0860190610402565b51909361016084015b600386106101df576101c085f35b825161ffff168152948301949181019181016101d1565b634e487b7160e01b895260419052602488fd5b634e487b7160e01b895260418552602489fd5b8380fd5b8280fd5b5050346102515780600319360112610251576020906102416103e7565b5051680246ddf979766800008152f35b5080fd5b5050346102515760e0366003190112610251576020906102736103e7565b506001549051908152f35b50503461025157816003193601126102515760209051308152f35b50503461025157816003193601126102515760209051620151808152f35b5034610220576020366003190112610220573560015551f35b505034610251578160031936011261025157905490516001600160a01b039091168152602090f35b91939050346103925760a0366003190112610392576103156103e7565b5060ff815460a01c168481101561037f576001810361033e575050505163621a135560e01b8152fd5b6002810361035657505050516304a8207d60e11b8152fd5b600385911461036c576020846002549051908152f35b6388b9529f60e01b835282015260249150fd5b634e487b7160e01b825260218552602482fd5b80fd5b925050346102205760203660031901126102205735600255f35b925050346102205760203660031901126102205780359081101561022057825460ff60a01b191660a09190911b60ff60a01b16178255f35b600435906001600160a01b03821682036103fd57565b600080fd5b60809068ffffffffffffffffff8082511684528060208301511660208501526040820151166040840152816bffffffffffffffffffffffff91826060820151166060860152015116910152565b604051906080820182811067ffffffffffffffff82111761046f57604052565b634e487b7160e01b600052604160045260246000fd5b6040519060a0820182811067ffffffffffffffff82111761046f57604052565b6104ad610485565b90600082526000602083015260006040830152600060608301526000608083015256fea2646970667358221220b28d60160d1acbb1bf582e8b5a5520eca249506c5779eab86d3e73df19898dc864736f6c634300080f0033";

type MockLoanPriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockLoanPriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockLoanPriceOracle__factory extends ContractFactory {
  constructor(...args: MockLoanPriceOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    currencyToken_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockLoanPriceOracle> {
    return super.deploy(
      currencyToken_,
      overrides || {}
    ) as Promise<MockLoanPriceOracle>;
  }
  override getDeployTransaction(
    currencyToken_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(currencyToken_, overrides || {});
  }
  override attach(address: string): MockLoanPriceOracle {
    return super.attach(address) as MockLoanPriceOracle;
  }
  override connect(signer: Signer): MockLoanPriceOracle__factory {
    return super.connect(signer) as MockLoanPriceOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockLoanPriceOracleInterface {
    return new utils.Interface(_abi) as MockLoanPriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockLoanPriceOracle {
    return new Contract(address, _abi, signerOrProvider) as MockLoanPriceOracle;
  }
}
