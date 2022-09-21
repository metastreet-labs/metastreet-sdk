export const VAULT_ADDRESS = process.env.NEXT_PUBLIC_VAULT_ADDRESS as string;
export const LEVERAGE_BUY_WRAPPER_ADDRESS = process.env.NEXT_PUBLIC_LEVERAGE_BUY_WRAPPER_ADDRESS as string;
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as string;
export const BASE_PROXY_URL = process.env.NEXT_PUBLIC_PROXY_API_BASE as string;
export const CONFIRMATIONS = CHAIN_ID == "1" ? 12 : 1;
