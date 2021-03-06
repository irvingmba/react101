import Axios from "axios";

export default function getImages(galleryId, count, page) {
  return Axios({
    method: "GET",
    url: `/gallery/${galleryId}`,
    params: {
      count,
      page,
    },
  })
}
