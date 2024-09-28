const express = require("express");
const app = express();
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Explicitly set your frontend origin
    credentials: true, // Allow credentials
  })
);

const proxyURL = "https://www.indiawaterportal.org";

app.use(
  "/",
  createProxyMiddleware({
    target: proxyURL,
    changeOrigin: true,
    secure: false, // This can be useful if you're dealing with SSL issues
  })
);

const port = 5003;
app.listen(port, () => console.log(`Server is running on port ${port}`));
