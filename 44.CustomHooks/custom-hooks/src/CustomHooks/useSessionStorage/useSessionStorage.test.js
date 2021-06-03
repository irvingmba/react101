import { cleanup, render } from "@testing-library/react";
import { useState } from "react";
import useSessionStorage from "./useSessionStorage";

// __mocks__
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

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
  const mockSetInit = jest.fn();
  beforeEach(() => {
    initSessionStorage();
    mockSetInit.mockClear();
    useState.mockImplementation((init) => [init, mockSetInit]);
  });

  afterEach(cleanup);

  test("Initializing hook without arguments will store an empty object", () => {
    function Test() {
      const [storage, setStorage] = useSessionStorage();
      expect(storage).toEqual({});
      expect(setStorage).toEqual(expect.any(Function));
      return <></>;
    }
    render(<Test />);
  });

  test("When initializing with an object, it will send the object to local storage", () => {
    function Test() {
      const initial = { hello: "world" };
      const [storage, setStorage] = useSessionStorage(initial);
      expect(sessionStorage.setItem).toHaveBeenCalledWith("hello", "world");
      expect(sessionStorage.getItem).toHaveBeenCalledWith("hello");
      expect(storage).toEqual(initial);
      return <></>;
    }
    render(<Test />);
  });

  test("When initializing with an array or any other value, it will transform it into an object", () => {
    function Test() {
      const initial = ["hello", "world"];
      const [storage, setStorage] = useSessionStorage(initial);
      expect(sessionStorage.setItem).toHaveBeenCalledWith("0", "hello");
      expect(sessionStorage.setItem).toHaveBeenCalledWith("1", "world");
      expect(storage).toEqual({ 0: "hello", 1: "world" });
      return <></>;
    }
    render(<Test />);
  });

  test("Use setStorage to change the state of storage", () => {
    sessionStorage.clear.mockImplementation(initSessionStorage);
    function Test() {
      const initial = { hello: "world" };
      const [storage, setStorage] = useSessionStorage(initial);
      expect(storage).toEqual(initial);
      const expected = { hi: "people" };
      setStorage(expected);
      expect(mockSetInit).toHaveBeenCalledWith(expected);
      return <></>;
    }
    render(<Test />);
  });
});
