const express = require("express")
const dotenv = require("dotenv")
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors")
const cookieParser = require("cookie-parser");
dotenv.config()

connectDb()
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers)
};
app.use(cors(corsOptions))
app.use("/api/task", require("./routes/taskRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))


process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
