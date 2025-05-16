const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Путь к файлу для сохранения ответов
const DATA_FILE = path.join(__dirname, "responses.json");

// Middleware для парсинга JSON
app.use(express.json());

// Разрешить CORS для локального фронтенда (можно настроить для нужного домена)
app.use(cors());

// Чтение сохраненных данных из файла
function readResponses() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { parent: [], student: [], teacher: [] };
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Ошибка при чтении данных:", err);
    return { parent: [], student: [], teacher: [] };
  }
}

// Запись данных в файл
function writeResponses(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Ошибка при записи данных:", err);
  }
}

app.get("/", (req, res) => {
  res.send("API для сохранения ответов опросов работает.");
});

// Принимать ответы родителей
app.post("/api/parent", (req, res) => {
  const response = req.body;
  if (!response) {
    return res.status(400).json({ error: "Нет данных" });
  }
  const data = readResponses();
  data.parent.push({ ...response, timestamp: new Date().toISOString() });
  writeResponses(data);
  res.json({ message: "Ответы родителей сохранены" });
});

// Принимать ответы учеников
app.post("/api/student", (req, res) => {
  const response = req.body;
  if (!response) {
    return res.status(400).json({ error: "Нет данных" });
  }
  const data = readResponses();
  data.student.push({ ...response, timestamp: new Date().toISOString() });
  writeResponses(data);
  res.json({ message: "Ответы учеников сохранены" });
});

// Принимать ответы учителей
app.post("/api/teacher", (req, res) => {
  const response = req.body;
  if (!response) {
    return res.status(400).json({ error: "Нет данных" });
  }
  const data = readResponses();
  data.teacher.push({ ...response, timestamp: new Date().toISOString() });
  writeResponses(data);
  res.json({ message: "Ответы учителей сохранены" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
