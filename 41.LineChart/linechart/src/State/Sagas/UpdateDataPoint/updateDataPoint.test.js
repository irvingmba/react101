import { runSaga, channel } from "redux-saga";
import { actionChannel, delay, put, take } from "redux-saga/effects";
import updatePointChart from "../../StateManagement/Reducers/ChartReducer/ActionReducers/updatePointChart";
import { chartActions } from "../../StateManagement/Reducers/ChartReducer/ChartSlice";
import channUpdDataPoint, { AS_UPD_DATA_POINT, updDataPointAction } from "./updateDataPoint";

describe("Testing saga to update a point in the chart", () => {
  test("Calling saga", async () => {
    // const dispatched = [];
    // const saga = await runSaga(
    //   {
    //     dispatch: (action) => dispatched.push(action),
    //     getState: () => ({ updPoint: [] }),
    //   },
    //   channUpdDataPoint, updDataPointAction(55)
    // ).toPromise();
    // expect(dispatched).toHaveLength(2);

    const saga = channUpdDataPoint();
    // Create a channel
    const sagaChannel = saga.next();
    const mockChannel = channel();
    expect(sagaChannel.value).toEqual(actionChannel(AS_UPD_DATA_POINT));
    // Create wait for an action
    const listener = saga.next(mockChannel);
    expect(listener.value).toEqual(take(mockChannel));
    // Wait 2000 ms
    const waitTimer = saga.next();
    expect(waitTimer.value).toEqual(delay(2000));
    // Update a point in the state
    const updatePoint = saga.next();
    expect(updatePoint.value).toEqual(put(chartActions.updatePointChart(expect.any(Number))));
    // Start the action again
    const startAgain = saga.next();
    expect(startAgain.value).toEqual(put(updDataPointAction()));
  });
});
