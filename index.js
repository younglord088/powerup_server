const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();
app.use(express.json());

// CORS configuration to allow requests from your frontend domain with credentials
app.use(cors());

// Define the target URL for the external authentication server
const targetUrl = "https://indiawaterportal.org"; // The actual auth domain
console.log("Proxying to targetUrl:", targetUrl);

// Proxy middleware to forward /api/auth requests to the external server
app.use(
  '/api/auth/v1/users/me', // This specific endpoint will be proxied
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,    // Needed to handle cross-origin requests
    logLevel: 'debug',     // Enable debugging to check request flow
    pathRewrite: { '^/api/auth/v1/users/me': '/api/auth/v1/users/me' }, // This ensures the path remains the same
    secure: true           // Ensure SSL handling is correct for HTTPS
  })
);

// A test route to ensure the server is running
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
