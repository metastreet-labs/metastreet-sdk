import { GetFeesResult } from "@metastreet-labs/margin-core";
import { createContext, PropsWithChildren, useContext } from "react";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";
import useFeesQuery from "../../lib/hooks/useFeesQuery";
import ModalLoadingOrError from "../ModalLoadingOrError";

const FeesContext = createContext<GetFeesResult | undefined>(undefined);

export const useFees = () => {
  const context = useContext(FeesContext);
  if (!context) throw new Error("useFees was used outside of a FeesProvider");
  return context;
};

type FeesProviderProps = PropsWithChildren & {
  collectionAddress: string;
};

const FeesProvider = (props: FeesProviderProps) => {
  const { children, collectionAddress } = props;
  const { chainID } = useMetaStreetDeployment();
  const { data, error } = useFeesQuery({ collectionAddress, chainID });

  if (!data) return <ModalLoadingOrError error={error?.message} />;

  return <FeesContext.Provider value={data}>{children}</FeesContext.Provider>;
};

export default FeesProvider;
