import { useMetaStreetConfig } from "../../components/MetaStreetConfig";

export const useMetaStreetQueryClient = () => useMetaStreetConfig().queryClient;

export default useMetaStreetQueryClient;
