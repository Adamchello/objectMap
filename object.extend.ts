interface entriesReduce {
    acc: object;
    entry: string | number | boolean[][];
    idx: number;
    self: string | number | boolean[][];
  }
  
  interface resultTypes extends entriesReduce {
    callback: () => object;
  }
  
  export function objectMap<T>(this: object, callback): object {
    const entries: string[][] = (<any>Object).entries(this);
    return entries.reduce((acc, entry, idx, self): entriesReduce => {
      const result: resultTypes = {
        ...acc,
        ...callback(entry, idx, self),
      };
      return result;
    }, {});
  }