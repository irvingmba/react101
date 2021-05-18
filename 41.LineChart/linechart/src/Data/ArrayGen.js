function arrayGen(limit, val, fn) {
  const arr = new Array(typeof limit === "number" ? limit : 0);
  for (let i = 0; i < limit; ++i) {
    const final =
      val !== undefined && val !== null
        ? val
        : typeof fn === "function"
        ? fn()
        : i + 1;
    arr[i] = final;
  }
  return arr;
}

export default arrayGen;
