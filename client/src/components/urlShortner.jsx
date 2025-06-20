import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState(() => {
    const saved = localStorage.getItem("shortUrls");
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("shortUrls", JSON.stringify(shortUrls));
  }, [shortUrls]);

  const isValidUrl = (str) => {
    try {
      const newUrl = new URL(str);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCopiedCode("");
    setShortUrls([]);

    if (!url.trim()) return setError("Please enter a URL.");
    if (!isValidUrl(url)) {
      return setError("Invalid URL. Must start with http:// or https://");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/shorten`, {
        original_url: url,
      });
      setShortUrls((prev) => [res.data, ...prev]);
      setUrl("");
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (shortCode) => {
    const shortUrl = `${API_URL}/${shortCode}`;
    await navigator.clipboard.writeText(shortUrl);
    setCopiedCode(shortCode);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-indigo-100 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors">
      <header className="w-full max-w-xl text-center py-6">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
          🔗 URL Shortener
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Paste your long URL and get a short version instantly.
        </p>
      </header>

      <div className="w-full max-w-xl bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter long URL..."
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md font-medium text-white transition ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="w-full max-w-xl bg-white dark:bg-gray-900 shadow-md rounded-lg mt-6 p-4">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          📃 Shortened URLs
        </h2>
        {shortUrls.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">
            🚫 No URLs shortened yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {shortUrls.map((u, i) => (
              <li
                key={i}
                className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-700"
              >
                <a
                  href={`${API_URL}/${u.short_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline dark:text-indigo-400 break-all"
                >
                  {`${API_URL}/${u.short_code}`}
                </a>
                <button
                  onClick={() => handleCopy(u.short_code)}
                  className="relative group text-sm text-indigo-700 dark:text-indigo-300  ml-3"
                >
                  {copiedCode === u.short_code ? "✅ Copied!" : "📋 Copy"}
                  <span className="absolute -top-6 left-1/2 -translate-x-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md">
                    Click to copy
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="text-center py-6 text-sm text-gray-500 font-bold dark:text-gray-400 mt-10">
        Built with 💙 by Shivam Verma{" "}
        <a
          href="https://github.com/yourgithub"
          className="text-indigo-500 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://yourproject.vercel.app"
          className="text-indigo-500 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Live Demo
        </a>{" "}
        <br />
      </footer>
    </div>
  );
};

export default UrlShortener;
