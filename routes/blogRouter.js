import express from "express";
import { Router} from "express";
import { getPosts, postPosts} from "../Controllers/blogController.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";


const router = Router();
const upload = multer({ storage });

router.get("/", getPosts);
router.post("/", upload.single("image"), postPosts);

export default router;