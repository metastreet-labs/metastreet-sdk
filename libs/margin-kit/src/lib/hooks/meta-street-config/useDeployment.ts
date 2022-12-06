import { useMetaStreetConfig } from "../../components/MetaStreetConfig";

export const useDeployment = () => useMetaStreetConfig().deployment;

export default useDeployment;
