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
  "0x5f6f132c": "LeverageBuyWrapperV1: InvalidArguments()",
};

const ethersErrors: { [code: number]: string } = {
  4001: "You canceled the transaction",
};

export const getReadableError = (e: any) => {
  let error: string;
  let code: string | number | undefined;

  if (typeof e.data == "string") code = e.data?.slice(0, 10);
  if (!code) code = e.error?.data?.originalError?.data?.slice(0, 10);
  if (!code) code = e.transaction?.data?.slice(0, 10);
  if (!code) code = e.code;

  // if code is string
  if (typeof code == "string") error = contractErrors[code] ?? code;
  // if code is number
  else if (code) error = ethersErrors[code];
  // if code is still undefined
  else error = (e as Error).message ?? "Something wrong happened";
  console.log({ e, code, error });
  return error;
};
