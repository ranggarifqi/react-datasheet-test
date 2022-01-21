export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

export const compactArray = <T>(arr: T[]) => {
  const set = new Set(arr)
  return [...set]
}