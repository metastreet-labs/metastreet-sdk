import { useMetaStreetConfig } from "../../components/MetaStreetConfig";

const useDeployment = () => useMetaStreetConfig().deployment;

export default useDeployment;
