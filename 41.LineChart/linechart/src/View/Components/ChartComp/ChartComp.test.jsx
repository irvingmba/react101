import { render, cleanup } from "@testing-library/react";
import ChartComp from "./ChartComp";
import { Chart } from "chart.js";

// __mocks__
jest.mock("chart.js");

describe("Testing the component that displays chart data", () => {
  afterEach(cleanup);

  test("Testing component without any data", () => {
    jest.doMock("chart.js");
    const { container } = render(<ChartComp />);
    expect(Chart).toHaveBeenCalled();
    expect(container.children).not.toHaveLength(0);
  });

  test("Testing component with data", () => {
    const title = "Test title";
    const labels = ["Past", "Present", "Future"];
    const data = ["0", "50", "100"];
    const { container } = render(
      <ChartComp title={title} labels={labels} data={data} />
    );
    expect(Chart).toHaveBeenCalled();
    expect(container.children).not.toHaveLength(0);
  });

  test("When passing an updating point, the component will process it", () => {
    Chart.mockImplementation(() => ({
      data: { datasets: [{ data: [] }] },
      update: jest.fn(),
      destroy: jest.fn(),
    }));
    const title = "Test title";
    const labels = ["Past", "Present", "Future"];
    const data = ["0", "50", "100"];
    const { container } = render(
      <ChartComp title={title} labels={labels} data={data} updPoint={[150]} />
    );
    expect(Chart).toHaveBeenCalled();
    expect(container.children).not.toHaveLength(0);
  });
});
