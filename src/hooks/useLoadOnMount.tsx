import { useEffect, useState } from "react";

export function useLoadOnMount<T, E>(
  fetchFn: () => Promise<T>,
  initialState: T
) {
  const [data, setData] = useState<T>(initialState);
  const [error, setError] = useState<E | undefined>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchFn()
      .then((data) => setData(data))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [fetchFn, setData, setIsLoading, setError]);

  return { data, isLoading, error };
}
