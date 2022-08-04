import { Router } from "express";
import { listUserURLs,listUserRanking } from '../controllers/userControllers.js'

const router = Router();

router.get("/users/me",listUserURLs);
router.get("/ranking",listUserRanking);

export default router;