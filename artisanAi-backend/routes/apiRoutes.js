import express from "express";
import multer from "multer";
import { generateDescription } from "../controllers/description.js";
import { predictTags } from "../controllers/product.js";
import { speechToText } from "../controllers/speechToText.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temporary folder for uploaded files

// Text input → description
router.post("/generate-description", generateDescription);

// Image upload → predict product tags
router.post("/predict-tags", upload.single("image"), predictTags);

// Audio upload → convert speech to text
router.post("/speech-to-text", upload.single("audio"), speechToText);

export default router;




