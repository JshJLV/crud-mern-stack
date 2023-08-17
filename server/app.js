const express = require("express");
const cors = require("cors");
const postsRoutes = require("./src/routes/posts.routes");
const fileUpload = require("express-fileupload");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./server/src/upload",
  })
);

// routes
app.use(postsRoutes);

module.exports = app;
