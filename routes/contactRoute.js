// Routes/contactRoutes.js
import express from "express";
import contactController from "../Controllers/messageController.js";

const router = express.Router();

router.post("/", contactController); // ✅ Correct path here

export default router;
