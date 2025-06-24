import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import contactRoutes from "./routes/contactRoute.js";
import loginRoutes from "./routes/loginRoute.js";
import blogRouter from "./routes/blogRouter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("MongoDB connected")).catch((err) => console.log(err));

app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.use("/api/contact", contactRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
