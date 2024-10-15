import express from "express";
import * as comicBookController from "../controllers/comicBookController.js";

const router = express.Router();

router.post("/seed", comicBookController.seedData);
router.post("/", comicBookController.createComicBook);
router.get("/", comicBookController.getComicBooks);
router.get("/:id", comicBookController.getComicBook);
router.put("/:id", comicBookController.updateComicBook);
router.delete("/:id", comicBookController.deleteComicBook);

export default router;
