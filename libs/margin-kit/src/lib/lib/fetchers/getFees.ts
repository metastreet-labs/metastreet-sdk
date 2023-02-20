import { ethers } from "ethers";

export const OS_V1_API_URL_MAINNET = "https://api.opensea.io/api/v1";
export const OS_V1_API_URL_GOERLI = "https://testnets-api.opensea.io/api/v1";

export interface GetFeesParams {
  collectionAddress: string;
  chainID: number;
}

export interface Fees {
  recipient: string;
  bps: number;
}

export interface GetFeesResult {
  royalty: Fees;
  opensea: Fees;
}

const ZERO_FEES: Fees = {
  recipient: ethers.constants.AddressZero,
  bps: 0,
};

const MIN_CREATOR_FEE_BPS = 50;

const getFees = async (params: GetFeesParams): Promise<GetFeesResult> => {
  const url = params.chainID == 1 ? OS_V1_API_URL_MAINNET : OS_V1_API_URL_GOERLI;
  const response = await fetch(`${url}/asset_contract/${params.collectionAddress}`);
  const json = await response.json();
  if (!response.ok) throw json;

  const { seller_fees, opensea_fees } = json.collection.fees;
  const isCreatorFeesEnforced = json.collection.is_creator_fees_enforced;

  let royalty: Fees;
  const royaltyRecipient = Object.keys(seller_fees)[0];
  if (royaltyRecipient) {
    royalty = { recipient: royaltyRecipient, bps: seller_fees[royaltyRecipient] };
    if (!isCreatorFeesEnforced) {
      royalty.bps = MIN_CREATOR_FEE_BPS;
    }
  } else {
    royalty = ZERO_FEES;
  }

  let opensea: Fees;
  const openseaFeeRecipient = Object.keys(opensea_fees)[0];
  if (openseaFeeRecipient) opensea = { recipient: openseaFeeRecipient, bps: opensea_fees[openseaFeeRecipient] };
  else opensea = ZERO_FEES;

  return { royalty, opensea };
};

export default getFees;
