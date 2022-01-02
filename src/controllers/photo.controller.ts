import { Photo } from "../models/photos.model";
import { ServerResponse } from "http";

export const getPhotos = async (res: ServerResponse) => {
  const allPhotos = await Photo.find();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(allPhotos));
};

export const getPhotoByQuery = async (req: any, res: ServerResponse) => {
  const query: string[] = ["limit", "orderBy", "page"];
  const urlString: string = `${req.headers.host}${req.url}`;
  const searchPar = new URL(urlString);

  let limit: string, orderBy: string, page: string;

  limit = String(searchPar.searchParams.get(query[0]));
  orderBy = String(searchPar.searchParams.get(query[1]));
  page = String(searchPar.searchParams.get(query[2])) || "1";

  if (limit !== "null" && orderBy === "null") {
    if (page !== "null") {
      const photos = await Photo.find()
        .limit(parseInt(limit))
        .skip(parseInt(page) * parseInt(limit) - parseInt(limit));
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(photos));
    } else {
      const photos = await Photo.find().limit(parseInt(limit));
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(photos));
    }
  } else if (limit === "null" && orderBy !== "null") {
    if (page !== "null") {
      const photos = await Photo.find()
        .limit(100)
        .sort({ title: orderBy.toLowerCase() })
        .skip(parseInt(page) * parseInt("100") - parseInt("100"));
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(photos));
    } else {
      const photos = await Photo.find()
        .limit(100)
        .sort({ title: orderBy.toLowerCase() });
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(photos));
    }
  }

  if (page !== "null") {
    if (orderBy !== "null") {
      const photos = await Photo.find()
        .limit(100)
        .sort({ title: orderBy.toLowerCase() })
        .skip(parseInt(page) * parseInt("100") - parseInt("100"));
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(photos));
    } else {
      const photos = await Photo.find()
        .limit(100)
        .skip(parseInt(page) * parseInt("100") - parseInt("100"));
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(photos));
    }
  }

  if (limit !== "null" && orderBy !== "null") {
    const photos = await Photo.find()
      .limit(100)
      .sort({ title: orderBy.toLowerCase() });
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(photos));
  }

  const getPhotosByFilter = await Photo.find()
    .limit(parseInt(limit))
    .skip(parseInt(page) * parseInt(limit) - parseInt(limit))
    .sort({
      title: orderBy.toLowerCase(),
    });

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(getPhotosByFilter));
};
