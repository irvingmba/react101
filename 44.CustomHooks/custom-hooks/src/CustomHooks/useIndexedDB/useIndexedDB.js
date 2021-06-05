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
  // const [state, setState] = useState(null);
  const [state, dispatch] = useReducer(reducer, []);

  const request = indexedDB.open(dbName, 3);
  // let transaction;
  // let objectStore;
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

  function getStore(){
    const objectStore = db.then((_db) =>
      _db.transaction(store, "readwrite").objectStore(store)
    );
    objectStore.then((store) => {
      // const objectStore = trans.objectStore(store);
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
    getStore();
  }, []);

  function create(value) {
    const objStore = db.then((_db) =>
      _db.transaction(store, "readwrite").objectStore(store)
    );
    objStore.then((store) => {
      const operation = store.add(value);
      operation.onsuccess = function (event) {
        const result = event.target.result;
        console.log(result);
        getStore();
      };
    });
  }

  function remove(key) {
    const objStore = db.then((_db) =>
      _db.transaction(store, "readwrite").objectStore(store)
    );
    objStore.then((store) => {
      const removeOperation = store.delete(key);
      removeOperation.onsuccess = function (event) {
        getStore();
        };
    });
  }

  function update(item, key){
    const objStore = db.then((_db) =>
      _db.transaction(store, "readwrite").objectStore(store)
    );
    objStore.then((store)=>{
      const updateOperation = store.put(item, key);
      updateOperation.onsuccess = function(e){
        getStore();
      };
    });
  };

  return {
    put: update,
    store: state,
    remove
  };
}
