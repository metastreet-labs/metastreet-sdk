import { DependencyList, useEffect, useState } from "react";

type UseDebounceResult<T> = [T, boolean];

const useDebouncedProps = <T>(props: T, dependencies?: DependencyList): UseDebounceResult<T> => {
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
  }, dependencies);

  return [dp, debouncing];
};

export default useDebouncedProps;
