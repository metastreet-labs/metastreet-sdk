import { useMetaStreetConfig } from "../../components/MetaStreetConfig";

const useChainID = () => useMetaStreetConfig().chainID;

export default useChainID;
