const express = require("express");
const db = require("./config/db");

const app = express();
const port = 5000;

const commentRouter = require("./routes/comments");
const postRouter = require("./routes/posts");
const dbRouter = require("./routes/initDB");

app.use(express.json());

app.use("/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/initDB", dbRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
