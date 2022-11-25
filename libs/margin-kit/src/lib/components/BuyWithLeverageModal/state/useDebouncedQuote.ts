import useDebouncedProps from "../../../hooks/useDebouncedProps";
import useQuoteMultipleERC721, {
  UseQuoteMultipleERC721Props,
} from "../../../lib/hooks/fetchers/useQuoteMultipleERC721";

const useDebouncedQuote = (props: UseQuoteMultipleERC721Props) => {
  const [debouncedProps, debouncing] = useDebouncedProps(props, [props.duration, props.downPayments]);

  const { data, error } = useQuoteMultipleERC721(debouncedProps);

  return {
    quote: debouncing ? undefined : data,
    quoteError: debouncing ? undefined : error,
  };
};

export default useDebouncedQuote;
