import rootReducer from "./RootReducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../../Sagas";

export default function configureAppStore() {
  const saga = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
  });
  saga.run(rootSaga);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./RootReducer", () => store.replaceReducer(rootReducer));
  }
  return store;
}
