import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "g1",
  images: [],
  page: 1,
};

function init(state, action) {
  const allImages = [...state.images];
  const { images: updImages, page } = action.payload;
  allImages[page - 1] = updImages;
  const images = allImages;
  return { ...state, ...action.payload, images };
}

function updateImages(state, action) {
  const updImages = state.images;
  action.payload.map((obj) => {
    if (obj) {
      const { page, images } = obj;
      updImages[page - 1] = images;
    }
    return obj;
  });
}

function updatePage(state, action) {
  const page = action.payload;
  return { ...state, page };
}

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    init,
    updateImages,
    updatePage,
  },
});

export default gallerySlice;
