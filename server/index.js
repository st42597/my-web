const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  user: "sh",
  host: "db",
  database: "mydb",
  password: "1234",
  port: 5432,
});

const commentRouter = require("./routes/comments");

app.use(express.json());

app.use("/comments", commentRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
