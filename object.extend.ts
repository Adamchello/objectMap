interface entriesReduce<T> {
    acc: object;
    entry: Array<Array<T>>;
    idx: number;
    self: Array<Array<T>>;
  }
  
  interface resultTypes<T> extends entriesReduce<T> {
    callback: () => object;
  }
  
  export function objectMap<T>(this: object, callback): object {
    const entries: string[][] = (<any>Object).entries(this);
    return entries.reduce((acc, entry, idx, self): entriesReduce<T> => {
      const result: resultTypes<T> = {
        ...acc,
        ...callback(entry, idx, self),
      };
      return result;
    }, {});
  }