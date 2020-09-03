import { objectMap as mapper } from "./Object.extend";

export {};

declare global {
  interface Object {
    map(callback: Function): object;
  }
}

Object.prototype.map = mapper;




describe("function map", () => {
  it("test 1: should return object with given value if key was found", () => {
    const exampleObject = {
      name: "Anne",
      surname: "Cattu",
      age: 25,
      lastName: true,
    };

    const oldName = "Anne";
    const newName = "Eve";

    const result = exampleObject.map(([key, value]: any) => {
      if (value === oldName) {
        return { [key]: newName };
      }
      return {};
    });

    const { name } = result;
    expect(name).toBe(newName);
  });

  it("test 2: should return object with given key if value was found", () => {
    const exampleObject = {
      name: "Anne",
      surname: "Cattu",
      age: 25,
      lastName: true,
    };
    const oldKey = "name";
    const newKey = "middlename";
    const result = exampleObject.map(([key, value]: any) => {
      if (key === oldKey) {
        return { [newKey]: value };
      }
      return {};
    });


    expect(Object.keys(result).filter(el=>el === newKey)).toBe([newKey]);
  });

  it("test 3: should return object with given two values if key was found", () => {
    const exampleObject = {
      name: "Anne",
      surname: "Cattu",
      age: 25,
      lastName: true,
      mothersName: "Anne",
    };
    const oldValue = "Anne";
    const newValue = "Eve";
    const expectedResult = ["Eve", "Eve"];
    const result = exampleObject.map(([key, value]: any) => {
      if (value === oldValue) {
        return { [key]: newValue };
      }
      return {};
    });
    expect(Object.values(result)).toEqual(expectedResult);
  });


  it("test4: should return empty object if neither key or value passes the test,", () => {
    const exampleObject = {
      name: "Anne",
      middleName: "Kate",
      lastName: "Cattu"
    }
    const searchKey = "maidenName";
    const searchValue = "Kram";
    const newValue = "Nokram"

    const callback1 = ([key]: string) => {
      if (key === searchKey) {
        return { [key]: newValue}
      } return {}
    }

    const result1 = exampleObject.map(callback1);
    
    const callback2 = ([key, value]: string) => {
      if (value === searchValue) {
        return { [key]: newValue}
      } return {}
    }
    
    const result2 = exampleObject.map(callback2);

    const expectedResult = {};
    expect(result1).toEqual(expectedResult);
    expect(result2).toEqual(expectedResult);

  });
});