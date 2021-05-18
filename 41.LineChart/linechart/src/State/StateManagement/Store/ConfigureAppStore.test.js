import configureAppStore from "./ConfigureAppStore";

describe("Testing function to create app store", () => {
    test("When calling function, it creates the store with its methods", () => {
        const store = configureAppStore();
        expect(store).toHaveProperty("getState", expect.any(Function));
        expect(store).toHaveProperty("dispatch", expect.any(Function));
        expect(store).toHaveProperty("subscribe", expect.any(Function));
        expect(store).toHaveProperty("replaceReducer", expect.any(Function));
    })
});