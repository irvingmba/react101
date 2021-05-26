import { createAction } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";
import getImages from "../../Services/getImages";
import gallerySlice from "../GallerySlice";

export const ASC_GET_PAGE = "ASC_GET_PAGE";

export const getPageAction = createAction(ASC_GET_PAGE);

export const INIT_PAGE = "INIT_PAGE";
export const UPDATE_IMAGES = "UPDATE_IMAGES";

export function* getPage(action) {
  const { payload } = action;
  const state = yield select();
  const { page, id, total } = state;
  switch (payload) {
    case INIT_PAGE: {
      const resp = yield call(getImages, id, 10, page);
      yield put(gallerySlice.actions.init(resp.data));
      return;
    }
    case UPDATE_IMAGES: {
      const nextResp =
        page + 1 <= total ? yield call(getImages, id, 10, page + 1) : null;
      const next = nextResp && nextResp.data;
      yield put(gallerySlice.actions.updateImages([next]));
      return;
    }
    default:
  }
}
