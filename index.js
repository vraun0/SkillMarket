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



app.listen(port);
