# URL Shortener MERN Project

## Project Overview

This is a full-stack URL shortener application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to shorten long URLs into short, shareable links. The project includes several features such as rate limiting to prevent abuse, a responsive frontend with dark mode support, and a clean user interface.

## Features

- Shorten long URLs to short codes.
- Redirect short URLs to the original URLs.
- Rate limiting: Limits users to 5 URL shortening requests per minute per IP address.
- Persistent storage of URLs using MongoDB.
- Responsive and user-friendly React frontend.
- Clipboard copy functionality for shortened URLs.
- Error handling and validation for URL inputs.

## Technologies Used

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Other:** dotenv for environment variables, cors for cross-origin requests, crypto for generating short codes

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or cloud)
- Git installed (optional)

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your MongoDB connection string and any other environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:3000` (or another port if 3000 is in use).

## Usage

- Open the frontend URL in your browser.
- Enter a long URL in the input field and click "Shorten".
- The shortened URL will appear below, with options to copy it to the clipboard.
- Click the dark mode toggle button to switch between light and dark themes.
- Use the shortened URL to redirect to the original URL.

## API Endpoints

### POST /api/shorten

- Description: Shortens a given original URL.
- Request Body: JSON object with `original_url` field.
- Response: JSON object containing the original URL and generated short code.
- Rate Limiting: Maximum 5 requests per minute per IP address.

### GET /api/:code

- Description: Redirects to the original URL corresponding to the short code.
- Response: HTTP redirect to the original URL.

## Project Structure

- `client/`: React frontend source code.
- `server/`: Express backend source code.
- `server/models/`: Mongoose models.
- `server/controllers/`: API route handlers.
- `server/routes/`: Express routes.
- `server/config/`: Database configuration.
- `client/src/components/`: React components.

## Environment Variables

- `MONGO_URI`: MongoDB connection string.
- `PORT`: Port number for backend server (default 5000).

## Notes

- Ensure MongoDB is running and accessible before starting the backend.
- Restart the development servers after making changes to Tailwind config or environment variables.
- The rate limiting is implemented in-memory and may reset on server restart.

## License

This project is open source and free to use.

---

Built with ❤️ by Shivam Verma
