import Axios from "axios";

export default async function getImages(galleryId, count, page) {
  return await Axios({
    method: "GET",
    url: `/gallery/${galleryId}`,
    params: {
      count,
      page,
    },
  });
}
