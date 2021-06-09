import useIndexedDB from "./useIndexedDB";
import { cleanup, render, waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { useEffect, useState } from "react";
import "fake-indexeddb/auto";
import fireEvent from "@testing-library/user-event";

describe("Testing hook for indexed db", () => {
  beforeEach(() => {
    jest.useFakeTimers();
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
      const { store, put, remove } = useIndexedDB();
      useEffect(() => {
        expect(store).toHaveLength(0);
        expect(put).toEqual(expect.any(Function));
        expect(remove).toEqual(expect.any(Function));
      }, []);
      return <></>;
    }
    render(<Test />);
  });

  test("Adding data to indexedDB", async () => {
    function Test() {
      const { store, put, remove } = useIndexedDB();
      useEffect(() => {
        put("Testing");
      }, []);
      return (
        <>
          {store.map((v, index) => (
            <p key={index}>{v.value}</p>
          ))}
        </>
      );
    }
    render(<Test />);
    const displayed = await screen.findByText("Testing");
    expect(displayed).toBeDefined();
  });

  test("Deleting data from indexedDB", async () => {
    function Test() {
      const [name, setName] = useState("");

      const { store, put, remove } = useIndexedDB();

      function addEvent(e) {
        e.preventDefault();
        put(name);
        setName("");
      }

      return (
        <div>
          <label>
            name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          {store.map((v, index) => (
            <p
              key={index}
              onClick={(e) => {
                remove(v.key);
              }}
            >
              {v.value}
            </p>
          ))}
          <button onClick={addEvent}>Add</button>
          <button>Remove</button>
        </div>
      );
    }
    render(<Test />);
    const hello = "hello",
      world = "world";
    const nameInput = screen.getByLabelText("name");
    fireEvent.type(nameInput, hello);
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const helloNote = await screen.findByText(hello);
    expect(helloNote).toBeDefined();
    fireEvent.type(nameInput, world);
    fireEvent.click(addButton);
    const worldNote = await screen.findByText(world);
    expect(worldNote).toBeDefined();
    fireEvent.click(helloNote);
    // waitForElementToBeRemoved(helloNote).then(()=>expect(helloNote).not.toBeDefined())
    await waitFor(()=>{
      expect(screen.queryByText(hello)).not.toBeInTheDocument();
    });
  });
});
