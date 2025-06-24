// Routes/contactRoutes.js
import express from "express";
import contactController from "../Controllers/messageController.js";

const router = express.Router();

router.post("/", contactController); 

export default router;
