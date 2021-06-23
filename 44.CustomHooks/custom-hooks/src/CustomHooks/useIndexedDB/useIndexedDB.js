import { useEffect, useMemo, useReducer, useRef } from "react";

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
    case "SET": {
      return [...action.payload];
    }
    default:
      return state;
  }
}

function action(type, payload) {
  return { type, payload };
}

function initDB(dbName, dateVersion, store) {
  const request = window.indexedDB.open(dbName, dateVersion);
  request.onerror = function (event) {
    console.error(event.target);
  };
  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    try {
      db.createObjectStore(store, { autoIncrement: true });
    } catch (e) {
      db.deleteObjectStore(store);
      db.createObjectStore(store, { autoIncrement: true });
    }
  };
  return new Promise((res) => {
    request.onsuccess = function (event) {
      const _db = event.target.result;
      res(_db);
    };
  });
}

function getIndexedData(db, getAsyncStore) {
  return new Promise((res) => {
    const objectStore = getAsyncStore(db);
    const acc = [];
    objectStore.then((store) => {
      const cursorTransaction = store.openCursor();
      cursorTransaction.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          const record = { key: cursor.key, value: cursor.value };
          acc.push(record);
          cursor.continue();
        } else {
          res(acc);
        }
      };
    });
  });
}

export default function useIndexedDB(store = "default", dbName = "myDB") {
  const dateVersion = useMemo(() => Date.now(), []);

  let db = useRef({});

  db.current = useMemo(() => initDB(dbName, dateVersion, store), []);

  function getAsyncStore(db) {
    return db
      .then((_db) => _db.transaction(store, "readwrite"))
      .then((transaction) => transaction.objectStore(store));
  }

  async function getStoredData(db) {
    const data = await getIndexedData(db, getAsyncStore);
    dispatch(action("SET", data));
  }

  useEffect(() => {
    getStoredData(db.current);
    return async function clean() {
      const _db = await db.current;
      await _db.close();
    };
  }, []);

  function remove(key) {
    const objStore = getAsyncStore(db.current);
    objStore.then((store) => {
      const removeOperation = store.delete(key);
      removeOperation.onsuccess = function (event) {
        getStoredData(db.current);
      };
    });
  }

  function update(item, key) {
    const objStore = getAsyncStore(db.current);
    objStore.then((store) => {
      const updateOperation = store.put(item, key);
      updateOperation.onsuccess = function (e) {
        getStoredData(db.current);
      };
    });
  }

  const [state, dispatch] = useReducer(reducer, []);

  return {
    put: update,
    store: state,
    remove,
  };
}
