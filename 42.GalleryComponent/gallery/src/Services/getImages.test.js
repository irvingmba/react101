import { jest } from "@jest/globals";
import getImages from "./getImages";
import Axios from "axios";

// __mocks__
jest.mock("axios");
const spyError = jest.spyOn(console, "error");

describe("Testing service to get images from backend", () => {
  afterEach(() => {
    Axios.mockReset();
  });

  test("It sends the requeste even if data is not provided", async () => {
    await getImages();
    await getImages("g1", 10, 1);
    expect(Axios).toHaveBeenCalledTimes(2);
  });

});
