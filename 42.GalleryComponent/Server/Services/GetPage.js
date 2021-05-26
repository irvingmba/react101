import { table } from "../Gallery1/table.js";

export default function getPage(galleryId, count, page) {
  if (!galleryId && !count && !page) throw new Error("Wrong query");
  const found = table.find((rec) => {
    return rec.id === galleryId && rec.page === page;
  });
  if (!found) throw new Error("Wrong request");
  const images =
    found.images.length > count ? found.images.slice(0, count) : found.images;
  return { ...found, images };
}
