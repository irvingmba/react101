// import { render, screen } from '@testing-library/react';
import App from "./App";
import { store } from "./State/store";
import { render, screen } from "./__test-utils__/reduxUtil";
import * as Gallery from "./View/Gallery";
import {jest} from "@jest/globals";

// __spies__
const spyError = jest.spyOn(console, "error");

test("renders main application", () => {
  spyError.mockImplementation(jest.fn());
  render(<App />, { store: store });
  const application = screen.getByRole("application", { name: "" });
  expect(application).toBeDefined();
});
