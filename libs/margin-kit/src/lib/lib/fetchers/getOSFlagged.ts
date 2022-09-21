import { BWLToken } from "meta-street/types";

export type BaseToken = Pick<BWLToken, "collectionAddress" | "tokenID">;

export type GetOSFlaggedResult<T extends BaseToken = BaseToken> = {
  unflagged: T[];
  flagged: T[];
};

type OpenSeaAsset = {
  token_id: string;
  supports_wyvern: boolean;
};

const getOSFlagged = async <T extends BaseToken>(tokens: T[]): Promise<GetOSFlaggedResult<T>> => {
  const urlParams = new URLSearchParams();
  tokens.forEach((token) => urlParams.append("token_ids", token.tokenID));
  urlParams.append("asset_contract_address", tokens[0].collectionAddress);
  const url = `https://api.opensea.io/api/v1/assets?${urlParams}`;

  const response = await fetch(url);
  const data: { assets: OpenSeaAsset[] } = await response.json();
  if (!response.ok) throw data;

  const result: GetOSFlaggedResult<T> = {
    flagged: [],
    unflagged: [],
  };
  tokens.forEach((token) => {
    const asset = data.assets.find((a) => a.token_id == token.tokenID);
    if (asset?.supports_wyvern) result.unflagged.push(token);
    else result.flagged.push(token);
  });
  return result;
};

export default getOSFlagged;
