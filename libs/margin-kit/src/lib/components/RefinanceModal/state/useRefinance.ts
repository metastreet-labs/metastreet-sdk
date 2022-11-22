import { useContext } from "react";
import RefinanceContext from "./RefinanceContext";

export const useRefinance = () => {
  const context = useContext(RefinanceContext);
  if (!context) throw new Error("useRefinance was used outside of a RefinanceProvider");
  return context;
};
