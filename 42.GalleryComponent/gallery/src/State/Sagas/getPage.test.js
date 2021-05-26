import { runSaga } from "redux-saga";
import { ASC_GET_PAGE, getPage, getPageAction, INIT_PAGE, UPDATE_IMAGES } from "./getPage";
import { jest } from "@jest/globals";
import getImages from "../../Services/getImages";
import gallerySlice from "../GallerySlice";

// __spies__
jest.mock("../../Services/getImages");

describe("Testing action to request a page", () => {
  test("Testing action function", () => {
    const action = getPageAction(INIT_PAGE);
    expect(action).toHaveProperty("type", ASC_GET_PAGE);
    expect(action).toHaveProperty("payload", INIT_PAGE);
  });
});

describe("Testing generator to request a page", () => {
  test("Execution of generator", async () => {
    getImages.mockReturnValueOnce({ data: 1 });
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
    expect(dispatched).toHaveLength(1);
    expect(dispatched).toEqual(
      expect.arrayContaining([gallerySlice.actions.init(1)])
    );
  });

  test("Execution of generator", async () => {
    getImages.mockReturnValueOnce({ data: 1 });
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
      getPageAction(UPDATE_IMAGES)
    ).toPromise();
    expect(dispatched).toHaveLength(1);
    expect(dispatched).toEqual(
      expect.arrayContaining([gallerySlice.actions.updateImages([1])])
    );
  });
});
