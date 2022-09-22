import { useEffect, useState } from "react";
import useQuoteMultipleERC721, { UseQuoteMultipleERC721Props } from "../../../lib/hooks/useQuoteMultipleERC721";

const useDebouncedQuote = (props: UseQuoteMultipleERC721Props) => {
  const [dp, setDP] = useState(props);
  const [debouncing, setDebouncing] = useState(false);

  useEffect(() => {
    setDebouncing(true);
    const timeout = setTimeout(() => {
      setDebouncing(false);
      setDP(props);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.downPayments, props.duration]);

  const { data, error } = useQuoteMultipleERC721(dp);

  return {
    quote: debouncing ? undefined : data,
    quoteError: debouncing ? undefined : error,
  };
};

export default useDebouncedQuote;
