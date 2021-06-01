import { useState } from "react";
import configStorageSetter from "../../Utils/configStorageSetter";

export default function useLocalStorage(initValue = {}) {
  Object.keys(initValue).map((key) =>
    localStorage.setItem(key, initValue[key])
  );
  const finalState = Object.keys(localStorage).reduce((acc, key) => {
    acc[key] = localStorage.getItem(key);
    return acc;
  }, {});

  const [state, setState] = useState(Object.freeze(finalState));

  const setStorage = configStorageSetter(localStorage, setState);

  return [state, setStorage];
}
