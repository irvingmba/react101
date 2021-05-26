import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import gallerySlice from "./GallerySlice";
import { ASC_GET_PAGE, getPage } from "./Sagas/getPage";

const reducer = gallerySlice.reducer;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
  // preloadedState,
  // enhancers: [reduxBatch],
});

function* rootSaga(){
    yield takeEvery(ASC_GET_PAGE, getPage);
};

sagaMiddleware.run(rootSaga);