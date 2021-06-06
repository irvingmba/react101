import { useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    case "GET": {
      return [...action.payload];
    }
    case "CLEAR": {
      return [];
    }
    default:
      return state;
  }
}

function action(type, payload) {
  return { type, payload };
}

export default function useIndexedDB(store = "default", dbName = "myDB") {
  const [state, dispatch] = useReducer(reducer, []);

  const dateVersion = useMemo(()=>Date.now(), []);
  const request = indexedDB.open(dbName, dateVersion);
  let db = new Promise((res) => {
    request.onsuccess = function (event) {
      const _db = event.target.result;
      res(_db);
    };
  });

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    try {
      db.createObjectStore(store, { autoIncrement: true });
    } catch (e) {}
    console.log("done upgrade");
  };

  function getAsyncStore(){
    return db.then((_db) =>
      _db.transaction(store, "readwrite").objectStore(store)
    );
  };

  function getStoredData(){
    const objectStore = getAsyncStore();
    objectStore.then((store) => {
      dispatch(action("CLEAR"));
      const cursorTransaction = store.openCursor();
      cursorTransaction.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          const record = { key: cursor.key, value: cursor.value };
          console.log({ key: cursor.key, value: cursor.value });
          dispatch(action("ADD", record));
          cursor.continue();
        }
      };
    });
  };

  useEffect(() => {
    getStoredData();
  }, []);

  function remove(key) {
    const objStore = getAsyncStore();
    objStore.then((store) => {
      const removeOperation = store.delete(key);
      removeOperation.onsuccess = function (event) {
        getStoredData();
        };
    });
  }

  function update(item, key){
    const objStore = getAsyncStore();
    objStore.then((store)=>{
      const updateOperation = store.put(item, key);
      updateOperation.onsuccess = function(e){
        getStoredData();
      };
    });
  };

  return {
    put: update,
    store: state,
    remove
  };
}
