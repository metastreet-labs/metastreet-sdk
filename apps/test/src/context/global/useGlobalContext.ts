import { useContext } from "react";
import { GlobalContext } from "./GlobalProvider";

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("GlobalProvider not found");
  return context;
};

export default useGlobalContext;
