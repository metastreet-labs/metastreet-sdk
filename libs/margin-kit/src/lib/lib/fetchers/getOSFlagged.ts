import { BWLToken } from "../../types";

export type BaseToken = Pick<BWLToken, "collectionAddress" | "tokenID">;

export interface GetOSFlaggedResult<T extends BaseToken = BaseToken> {
  unflagged: T[];
  flagged: T[];
}

interface OpenSeaAsset {
  token_id: string;
  supports_wyvern: boolean;
}

const LIMIT = 20;

const getOSFlagged = async <T extends BaseToken>(tokens: T[]): Promise<GetOSFlaggedResult<T>> => {
  // chunk the tokens into groups of 30 - OS API has a limit of 30 tokens per request
  const tokensChunks = [];
  for (let i = 0; i < tokens.length; i += LIMIT) {
    const chunk = tokens.slice(i, i + LIMIT);
    tokensChunks.push(chunk);
  }

  const flaggedTokenResults = await Promise.all(
    tokensChunks.map(async (tokensChunk) => {
      const urlParams = new URLSearchParams();
      tokensChunk.forEach((token) => urlParams.append("token_ids", token.tokenID));
      urlParams.append("asset_contract_address", tokensChunk[0].collectionAddress);
      const url = `https://api.opensea.io/api/v1/assets?${urlParams}`;

      const response = await fetch(url);
      const data: { assets: OpenSeaAsset[] } = await response.json();
      if (!response.ok) throw data;
      return data.assets;
    })
  );

  const flaggedTokens = flaggedTokenResults.flat();

  const result: GetOSFlaggedResult<T> = {
    flagged: [],
    unflagged: [],
  };

  tokens.forEach((token) => {
    const asset = flaggedTokens.find((a) => a.token_id == token.tokenID);
    if (asset?.supports_wyvern) result.unflagged.push(token);
    else result.flagged.push(token);
  });

  return result;
};

export default getOSFlagged;
