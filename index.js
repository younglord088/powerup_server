const express = require("express");
const app = express();
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(express.json());

app.use(
  cors({
    origin: "https://powerupp.vercel.app/", 
    credentials: true, 
  })
);

const proxyURL = "https://www.indiawaterportal.org";

app.use(
  "/",
  createProxyMiddleware({
    target: proxyURL,
    changeOrigin: true,
    secure: true, 
  })
);

const port = 5003;
app.listen(port, () => console.log(`Server is running on port ${port}`));
