
const obj = {'val':'test', 'val2': 'test2'}

// interface entriesReduce<T> {
//     acc: object;
//     entry: Array<Array<T>>;
//     idx: number;
//     self: Array<Array<T>>;
//   }

  


//   interface resultTypes<T> extends entriesReduce<T> {
//     callback: () => object;
//   }

//   const callback = ([key, value], idx, self)=>{
//     // który zwraca obiekt ze zmienionym dowolnie kluczem bądź wartością
//     return { [key]:value }
// }


interface anyObject {
  [key:string] : any
}

type tupleOfKeyAndValue = [string, any]
type mapReduceObjectCallback = (accumulator:anyObject, currentElement:tupleOfKeyAndValue, index:number, self:Array<tupleOfKeyAndValue>) => anyObject
type callbackOfMap = (entry:tupleOfKeyAndValue, index:number, self:anyObject) => anyObject
  

export function objectMap (callback:callbackOfMap): anyObject {
  
  const entries:Array<tupleOfKeyAndValue> = (<anyObject>Object).entries(this);

  const reduceCallback:mapReduceObjectCallback = (acc, entry, idx, self) => {
    const result:anyObject = {
      ...acc,
      ...callback(entry, idx, self),
    };
    return result;
  }

  const initial:anyObject = {}

  return entries.reduce(reduceCallback, initial);
}