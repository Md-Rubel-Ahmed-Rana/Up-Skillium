const pickQueries = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  const queryObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      queryObj[key] = obj[key];
    }
  }
  return queryObj;
};

export default pickQueries;
