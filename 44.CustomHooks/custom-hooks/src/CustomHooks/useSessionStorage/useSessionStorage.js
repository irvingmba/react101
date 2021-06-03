import { useState } from "react";
import configStorageSetter from "../../Utils/configStorageSetter";

export default function useSessionStorage(initValue = {}) {
  Object.keys(initValue).map((key) =>
    sessionStorage.setItem(key, initValue[key])
  );

  const finalState = Object.keys(sessionStorage).reduce((acc, key) => {
    acc[key] = sessionStorage.getItem(key);
    return acc;
  }, {});

  const [state, setState] = useState(Object.freeze(finalState));
  const setStorage = configStorageSetter(sessionStorage, setState);

  return [state, setStorage];
}
