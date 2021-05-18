import App from "./App";
import {render} from "@testing-library/react";

jest.mock("chart.js");

test("renders learn react link", () => {
  const { container } = render(<App />);
  expect(container.children).not.toHaveLength(0);
});
