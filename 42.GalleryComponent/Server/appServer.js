import express from "express";
import getPage from "./Services/GetPage.js";

const appServer = express();

appServer.get("/gallery/:galleryID/", (req, res) => {
    const {galleryID} = req.params;
    const {count, page} = req.query;
    const found = getPage(galleryID, Number.parseInt(count), Number.parseInt(page));
    res.send(found);
});

export default appServer;