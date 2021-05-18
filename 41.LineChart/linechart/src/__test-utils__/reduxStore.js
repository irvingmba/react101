// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
// Import your own reducer
import reducer from "../State/StateManagement/Store/RootReducer";
import { combineReducers, createStore } from "@reduxjs/toolkit";

function render(
  ui,
  {
    initialState,
    store = createStore(combineReducers(reducer), initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
