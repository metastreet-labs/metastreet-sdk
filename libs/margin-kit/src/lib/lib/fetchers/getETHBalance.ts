import { Provider } from "@ethersproject/providers";
import Decimal from "decimal.js";

const getETHBalance = async (provider: Provider, address: string) => {
  const balance = await provider.getBalance(address);
  return new Decimal(balance.toString());
};

export default getETHBalance;
