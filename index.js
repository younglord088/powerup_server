const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");   
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: ['https://powerupps-ezumin4hq-younglord088s-projects.vercel.app/'], // Add your frontend URL if needed
    credentials: true,
  }));
  

// const proxyUrl = "http://localhost:3002";
const targetUrl = process.env.TARGETURL;
console.log("targetUrl", targetUrl);
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }, // Strip '/api/auth' before proxying
  })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));