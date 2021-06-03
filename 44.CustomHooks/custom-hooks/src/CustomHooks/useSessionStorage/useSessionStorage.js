import { useCallback, useMemo, useState } from "react";

export default function useSessionStorage(key, value) {
  const initValue = useMemo(() => {
    const stored = sessionStorage.getItem(key);
    if (stored) return stored;
    sessionStorage.setItem(key, value);
    return value;
  }, [value]);

  const [state, setState] = useState(initValue);

  const setStorage = useCallback(
    (update) => {
      setState(update);
      sessionStorage.setItem(key, update);
    }
  , []);

  return [state, setStorage];
}
