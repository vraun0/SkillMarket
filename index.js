const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const coursesRouter = require('./routes/courses')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

const port = 3000;

app.use(express.static(path.join(__dirname, 'frontend/dist')));


app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/courses', coursesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Internal server error',
    errors: err.errors || null, // optional, e.g. for validation
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(port);
