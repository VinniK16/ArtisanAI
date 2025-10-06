import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";

export const speechToText = async (req, res) => {
  try {
    const file = req.file;
    const form = new FormData();
    form.append("file", fs.createReadStream(file.path));

    const response = await fetch("https://api-inference.huggingface.co/models/openai/whisper-small", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
      body: form
    });

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to convert speech to text." });
  }
};
