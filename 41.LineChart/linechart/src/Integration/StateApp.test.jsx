import StateApp from "./StateApp";
import { cleanup, render } from "../__test-utils__/reduxStore";

// __mocks__
jest.mock("chart.js");

describe("Testing connected chart component", () => {

    afterEach(cleanup)

    test("Rendering connected component", () => {
        const {container} = render(<StateApp />);
        expect(container.children).not.toHaveLength(0);
    });

});