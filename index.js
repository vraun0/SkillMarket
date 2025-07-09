const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { authorization } = require('./auth');
const { User, Course } = require('./db');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = 3000;

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

});

app.get('/home', (req, res) => {
  res.send('Hello World!');
});

app.post('/adminsignup', (req, res) => {
  const { name, email, password } = req.body;

});

app.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;

});

app.get('/admin' /* admin only */, (req, res) => {
  res.send('Hello Admin!');
});
