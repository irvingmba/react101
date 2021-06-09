import useSessionStorage from "./useSessionStorage";
import { cleanup, render } from "@testing-library/react";
import { useEffect, useState } from "react";

const defineSessionStorage = () =>
  Object.defineProperty(window, "sessionStorage", {
    writable: true,
    value: Object.defineProperties(
      {},
      {
        clear: {
          enumerable: false,
          value: jest.fn(),
        },
        setItem: {
          enumerable: false,
          value: jest.fn(),
        },
        getItem: {
          enumerable: false,
          value: jest.fn(),
        },
      }
    ),
  });
const defineSetItem = () => {
  sessionStorage.setItem.mockImplementation((key, value) => {
    Object.assign(sessionStorage, { [key]: value });
    return [key, value];
  });
};
const defineGetItem = () => {
  sessionStorage.getItem.mockImplementation((key) => sessionStorage[key]);
};
const initSessionStorage = () => {
  defineSessionStorage();
  defineSetItem();
  defineGetItem();
};

describe("Test local storage hook", () => {
  beforeEach(() => {
    initSessionStorage();
  });

  afterEach(cleanup);

  test("Initializing hook without argumets, it won't store a thing", () => {
    function Test() {
      const [storage, setStorage] = useSessionStorage();
      expect(storage).not.toBeDefined();
      expect(setStorage).toEqual(expect.any(Function));
      return <></>;
    }
    render(<Test />);
  });

  test("When initializing with a value, it will store the value in the passed key", () => {
    function Test() {
      const key = "hello",
        value = "world";
      const [storage, setStorage] = useSessionStorage(key, value);
      useEffect(() => {
        expect(sessionStorage.setItem).toHaveBeenCalledWith("hello", "world");
        expect(sessionStorage.getItem).toHaveBeenCalledWith("hello");
        expect(storage).toEqual(value);
      });
      return <></>;
    }
    render(<Test />);
  });

  test("When initialized and the item is stored in local storage, it will take the stored value", () => {
    sessionStorage.setItem("hello", "people");
    function Test() {
      const key = "hello",
        value = "world";
      const [storage, setStorage] = useSessionStorage(key, value);
      useEffect(() => {
        expect(sessionStorage.getItem).toHaveBeenCalledWith("hello");
        expect(storage).toEqual("people");
      });
      return <></>;
    }
    render(<Test />);
  });


  test("Use setStorage to change the state of local storage", () => {
    sessionStorage.setItem("hello", "people");
    function Test() {
      const key = "hello",
        value = "world";
      const [storage, setStorage] = useSessionStorage(key, value);
      if(storage === "people"){
        setStorage("humans");
      };
      useEffect(() => {
        expect(sessionStorage.setItem).toHaveBeenCalledWith("hello", "humans");
        expect(sessionStorage.getItem).toHaveBeenCalledWith("hello");
        expect(storage).toEqual("humans");
      });
    return <></>;
    }
    render(<Test />);
  });
});
