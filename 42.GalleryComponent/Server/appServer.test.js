import request from "supertest";
import { default as appServer } from "./appServer";

describe("Testing GET /gallery/:galleryID endpoint", () => {
  test("Bad request returns status 500", async () => {
    const resp = await request(appServer).get("/gallery/g1/");
    expect(resp.statusCode).toBe(500);
  });

  test("Testing GET /gallery/:galleryID endpoint", async () => {
    const resp = await request(appServer).get("/gallery/g1/?count=10&page=1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        images: expect.any(Array),
        page: expect.any(Number),
        total: expect.any(Number),
      })
    );
  });
});
