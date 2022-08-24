export enum WalletName {
  MetaMask = "MetaMask",
}

export interface WalletMetadata {
  name: string;
  iconURL: string;
  description: string;
  color: string;
  primary?: boolean;
  href?: string;
  mobile?: boolean;
  mobileOnly?: boolean;
}

const WALLETS: Record<WalletName, WalletMetadata> = {
  [WalletName.MetaMask]: {
    name: "MetaMask",
    iconURL: "/metamask.png",
    description: "Easy-to-use browser extension.",
    color: "#E8831D",
  },
};

export default WALLETS;
