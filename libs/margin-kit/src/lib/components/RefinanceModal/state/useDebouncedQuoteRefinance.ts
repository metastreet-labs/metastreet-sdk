import { useDebouncedProps } from "../../../hooks/useDebouncedProps";
import { useQuoteRefinance, UseQuoteRefinanceParams } from "../../../lib/hooks/fetchers/useQuoteRefinance";

const useDebouncedQuoteRefinance = (params: UseQuoteRefinanceParams) => {
  const [debouncedParams, debouncing] = useDebouncedProps(params, [
    params.duration,
    params.downPayment,
    params.vaultAddress,
  ]);

  const { data, error } = useQuoteRefinance(debouncedParams);

  return { quote: debouncing ? undefined : data, quoteError: debouncing ? undefined : error };
};

export default useDebouncedQuoteRefinance;
