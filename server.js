// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import contactRoutes from "./routes/contactRoute.js"; // Ensure this path is correct

// const app = express();
// dotenv.config();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/contact", contactRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendEmail from "./Controllers/messageController.js"; // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.post("/api/contact", sendEmail);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
