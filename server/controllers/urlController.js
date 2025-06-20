import crypto from "crypto";
import Url from "../models/urlModel.js";

export const shortenUrl = async (req, res) => {
  const { original_url } = req.body;
  console.log(original_url)
  if (!original_url) return res.status(400).json({ error: "URL is required" });

  const short_code = crypto.randomBytes(3).toString("hex");

  try {
    const newUrl = await Url.create({ original_url, short_code });
    res.json(newUrl);
  } catch (err) {
    res.status(500).json({ error: "Failed to shorten URL" });
  }
};


export const redirectToOriginal = async (req, res) => {
  const { code } = req.params;
  try {
    const url = await Url.findOne({ short_code: code });
    if (!url) return res.status(404).json({ error: "URL not found" });

    res.redirect(url.original_url);
  } catch (err) {
    res.status(500).json({ error: "Redirection error" });
  }
};
