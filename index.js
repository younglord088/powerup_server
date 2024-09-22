const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: ['https://your-frontend-domain.com'], // Update with your actual frontend domain
    credentials: true,
}));

// Define the target URL for India Water Portal
const targetUrl = "https://auth.indiawaterportal.org"; // Update with the actual auth domain
console.log("Proxying to targetUrl:", targetUrl);

// Proxy middleware to forward /api/auth requests to the auth server
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }, // Removes /api/auth from the path before sending to target
  })
);

// A test route to ensure the server is running
app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
