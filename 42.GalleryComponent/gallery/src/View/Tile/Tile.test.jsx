import { render } from "@testing-library/react";
import Tile from "./Tile";

// __spies__
const spyError = jest.spyOn(console, "error");

describe("Testing Tile component", () => {
    beforeAll(()=>{
        spyError.mockImplementation(jest.fn());
    });
    test("Rendering without props, it asks for required props", () => {
        render(<Tile />);
        expect(spyError).toHaveBeenCalled();
    });
});