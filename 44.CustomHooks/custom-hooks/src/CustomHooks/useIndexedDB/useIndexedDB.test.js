import useIndexedDB from "./useIndexedDB";
import { cleanup, render } from "@testing-library/react";
import { useEffect } from "react";

function fakeIndexedDB() {
  const openRequest = {
    onsuccess: null,
    callOnSuccess() {
      if (typeof this.onsuccess === "function") {
        const event = { target: {objectStore, transaction} };
        this.onsuccess(event);
      }
    },
    onupgradeneeded : null,
    callOnUpgradeneeded() {
      if(typeof this.onupgradeneeded === "function") {
        const event = {target: {result: {objectStore, transaction}}}
      }
    }
  };

  const objectStore = {
    store: null,
    getAll(){}
  };

  const transaction = {};

  window.indexedDB = {
    open(name, version) {
      setTimeout(() => {
        openRequest.callOnSuccess();
        openRequest.callOnUpgradeneeded();
      }, 100);
      return openRequest;
    },
  };
}

describe("Testing hook for indexed db", () => {

  beforeEach(() => {
    fakeIndexedDB();
  });

  afterEach(cleanup);

  test("When executing hook without argumets, it will take default arguments", async () => {
    function Test() {
      const db = useIndexedDB();
      useEffect(() => {
        expect(db).toBeDefined();
      });
      return <></>;
    }
    render(<Test />);
  });

  test("Getting data from indexed db", () => {
    function Test() {
      const { read } = useIndexedDB();
      useEffect(() => {
        console.log(read());
      });
      return <></>;
    }
    render(<Test />);
  });
});
