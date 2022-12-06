import { useMetaStreetConfig } from "../../components/MetaStreetConfig";

const useSignerAddress = () => useMetaStreetConfig().signerAddress;

export default useSignerAddress;
