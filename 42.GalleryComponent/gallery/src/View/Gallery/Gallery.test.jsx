import { cleanup, render } from "@testing-library/react";
import testData from "../../__test-utils__/Data/TestData";
import Gallery from "./Gallery";

describe("Testing gallery component", () => {
  afterEach(cleanup);

  test("Rendering without props", () => {
    const { container } = render(<Gallery />);
    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();
    const li = container.querySelector("li");
    expect(li).not.toBeInTheDocument();
  });

  test("Rendering with props", () => {
    const { container } = render(<Gallery data={testData} />);
    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();
    const li = container.querySelector("li");
    expect(li).toBeInTheDocument();
  });
});
