import { runSaga } from "redux-saga";
import { ASC_GET_PAGE, getPage, getPageAction, INIT_PAGE } from "./getPage";
import { jest } from "@jest/globals";
import * as getImages from "../../Services/getImages";

// __spies__
const spyImages = jest.spyOn(getImages, "default");

describe("Testing action to request a page", () => {
  test("Testing action function", () => {
    const action = getPageAction(INIT_PAGE);
    expect(action).toHaveProperty("type", ASC_GET_PAGE);
    expect(action).toHaveProperty("payload", INIT_PAGE);
  });
});

describe("Testing generator to request a page", () => {
  spyImages.mockReturnValueOnce({ data: 1 });
  test("Execution of generator", async () => {
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch(action) {
          dispatched.push(action);
        },
        getState() {
          return { page: 1, id: "g1", total: 5 };
        },
      },
      getPage,
      getPageAction(INIT_PAGE)
    ).toPromise();
  });
});
