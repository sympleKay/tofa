import http, { ServerResponse } from "http";
import { DBCONNECTION, PORT, photoGallery } from "./utils";
import { getPhotos, getPhotoByQuery } from "./controllers/photo.controller";

DBCONNECTION();

const server = http.createServer((req, res: ServerResponse) => {
  if (req.url === "/api/v1/photos" && req.method === "GET") {
    return getPhotos(res);
  } else if (req.url?.match(/\/api\/v1\/photos\?\w+/) && req.method === "GET") {
    return getPhotoByQuery(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

export default server.listen(PORT, async () => {
  await photoGallery();
  console.log(`Server started on port ${PORT}`);
});
