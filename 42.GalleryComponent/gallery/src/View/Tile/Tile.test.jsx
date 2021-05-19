import { cleanup, render, screen } from "@testing-library/react";
import Tile from "./Tile";
import testData from "../../__test-utils__/Data/TestData";

// __spies__
const spyError = jest.spyOn(console, "error");

describe("Testing Tile component", () => {
  beforeAll(() => {
    spyError.mockImplementation(jest.fn());
  });

  afterEach(cleanup);

  test("Rendering without props, it asks for required props", () => {
    render(<Tile />);
    expect(spyError).toHaveBeenCalled();
  });

  test("With props it will render without warnings", () => {
    spyError.mockReset();
    const [{ src, width, height }] = testData;
    const { container } = render(
      <Tile src={src} width={width} height={height} />
    );
    expect(spyError).not.toHaveBeenCalled();
    const li = container.querySelector("li");
    expect(li).toBeInTheDocument();
  });
});
