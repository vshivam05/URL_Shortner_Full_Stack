import crypto from "crypto";
import Url from "../models/urlModel.js";
const rateLimitMap = new Map();

// export const shortenUrl = async (req, res) => {
//   const { original_url } = req.body;
//   console.log(original_url)
//   if (!original_url) return res.status(400).json({ error: "URL is required" });

//   const short_code = crypto.randomBytes(3).toString("hex");

//   try {
//     const newUrl = await Url.create({ original_url, short_code });
//     res.json(newUrl);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to shorten URL" });
//   }
// };

const RATE_LIMIT = 5; // max requests
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

export const shortenUrl = async (req, res) => {
  const { original_url } = req.body;
  const ip = req.ip;

  if (!original_url) return res.status(400).json({ error: "URL is required" });

  // Check rate limit
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, startTime: now };

  if (now - entry.startTime < TIME_WINDOW) {
    if (entry.count >= RATE_LIMIT) {
      return res.status(429).json({ error: "Too many requests. Try again later after 1 min." });
    } else {
      entry.count += 1;
      rateLimitMap.set(ip, entry);
    }
  } else {
    // Reset the counter
    rateLimitMap.set(ip, { count: 1, startTime: now });
  }

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
