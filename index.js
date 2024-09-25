const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();
app.use(express.json());


app.use(cors());

// Define the target URL for the external authentication server
const targetUrl = "https://indiawaterportal.org"; // The actual auth domain
console.log("Proxying to targetUrl:", targetUrl);

// Proxy middleware to forward /api/auth requests to the external server
app.use(
  '/api/auth/v1/users/me', // This specifies the exact path to proxy
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,    // Needed to handle cross-origin requests
    logLevel: 'debug',     // Enable debugging to check request flow
    pathRewrite: (path, req) => path.replace('/api/auth/v1/users/me', '/api/auth/v1/users/me'), // Keep the path exactly as is
    secure: true           // Ensure SSL handling is correct for HTTPS
  })
);


app.get("/", (req, res) => {
    res.send("Hello World!");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
