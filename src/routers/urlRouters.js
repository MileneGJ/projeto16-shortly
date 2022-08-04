import { Router } from "express";
import { createShortURL, getOneURL, openShortURL, deleteURL } from '../controllers/urlControllers.js'

const router = Router();

router.post("/urls/shorten",createShortURL);
router.get("/urls/:id",getOneURL);
router.get("/urls/open/:shortUrl",openShortURL);
router.delete("/urls/:id",deleteURL)

export default router;