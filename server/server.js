const express = require("express")
const dotenv = require("dotenv")
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");

dotenv.config()
connectDb()
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
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
