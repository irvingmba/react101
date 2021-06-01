import useLocalStorage from "./useLocalStorage";
import { cleanup, render } from "@testing-library/react";

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
localStorage.setItem.mockImplementation((key, value) =>
  Object.assign(localStorage, { [key]: value })
);
localStorage.getItem.mockImplementation((key) => localStorage[key]);
localStorage.clear.mockImplementation(() =>
  Object.keys(localStorage).map((key) => {
    delete localStorage[key];
  })
);

describe("Test local storage hook", () => {
  afterEach(cleanup);

  test("Initializing hook without arguments will store an empty object", () => {
    function Test() {
      const [storage, setStorage] = useLocalStorage();
      expect(storage).toEqual({});
      expect(setStorage).toEqual(expect.any(Function));
      return <></>;
    }
    render(<Test />);
  });

  test("When initializing with an object, it will send the object to local storage", () => {
    function Test() {
      localStorage.setItem.mockReset();
      localStorage.setItem.mockImplementation((key, value) =>
        Object.assign(localStorage, { [key]: value })
      );
      localStorage.getItem.mockImplementation((key) => localStorage[key]);
      localStorage.clear.mockImplementation(() =>
        Object.keys(localStorage).map((key) => {
          delete localStorage[key];
        })
      );
      const initial = { hello: "world" };
      const [storage, setStorage] = useLocalStorage(initial);
      expect(localStorage.setItem).toHaveBeenCalledWith("hello", "world");
      expect(localStorage.getItem).toHaveBeenCalledWith("hello");
      expect(storage).toEqual(initial);
      return <></>;
    }
    render(<Test />);
  });

  test("When initializing with an array or any other value, it will transform it into an object", () => {
    localStorage.clear();
    console.log(localStorage);
    function Test() {
      localStorage.setItem.mockReset();
      const initial = ["hello", "world"];
      const [storage, setStorage] = useLocalStorage(initial);
      console.log(localStorage.setItem.mock.calls);
      console.log(localStorage);
      //   expect(storage).toEqual();
      //   expect(localStorage.setItem).toHaveBeenCalledWith("hello", "world");
      return <></>;
    }
    render(<Test />);
  });
});
