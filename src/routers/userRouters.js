import { Router } from "express";
import { listUserURLs,listUserRanking } from '../controllers/userControllers.js'
import tokenVerify from "../middlewares/tokenVerify.js";

const router = Router();

router.get("/users/me",tokenVerify,listUserURLs);
router.get("/ranking",listUserRanking);

export default router;