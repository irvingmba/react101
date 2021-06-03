import { useCallback, useMemo, useState } from "react";

export default function useLocalStorage(key, value) {
  const initValue = useMemo(() => {
    const stored = localStorage.getItem(key);
    if (stored) return stored;
    localStorage.setItem(key, value);
    return value;
  }, [value]);

  const [state, setState] = useState(initValue);

  const setStorage = useCallback(
    (update) => {
      setState(update);
      localStorage.setItem(key, update);
    }
  , []);

  return [state, setStorage];
}
