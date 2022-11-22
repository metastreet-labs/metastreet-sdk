import useChainID from "../../../hooks/useChainID";
import { useTokenMetadata } from "../../../lib/hooks/useTokenMetadata";
import MetaStreetButton from "../../MetaStreetButton";
import { RefinanceModalSuccessAnimation } from "../../RefinanceModal/RefinanceModalContent/RefinanceModalSuccess";
import { useListForSale } from "../state/useListForSale";

interface ListForSaleModalSuccessProps {
  onClose: () => void;
}

const ListForSaleModalSuccess = (props: ListForSaleModalSuccessProps) => {
  const { leverageBuy } = useListForSale();
  const { tokenURI, tokenID, collectionAddress } = leverageBuy;
  const { data } = useTokenMetadata(tokenURI);
  const chainID = useChainID();

  const OS_MAINNET_BASE_URL = "https://opensea.io/assets/ethereum";
  const OS_GOERLI_BASE_URL = "https://testnets.opensea.io/assets/goerli";
  const OS_BASE_URL = chainID == 1 ? OS_MAINNET_BASE_URL : OS_GOERLI_BASE_URL;
  const osURL = `${OS_BASE_URL}/${collectionAddress}/${tokenID}`;

  return (
    <>
      <p className="bwl-modal-success-paragraph">
        You successfully listed{" "}
        <span className="lsf-modal-success-token">
          {data?.name} #{leverageBuy.tokenID}
        </span>{" "}
        for sale.{" "}
        <a href={osURL} target="_blank" rel="noopener noreferrer" className="lsf-modal-success-link">
          View on OpenSea
        </a>
        .
      </p>
      <MetaStreetButton onClick={props.onClose}>Close</MetaStreetButton>
    </>
  );
};

export const ListForSaleModalSuccessAnimation = () => {
  // TODO: add actual list for sale success animation
  return <RefinanceModalSuccessAnimation />;
};

export default ListForSaleModalSuccess;
