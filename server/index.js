const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const coursesRouter = require("./routes/courses");
const cors = require("cors");

const port = 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://skill-market-pi.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/courses", coursesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: err.message || "Internal server error",
    errors: err.errors || null,
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
