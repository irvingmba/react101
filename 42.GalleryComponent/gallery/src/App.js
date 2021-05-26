import Gallery from "./View/Gallery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageAction, INIT_PAGE, UPDATE_IMAGES } from "./State/Sagas/getPage";
import { createSelector } from "@reduxjs/toolkit";
import gallerySlice from "./State/GallerySlice";

const selectCurrentImages = createSelector(
  (state) => state.images,
  (state) => state.page,
  (images, page) => images[page - 1]
);

function App() {
  const dispatch = useDispatch();

  const pages = useSelector((state) => state.total);
  const page = useSelector((state) => state.page);
  const currentImages = useSelector(selectCurrentImages);

  if (!Array.isArray(currentImages)) dispatch(getPageAction(INIT_PAGE));

  function handlePage(event, value) {
    dispatch(gallerySlice.actions.updatePage(value));
  }

  function handleScroll(event) {
    const scrollTop = event.srcElement.scrollingElement.scrollTop;
    const scrollTopMax = event.srcElement.scrollingElement.scrollTopMax;
    if (scrollTop === scrollTopMax) {
      dispatch(getPageAction(UPDATE_IMAGES));
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function clear() {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className={"App"} role="application">
      <Gallery
        data={currentImages}
        pages={pages}
        page={page}
        handlePage={handlePage}
      />
    </div>
  );
}

export default App;
