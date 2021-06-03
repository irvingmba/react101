import useLocalStorage from "./useLocalStorage";
import { cleanup, render } from "@testing-library/react";
import { useEffect, useState } from "react";

const defineLocalStorage = () =>
  Object.defineProperty(window, "localStorage", {
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
  localStorage.setItem.mockImplementation((key, value) => {
    Object.assign(localStorage, { [key]: value });
    return [key, value];
  });
};
const defineGetItem = () => {
  localStorage.getItem.mockImplementation((key) => localStorage[key]);
};
const initLocalStorage = () => {
  defineLocalStorage();
  defineSetItem();
  defineGetItem();
};

describe("Test local storage hook", () => {
  beforeEach(() => {
    initLocalStorage();
  });

  afterEach(cleanup);

  test("Initializing hook without argumets, it won't store a thing", () => {
    function Test() {
      const [storage, setStorage] = useLocalStorage();
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
      const [storage, setStorage] = useLocalStorage(key, value);
      useEffect(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith("hello", "world");
        expect(localStorage.getItem).toHaveBeenCalledWith("hello");
        expect(storage).toEqual(value);
      });
      return <></>;
    }
    render(<Test />);
  });

  test("When initialized and the item is stored in local storage, it will take the stored value", () => {
    localStorage.setItem("hello", "people");
    function Test() {
      const key = "hello",
        value = "world";
      const [storage, setStorage] = useLocalStorage(key, value);
      useEffect(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith("hello");
        expect(storage).toEqual("people");
      });
      return <></>;
    }
    render(<Test />);
  });


  test("Use setStorage to change the state of local storage", () => {
    localStorage.setItem("hello", "people");
    function Test() {
      const key = "hello",
        value = "world";
      const [storage, setStorage] = useLocalStorage(key, value);
      if(storage === "people"){
        setStorage("humans");
      };
      useEffect(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith("hello", "humans");
        expect(localStorage.getItem).toHaveBeenCalledWith("hello");
        expect(storage).toEqual("humans");
      });
    return <></>;
    }
    render(<Test />);
  });
});
