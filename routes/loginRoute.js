import express from "express";
import {registerController, loginController, profileController} from "../Controllers/loginController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();


router.post("/register",registerController);
router.post("/login",loginController);
router.get("/profile",verifyToken,profileController);

export default router;