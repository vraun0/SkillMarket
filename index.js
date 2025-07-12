const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./routes/user')
const coursesRouter = require('./routes/admin')
const adminRouter = require('./routes/courses')

mongoose.connect(process.env.MONGODB_URI);
const port = 3000;

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





app.listen(port);
