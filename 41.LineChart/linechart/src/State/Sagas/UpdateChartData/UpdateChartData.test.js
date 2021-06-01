import { runSaga } from "redux-saga";
import updateChartData from "./UpdateChartData";

// __spies__
const spyError = jest.spyOn(console, "error");

describe("Testing saga for update chart data", () => {
  test("Calling saga", async () => {
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ value: "test" }),
      },
      updateChartData
    ).toPromise();
    expect(dispatched).toHaveLength(2);
  });

  test("Testing exceptions", () =>{
    spyError.mockReset();
    const saga = updateChartData();
    saga.next();
    saga.throw("testing")
    expect(spyError).toHaveBeenCalledWith("testing");
  });
});
