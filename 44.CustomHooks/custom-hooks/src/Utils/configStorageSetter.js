export default function configStorageSetter(bwrStorage, setState) {
  return function setStorage(value) {
    bwrStorage.clear();
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const prop = value[key];
        bwrStorage.setItem(key, prop);
      }
    }
    setState(value);
  };
}
