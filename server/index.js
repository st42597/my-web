// server.js
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  user: "sh", // PostgreSQL 사용자명
  host: "localhost", // PostgreSQL 서버 주소
  database: "myDB", // 사용할 데이터베이스 이름
  password: "1234", // 사용자 비밀번호
  port: 5432, // PostgreSQL 기본 포트
});

// JSON 요청 본문을 처리할 수 있도록 미들웨어 설정
app.use(express.json());

// 기본 루트 엔드포인트
app.get("/", (req, res) => {
  res.send("Hello World");
});

// PostgreSQL에서 모든 사용자 데이터를 가져오는 엔드포인트
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows); // 조회된 데이터 반환
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving users");
  }
});

// 새로운 사용자 추가하는 엔드포인트
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]); // 생성된 사용자 반환
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
