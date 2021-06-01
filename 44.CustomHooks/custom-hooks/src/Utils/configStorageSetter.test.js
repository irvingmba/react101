import React from "react";
import configStorageSetter from "./configStorageSetter";

Object.defineProperty(window, "localStorage", {
  writable: true,
  value: {
    clear: jest.fn(),
    setItem: jest.fn(),
  },
});

describe("Testing function to configure the setter of a local or session storage", () => {
  function SimpleForm({ submit }) {
    return (
      <form onSubmit={submit}>
        <input type="text" aria-label="text" />
        <input type="submit" />
      </form>
    );
  }

  test("When configured a setter without parameters, it will throw", () => {
    const setter = configStorageSetter();
    expect(() => setter("value")).toThrow();
  });

  test("Storage must implement clear and setItem methods", () => {
    const mockSetter = jest.fn();
    const setter = configStorageSetter(localStorage, mockSetter);
    const mockValue = { hello: "world" };
    setter(mockValue);
    expect(mockSetter).toHaveBeenCalledWith(mockValue);
    expect(localStorage.clear).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
