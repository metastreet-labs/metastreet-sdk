import { ReadableError } from "@metastreet-labs/margin-core";
import { useSigner } from "wagmi";
import useIsCollectionSupported from "../lib/hooks/useIsCollectionSupported";
import { BWLToken } from "../types";
import useMetaStreetDeployment from "./useMetaStreetDeployment";

interface UseBuyWithLeverageButtonProps {
  tokens: BWLToken[];
}

enum UseBuyWithLeverageButtonError {
  UnconnectedWallet = "Wallet not connected",
  UnsupportedChain = "Chain not supported",
  EmptyTokensArray = "No tokens selected",
  MultipleCollections = "Tokens are from different collections",
  UnsupportedCollection = "Collection not supported",
  Other = "Something wrong happened",
}

type UseBuyWithLeverageButtonResult =
  | {
      status: "error";
      error: UseBuyWithLeverageButtonError;
      errorObject?: ReadableError;
    }
  | { status: "loading" | "success" };

const useBuyWithLeverageButton = (props: UseBuyWithLeverageButtonProps): UseBuyWithLeverageButtonResult => {
  const { tokens } = props;
  const collectionAddress = tokens[0]?.collectionAddress ?? "";
  const isSingleCollection = tokens.every((token) => token.collectionAddress == collectionAddress);

  const { data: signer } = useSigner();
  const { deployment } = useMetaStreetDeployment();
  const { isCollectionSupported, isCollectionSupportedError } = useIsCollectionSupported(collectionAddress);

  let error: UseBuyWithLeverageButtonError | undefined;
  let errorObject: ReadableError | undefined;
  if (!signer) error = UseBuyWithLeverageButtonError.UnconnectedWallet;
  else if (!deployment) error = UseBuyWithLeverageButtonError.UnsupportedChain;
  else if (!tokens.length) error = UseBuyWithLeverageButtonError.EmptyTokensArray;
  else if (!isSingleCollection) error = UseBuyWithLeverageButtonError.MultipleCollections;
  else if (isCollectionSupported == false) error = UseBuyWithLeverageButtonError.UnsupportedCollection;
  else if (isCollectionSupportedError) {
    error = UseBuyWithLeverageButtonError.Other;
    errorObject = isCollectionSupportedError;
  }

  if (error) return { status: "error", error, errorObject };
  if (isCollectionSupported == undefined) return { status: "loading" };
  return { status: "success" };
};

export default useBuyWithLeverageButton;
