/* eslint-disable @typescript-eslint/no-explicit-any */
const contractErrors: { [sighash: string]: string } = {
  "0x91e5cb7e": "LeverageBuyWrapperV1: FillFailed()",
  "0x4b634dd9": "LeverageBuyWrapperV1: FlashLoanUnavailable()",
  "0xe6c4247b": "PurchaseEscrowPlatformV1/LoanPriceOracle: InvalidAddress()",
  "0x76166401": "PurchaseEscrowPlatformV1: InvalidDuration()",
  "0x30c2e369": "LeverageBuyWrapperV1: InvalidFillCalldata()",
  "0xfdf0a53c": "LeverageBuyWrapperV1: InvalidPurchasePrice()",
  "0x5b3d0edd": "PurchaseEscrowPlatformV1: EscrowNotExpired()",
  "0x48f5c3ed": "PurchaseEscrowPlatformV1: InvalidCaller()",
  "0x3c6b4b28": "PurchaseEscrowPlatformV1: InvalidPayment()",
  "0x59a1dea4": "PurchaseEscrowPlatformV1: InvalidRepayment()",
  "0xf525e320": "PurchaseEscrowPlatformV1: InvalidStatus()",
  "0x3204506f": "Vault: CallFailed()",
  "0xa87b5fc5": "Vault: InsolventTranche(uint8)",
  "0x23026768": "Vault: InsufficientCashAvailable()",
  "0xd2693ab0": "Vault: InterestRateTooLow()",
  "0x8e0f1450": "Vault: InvalidLoanStatus()",
  "0x984252a4": "Vault: LoanNotExpired()",
  "0x00b7b97e": "Vault: LoanNotRepaid()",
  "0x3492ffd9": "LoanPriceOracle: PRBMathUD60x18__FromUintOverflow(uint256)",
  "0xd31b3402": "LoanPriceOracle: PRBMath__MulDivFixedPointOverflow(uint256)",
  "0x773cc18c": "LoanPriceOracle: PRBMath__MulDivOverflow(uint256,uint256)",
  "0x11688601": "Vault: ParameterOutOfBounds()",
  "0x591445fd": "Vault: PurchasePriceTooHigh()",
  "0xa7e5f4f5": "Vault: PurchasePriceTooLow()",
  "0xaec6813d": "Vault: UnsupportedNoteParameters()",
  "0xf55484e3": "Vault: UnsupportedNoteToken()",
  "0x455de915": "LoanPriceOracle: UnsupportedTokenDecimals()",
  "0x095040fa": "LoanPriceOracle: InsufficientTimeRemaining()",
  "0x88b9529f": "LoanPriceOracle: ParameterOutOfBounds(uint256)",
  "0x621a1355": "LoanPriceOracle: UnsupportedCollateral()",
  "0x545c1c78": "LeverageBuyWrapperV1: InvalidDownpayment()",
  "0x04691ec2": "LeverageBuyWrapperV1: InvalidPurchaseEscrow()",
  "0xc4e94f29": "LeverageBuyWrapperV1: RepaymentTooHigh()",
};

const ethersErrors: { [code: number]: string } = {
  4001: "You canceled the transaction",
};

export interface ReadableError {
  message: string;
  originalError: any;
}

export const getReadableError = (e: any): ReadableError => {
  let message: string;
  let code: string | number;

  // try to get the error code
  if (typeof e.data == "string") code = e.data?.slice(0, 10);
  else code = e.code;
  if (!code) code = e.error?.data?.originalError?.data?.slice(0, 10);
  if (!code) code = e.transaction?.data?.slice(0, 10);

  // if code is string, it should be a sighash
  if (typeof code == "string") message = contractErrors[code] ?? code;
  // if not a string, and is defined, it should be a number (ethers error)
  else if (code) message = ethersErrors[code];
  // if code is undefined, fallback to the error's message, defaulting to "Something went wrong"
  else message = e.message ?? "Something wrong happened";

  return {
    message,
    originalError: e,
  };
};

export const withReadableError = <P, R>(fun: (params: P) => Promise<R>) => {
  return async (params: P) => {
    try {
      const result = await fun(params);
      return result;
    } catch (e) {
      throw getReadableError(e);
    }
  };
};
