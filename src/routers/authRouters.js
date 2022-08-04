import { Router } from "express";
import { createUser,loginUser } from '../controllers/authControllers.js'
import { validateSignIn, validateSignUp } from "../middlewares/authMiddlewares.js";

const router = Router();

router.post("/signup",validateSignUp,createUser);
router.post("/signin",validateSignIn,loginUser);

export default router;