/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { LeverageBuyWrapperV1, LeverageBuyWrapperV1Interface } from "../LeverageBuyWrapperV1";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IWETH",
        name: "weth_",
        type: "address",
      },
      {
        internalType: "contract IERC3156FlashLender",
        name: "flashLender_",
        type: "address",
      },
      {
        internalType: "contract IReservoirRouter",
        name: "reservoirRouter_",
        type: "address",
      },
      {
        internalType: "contract IPurchaseEscrow",
        name: "purchaseEscrow_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FillFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "FlashLoanUnavailable",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDownpayment",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDuration",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidFillCalldata",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPurchaseEscrow",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPurchasePrice",
    type: "error",
  },
  {
    inputs: [],
    name: "RepaymentTooHigh",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "flashLender",
        type: "address",
      },
    ],
    name: "FlashLenderUpdated",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "purchaseEscrow",
        type: "address",
      },
    ],
    name: "PurchaseEscrowUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "purchasePrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "downpayment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "Purchased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "downpayment",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "oldEscrowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "newEscrowId",
        type: "uint256",
      },
    ],
    name: "Refinanced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "reservoirRouter",
        type: "address",
      },
    ],
    name: "ReservoirRouterUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "IMPLEMENTATION_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "purchasePrice",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "fillCalldata",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "maxRepayment",
        type: "uint256",
      },
    ],
    name: "buySingleERC721WithETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "currencyToken",
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
    name: "flashLender",
    outputs: [
      {
        internalType: "contract IERC3156FlashLender",
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
        name: "vault",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getCollateralLimits",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "minDuration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxDuration",
            type: "uint32",
          },
          {
            internalType: "uint96",
            name: "maxLoanToValue",
            type: "uint96",
          },
          {
            internalType: "uint256",
            name: "collateralValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPrincipal",
            type: "uint256",
          },
        ],
        internalType: "struct ILeverageBuy.CollateralLimits",
        name: "",
        type: "tuple",
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
        internalType: "address",
        name: "initiator",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onFlashLoan",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "purchaseEscrow",
    outputs: [
      {
        internalType: "contract IPurchaseEscrow",
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
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "downpayment",
        type: "int256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
    ],
    name: "quoteRefinance",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
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
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "purchasePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "downpayment",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
    ],
    name: "quoteSingleERC721",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
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
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
      {
        internalType: "int256",
        name: "downpayment",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "maxRepayment",
        type: "uint256",
      },
    ],
    name: "refinanceETH",
    outputs: [],
    stateMutability: "payable",
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
    inputs: [],
    name: "reservoirRouter",
    outputs: [
      {
        internalType: "contract IReservoirRouter",
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
        name: "flashLender_",
        type: "address",
      },
    ],
    name: "setFlashLender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "purchaseEscrow_",
        type: "address",
      },
    ],
    name: "setPurchaseEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "reservoirRouter_",
        type: "address",
      },
    ],
    name: "setReservoirRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "weth",
    outputs: [
      {
        internalType: "contract IWETH",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a0604081815234620002fa5760808262002a9d8038038091620000248285620002ff565b833981010312620002fa5781516001600160a01b038082169391848103620002fa576020928381015192808416809403620002fa578582015191818316809303620002fa576060015193818516809503620002fa57600080546001600160a01b03198082163390811784558a51939b91979193919286167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08d84a3600180558215620002eb57508215620002da578415620002da578615620002da578991889160805284600254168062000280575b50505050808460025416176002558786836080511660448a518094819363095ea7b360e01b835287600484015260001960248401525af1801562000276578899620001d7947fc50831207054555aca9cfdb512c31d4e4f4d526c2334613871c837786becd7f48a8a9998967f4e8841b0c912ec1f30e61c9bb98f50d4936a75341ad9c308051e5162ec2bd9d79d7fe2bff9d21f6b2a4a5db5fd6589adaba3e22d355a99cc62ecb392fe98e7cc7fc097839762000242575b5051908152a1339154161492620001c18462000339565b808660035416176003558a51908152a162000339565b60045416176004558351908152a1516126fd9081620003a082396080518181816101c70152818161031e015281816107420152818161092e01528181610b4301528181610c1401528181610dac01528181611699015281816118f901528181611b8901526121350152f35b6200026690843d86116200026e575b6200025d8183620002ff565b81019062000385565b5038620001aa565b503d62000251565b88513d8b823e3d90fd5b6044908b51948593849263095ea7b360e01b845260048401528160248401525af180156200027657620002b8575b86818a92620000f3565b620002d290873d89116200026e576200025d8183620002ff565b5038620002ae565b885163e6c4247b60e01b8152600490fd5b63e6c4247b60e01b8152600490fd5b600080fd5b601f909101601f19168101906001600160401b038211908210176200032357604052565b634e487b7160e01b600052604160045260246000fd5b156200034157565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b90816020910312620002fa57518015158103620002fa579056fe60a080604052600436101561001d575b50361561001b57600080fd5b005b60003560e01c90816301ffc9a7146112a05750806303f4cc1d14610ef5578063150b7a0214610ea057806319fee6e014610e7757806323e30c8b14610e1a57806327cf987c14610ddb5780633fc8cef314610d965780636b2fa37414610d96578063715018a614610d33578063754b377c14610cdd578063777239f014610c7d5780638b188d9d14610ac95780638da5cb5b14610aa0578063a771445814610a77578063b1a7a84114610a03578063c026f068146106a3578063daf7cd911461067a578063dc7f097814610606578063f2fde38b1461053a5763fe9d78d114610106573861000f565b60a03660031901126103965761011a61131e565b6001600160401b0360443516604435036103965761013d600260015414156115d3565b60026001556001600160a01b03811615610528576001600160401b03604435161561051657602460e060018060a01b03600454166040519283809263f8f830c9851b825260043560048301525afa9081156103a257600091610469575b5080516004811015610453576001036104415760025460405163613255ab60e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116600483015290911690602081602481855afa9081156103a25760009161040f575b506080830151116103fd5760006064351380806103f1575b6103d65715806103e8575b6103d65761025a60808301518460018060a01b036020860151169160443592604087015191606435906118de565b915060843582116103c457608084015194604060018060a01b03602087015116950151906040519563fe9d78d160e01b6020880152336040880152606087015260018060a01b031660808601526001600160401b036044351660a086015260043560c086015260e0850152606435610100850152610120840152610140908184015282526101608201928284106001600160401b038511176103ae576040849052632e7ff4ef60e11b84526020918491829060009061015f199087906103519082907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316306101648401611633565b0301925af180156103a257610367575b60018055005b602090813d831161039b575b61037d818561138e565b810103126103965761038e90611523565b503880610361565b600080fd5b503d610373565b6040513d6000823e3d90fd5b634e487b7160e01b600052604160045260246000fd5b60405163c4e94f2960e01b8152600490fd5b604051630a8b838f60e31b8152600490fd5b5034151561022c565b50346064351415610221565b604051634b634dd960e01b8152600490fd5b90506020813d602011610439575b8161042a6020938361138e565b81010312610396575138610209565b3d915061041d565b6040516302348f6160e11b8152600490fd5b634e487b7160e01b600052602160045260246000fd5b905060e0813d60e01161050e575b8161048460e0938361138e565b81010312610396576040519060e082018281106001600160401b038211176103ae5760405280516004811015610396576105039160c09184526104c9602082016118a5565b60208501526040810151604085015260608101516060850152608081015160808501526104f860a082016118b9565b60a0850152016118b9565b60c08201523861019a565b3d9150610477565b604051637616640160e01b8152600490fd5b60405163e6c4247b60e01b8152600490fd5b3461039657602036600319011261039657610553611308565b600054906001600160a01b038083169161056e3384146114b9565b1680156105b257806000936001600160601b0360a01b16178355604051917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08484a3f35b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b34610396576020366003190112610396577f4e8841b0c912ec1f30e61c9bb98f50d4936a75341ad9c308051e5162ec2bd9d76020610642611308565b6000546001600160a01b03919061065c90831633146114b9565b16806001600160601b0360a01b6004541617600455604051908152a1005b34610396576000366003190112610396576004546040516001600160a01b039091168152602090f35b60a0366003190112610396576024356001600160401b038111610396576106ce903690600401611411565b906106d7611334565b906001600160401b036064351660643503610396576106fb600260015414156115d3565b6002600155600435156109f1576001600160a01b03821615610528576001600160401b0360643516156105165760025460405163613255ab60e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116600483015290911690602081602481855afa9081156103a2576000916109bf575b50600435116103fd578360041161039657637c9d451960e11b82356001600160e01b031916016109ad578184016101008382036003190112610396576004830135906001600160401b0382116103965760046107e2928501016113ca565b50600660248301351015610396576107fc6044830161161f565b6108086084840161161f565b61081460a4850161161f565b5061082160c4850161161f565b5060e484013561ffff81160361039657306001600160a01b03909116036109ad57610862606480359086908601356001600160a01b0385163460043561167e565b9591509360843586116103c457600096602096610960966109129460405196631804de0d60e31b8b89015233604089015260018060a01b0316606088015260018060a01b031660808701526001600160401b036064351660a0870152606484013560c08701523460e0870152610100860152610120850152610140808501528361016091808383015280610180948584013781810184018a9052601f01601f19168101039081018452018261138e565b604051632e7ff4ef60e11b8152948593849283919060048035907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169030908601611633565b03925af180156103a2576109745760018055005b6020813d6020116109a5575b8161098d6020938361138e565b810103126103965761099e90611523565b5080610361565b3d9150610980565b6040516330c2e36960e01b8152600490fd5b90506020813d6020116109e9575b816109da6020938361138e565b81010312610396575185610784565b3d91506109cd565b604051633f7c294f60e21b8152600490fd5b34610396576020366003190112610396577fe2bff9d21f6b2a4a5db5fd6589adaba3e22d355a99cc62ecb392fe98e7cc7fc06020610a3f611308565b6000546001600160a01b039190610a5990831633146114b9565b16806001600160601b0360a01b6003541617600355604051908152a1005b34610396576000366003190112610396576002546040516001600160a01b039091168152602090f35b34610396576000366003190112610396576000546040516001600160a01b039091168152602090f35b346103965760208060031936011261039657610ae3611308565b9060018060a01b03610afa816000541633146114b9565b806002541680610bf0575b5081816000941691826001600160601b0360a01b600254161760025560446040518096819363095ea7b360e01b8352866004840152811960248401527f0000000000000000000000000000000000000000000000000000000000000000165af180156103a257610b9c575b7fc50831207054555aca9cfdb512c31d4e4f4d526c2334613871c837786becd7f49250604051908152a1005b8183813d8311610be9575b610bb1818361138e565b8101031261039657610be37fc50831207054555aca9cfdb512c31d4e4f4d526c2334613871c837786becd7f493611523565b50610b70565b503d610ba7565b6040519063095ea7b360e01b825260048201526000602482015282816044816000867f0000000000000000000000000000000000000000000000000000000000000000165af180156103a25715610b0557928284813d8311610c76575b610c57818361138e565b8101031261039657818391610c6d600096611523565b50945050610b05565b503d610c4d565b346103965760c036600319011261039657610cd9610cbc610c9c611334565b610ca461134a565b610cac61143e565b91606435906024356004356118de565b604080519384526020840192909252908201529081906060820190565b0390f35b346103965760003660031901126103965760405160408101908082106001600160401b038311176103ae57610cd99160405260038152620312e360ec1b6020820152604051918291602083526020830190611468565b3461039657600036600319011261039657600080546001600160a01b03811690610d5e3383146114b9565b6001600160a01b03191682556040519082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08284a3f35b34610396576000366003190112610396576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346103965760c036600319011261039657610cd9610cbc610dfa611334565b610e0261134a565b610e0a61143e565b916064359060243560043561167e565b346103965760a036600319011261039657610e33611308565b610e3b61131e565b506084356001600160401b03811161039657602091610e61610e6f923690600401611411565b916064359060443590611acc565b604051908152f35b34610396576000366003190112610396576003546040516001600160a01b039091168152602090f35b3461039657608036600319011261039657610eb9611308565b50610ec261131e565b506064356001600160401b03811161039657610ee29036906004016113ca565b50604051630a85bd0160e11b8152602090f35b346103965760608060031936011261039657610f0f611308565b90610f1861131e565b91604051610f2581611360565b60008152602092600084830152600060408301526000818301526000608080930152604051633f0e05ab60e11b8152848160048160018060a01b038098165afa80156103a2578491600091611273575b50169360405163510beae760e11b81528181600481895afa9081156103a25760009161123d575b5060405163745cb33160e11b81528588166004820152966101c080896024818b5afa9889156103a25760009961114b575b505060405163d4e04df160e01b81526001600160a01b03909116600482015260448035602483015290958392879290918391829081015b0392165afa9384156103a25760009461111a575b5080600493949560405194858092634f927aad60e11b82525afa9283156103a2576000936110eb575b508363ffffffff80941695670de0b6b3a7640000926040838288878d6001600160601b039889968792015101511604169b01510151169586600019048311871515166110d55760a0996040519561109787611360565b8a875283870191825260408701948986528a89890198828a52019902048852604051998a525116908801525116604086015251908401525190820152f35b634e487b7160e01b600052601160045260246000fd5b9080935081813d8311611113575b611103818361138e565b8101031261039657519186611041565b503d6110f9565b9293508083813d8311611144575b611132818361138e565b81010312610396579151929180611018565b503d611128565b90809299503d8311611236575b611162818361138e565b8101828282031261039657604051926001600160401b0392888501848111868210176103ae5760405261119481611523565b85526111a28388830161155a565b878601526111b38360c0830161155a565b60408601528261017f820112156103965760405193888501908111858210176103ae5760405283918101928311610396579061016087959396949201905b86821061120d5750508187015298909250905081611004610fcd565b90809294969395505161ffff8116810361039657818892918392520191018694929593916111f1565b503d611158565b90508181813d831161126c575b611254818361138e565b81010312610396575184811681036103965787610f9c565b503d61124a565b6112939150863d8811611299575b61128b818361138e565b810190611504565b87610f75565b503d611281565b34610396576020366003190112610396576004359063ffffffff60e01b821680920361039657602091630a85bd0160e11b81149081156112e2575b5015158152f35b6301ffc9a760e01b149050836112db565b35906001600160e01b03198216820361039657565b600435906001600160a01b038216820361039657565b602435906001600160a01b038216820361039657565b604435906001600160a01b038216820361039657565b608435906001600160a01b038216820361039657565b60a081019081106001600160401b038211176103ae57604052565b6001600160401b0381116103ae57604052565b90601f801991011681019081106001600160401b038211176103ae57604052565b6001600160401b0381116103ae57601f01601f191660200190565b81601f82011215610396578035906113e1826113af565b926113ef604051948561138e565b8284526020838301011161039657816000926020809301838601378301015290565b9181601f84011215610396578235916001600160401b038311610396576020838186019501011161039657565b60a435906001600160401b038216820361039657565b35906001600160401b038216820361039657565b91908251928382526000905b8482106114a1575092806020939411611494575b601f01601f1916010190565b6000838284010152611488565b90602090818082850101519082860101520190611474565b156114c057565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b9081602091031261039657516001600160a01b03811681036103965790565b5190811515820361039657565b519068ffffffffffffffffff8216820361039657565b51906001600160601b038216820361039657565b91908260a09103126103965760405160a081018181106001600160401b038211176103ae5760405260806115ce81839561159381611530565b85526115a160208201611530565b60208601526115b260408201611530565b60408601526115c360608201611546565b606086015201611546565b910152565b156115da57565b60405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606490fd5b35906001600160a01b038216820361039657565b6001600160a01b03918216815291166020820152604081019190915260806060820181905261166492910190611468565b90565b8181106110d5570390565b811981116110d5570190565b60025460408051633676633960e21b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116600483015260248201859052939997989691956020959094929390919086908290604490829087165afa90811561184457908391600091611873575b5061170661170b9293829d611667565b611672565b981692855193633f0e05ab60e11b85528585600481845afa9485156118445790869160009661184f575b508751637510e6c960e11b81529190829060049082905afa9081156118445791869593918b9593600091611807575b5088516363eac18360e01b81526001600160a01b039092166004830152602482019390935260448101949094526001600160401b0390971660648401526084830152909485919082908160a481015b0392165afa9182156117fd57506000916117ce575b50905090565b82813d83116117f6575b6117e2818361138e565b810103126117f357505180386117c8565b80fd5b503d6117d8565b513d6000823e3d90fd5b878194969892939597503d831161183d575b611823818361138e565b810103126117f35750918993916117b38796945190611764565b503d611819565b87513d6000823e3d90fd5b8291965061186b906004933d84116112995761128b818361138e565b959091611735565b91508682813d831161189e575b61188a818361138e565b810103126117f357505182906117066116f6565b503d611880565b51906001600160a01b038216820361039657565b51906001600160401b038216820361039657565b600160ff1b81146110d55760000390565b60025460408051633676633960e21b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811660048301526024820185905295999398939693959194602094929390919085908290604490829088165afa908115611ac157600091611a93575b509081600493929a60008313600014611a77576119749261170691611667565b925b808499169a858c885195868092633f0e05ab60e11b82525afa9384156118445760049c8791600096611a58575b508851637510e6c960e11b81529d8e9182905afa801561184457869798999a9b9c600091611a1e575088516363eac18360e01b81526001600160a01b039092166004830152602482019390935260448101949094526001600160401b0390971660648401526084830152909485919082908160a481016117b3565b91929394959682813d8311611a51575b611a38818361138e565b810103126117f3575051869594939291906117b3611764565b503d611a2e565b611a70919650823d84116112995761128b818361138e565b94386119a3565b61170690611a87611a8d946118cd565b90611672565b92611976565b908582813d8311611aba575b611aa9818361138e565b810103126117f35750516004611954565b503d611a9f565b86513d6000823e3d90fd5b600254929491939260009291906001600160a01b0316330361052857306001600160a01b03909116036105285780600411611ed25782356001600160e01b031916631804de0d60e31b810361201e575082019361014083860312611ed257611b33836112f3565b50611b406020840161161f565b91611b4d6040850161161f565b93611b5a6060820161161f565b611b6660808301611454565b976101208301356001600160401b038111611f5f5790611b879184016113ca565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169690873b15611f5f57604051632e1a7d4d60e01b8152600481018a90528581602481838d5af1801561201357908691611fff575b50809160018060a01b03600354168b602083519301915af13d15611ffa573d611c0d816113af565b90611c1b604051928361138e565b81528560203d92013e5b15611fe8576004546001600160a01b039081169082163b15611f5f5760405163095ea7b360e01b81526001600160a01b03909116600482015260a08401356024820152848180604481010381836001600160a01b0387165af18015611f545787918691611fd1575b5060048054604051631ada561f60e11b81526001600160a01b0394851692810192909252938316602482015260a0860135604482015260e0860135606482015261010086013560848201526001600160401b039b909b1660a48c01526020928b9260c49284929091165af1978815611eea578398611f9d575b506004805460405163191914a160e11b80825293929091602091839182906001600160a01b03165afa908115611f54578591611f63575b506001600160a01b031690813b15611f5f5760405163095ea7b360e01b81526001600160a01b039190911660048201819052602482018b90529185908290604490829084905af18015611f5457908591611f40575b505060048054604051938452602091849182906001600160a01b03165afa918215611f35578492611ef9575b50803b15611ef5576040516361f6d44960e01b81526001600160a01b039290921660048301526024820189905260e0830135604483015283908290606490829084905af18015611eea57908391611ed6575b505060c001359384611e89575b5050604080519485526020850193909352918301919091526001600160a01b0316907f5f5252e81556cf80e49da97ac40f17af2fb3b00e318b675ae93089f555bfa38090606090a37f439148f0bbc682ca079e46d6e2c2f0c1e3b820f1a291b069d8882abf8cf18dd990565b803b15611ed257818591600460405180948193630d0e30db60e41b83525af18015611ec75715611e1d57611ebd829161137b565b6117f35780611e1d565b6040513d84823e3d90fd5b5080fd5b611edf9061137b565b611ed2578138611e10565b6040513d85823e3d90fd5b8380fd5b9091506020813d602011611f2d575b81611f156020938361138e565b81010312611ef557611f26906118a5565b9038611dbe565b3d9150611f08565b6040513d86823e3d90fd5b611f499061137b565b611ef5578338611d92565b6040513d87823e3d90fd5b8480fd5b90506020813d602011611f95575b81611f7e6020938361138e565b81010312611f5f57611f8f906118a5565b38611d3d565b3d9150611f71565b9097506020813d602011611fc9575b81611fb96020938361138e565b8101031261039657519638611d06565b3d9150611fac565b611fdc91925061137b565b611ef557858438611c8d565b6040516348f2e5bf60e11b8152600490fd5b611c25565b6120089061137b565b611f5f578438611be5565b6040513d88823e3d90fd5b93949391929163fe9d78d160e01b036126bf57816101409181010312611ed257612047816112f3565b5060209061205682820161161f565b9360409261206584840161161f565b6120716060850161161f565b9761207e60808601611454565b600480548851632236e5dd60e01b815292949291869183919082906001600160a01b03165afa90811561267c57899161268a575b506001600160a01b0316803b15612686578751632142170760e11b81526001600160a01b038b16600482015230602482015260a088013560448201529089908290606490829084905af1801561267c57612665575b5060048054885163095ea7b360e01b8082526001600160a01b039283169382019390935260248101949094527f0000000000000000000000000000000000000000000000000000000000000000169893929091908581604481888e5af1801561257857612631575b506004546001600160a01b0316803b15611f5f578460a060248a838d519586948593631b8fec7360e11b8552013560048401525af180156125785790859161261d575b50506004546001600160a01b039081169082163b15611f5f5788518381526001600160a01b03909116600482015260c08801356024820152848180604481010381836001600160a01b0387165af18015612578578692918691612604575b5050600480548a516080818152631ada561f60e11b90915280516001600160a01b038f811694820194909452938316602485015260c08b013560448501526101008b0135606485018190526101208c013560848601526001600160401b039790971660a48501525160c49290918891165af1998a156125fa57839a6125c5575b60048054895163191914a160e11b808252949290918891839182906001600160a01b03165afa9081156125bb578691612586575b506001600160a01b031690813b156125825789519081526001600160a01b039290921660048301819052602483018d905292919085908290604490829084905af1801561257857908591612564575b50506004805489519283528691839182906001600160a01b03165afa90811561255a578491612525575b50813b15611ef55787516361f6d44960e01b81526001600160a01b03919091166004820152602481018b9052604481019290925282908290606490829084905af1801561243d57908291612511575b505060e0840135958187131561244757803b15611ed2578187916004885180948193630d0e30db60e41b83525af1801561243d57612429575b50509160a0917f5ef1150a4bd562d1f4e088bf7577876a327cb46812e81346022f8f608065726894935b84519687528601520135936001600160a01b031692a47f439148f0bbc682ca079e46d6e2c2f0c1e3b820f1a291b069d8882abf8cf18dd990565b612433829161137b565b6117f357806123c5565b86513d84823e3d90fd5b81871261247d575b50509160a0917f5ef1150a4bd562d1f4e088bf7577876a327cb46812e81346022f8f608065726894936123ef565b612486876118cd565b813b1561250d5782916024839289519485938492632e1a7d4d60e01b845260048401525af1801561243d579082916124f9575b508080806124c68a6118cd565b8181156124f0575b6001600160a01b038d1690f1156124e5578061244f565b8451903d90823e3d90fd5b506108fc6124ce565b6125029061137b565b6117f35780386124b9565b8280fd5b61251a9061137b565b6117f357803861238c565b90508481813d8311612553575b61253c818361138e565b81010312611ef55761254d906118a5565b3861233d565b503d612532565b88513d86823e3d90fd5b61256d9061137b565b611ef5578338612313565b89513d87823e3d90fd5b8580fd5b90508681813d83116125b4575b61259d818361138e565b81010312612582576125ae906118a5565b386122c4565b503d612593565b8a513d88823e3d90fd5b995083803d82116125f3575b6125dd8160805161138e565b6080519081010312610396576080515199612290565b503d6125d1565b87513d85823e3d90fd5b6126109192935061137b565b611ef55784908438612210565b6126269061137b565b611ef55783386121b2565b8581813d831161265e575b612646818361138e565b81010312611f5f5761265790611523565b503861216f565b503d61263c565b61267390989193929861137b565b96909138612107565b88513d8b823e3d90fd5b8880fd5b90508481813d83116126b8575b6126a1818361138e565b81010312612686576126b2906118a5565b386120b2565b503d612697565b50509150509056fea26469706673582212202f2157b7d11aba0f235ccf57ff87f822597fe8c11a467a3d92eec8468f00b91b64736f6c634300080f0033";

type LeverageBuyWrapperV1ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: LeverageBuyWrapperV1ConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class LeverageBuyWrapperV1__factory extends ContractFactory {
  constructor(...args: LeverageBuyWrapperV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    weth_: PromiseOrValue<string>,
    flashLender_: PromiseOrValue<string>,
    reservoirRouter_: PromiseOrValue<string>,
    purchaseEscrow_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LeverageBuyWrapperV1> {
    return super.deploy(
      weth_,
      flashLender_,
      reservoirRouter_,
      purchaseEscrow_,
      overrides || {}
    ) as Promise<LeverageBuyWrapperV1>;
  }
  override getDeployTransaction(
    weth_: PromiseOrValue<string>,
    flashLender_: PromiseOrValue<string>,
    reservoirRouter_: PromiseOrValue<string>,
    purchaseEscrow_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(weth_, flashLender_, reservoirRouter_, purchaseEscrow_, overrides || {});
  }
  override attach(address: string): LeverageBuyWrapperV1 {
    return super.attach(address) as LeverageBuyWrapperV1;
  }
  override connect(signer: Signer): LeverageBuyWrapperV1__factory {
    return super.connect(signer) as LeverageBuyWrapperV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LeverageBuyWrapperV1Interface {
    return new utils.Interface(_abi) as LeverageBuyWrapperV1Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): LeverageBuyWrapperV1 {
    return new Contract(address, _abi, signerOrProvider) as LeverageBuyWrapperV1;
  }
}
