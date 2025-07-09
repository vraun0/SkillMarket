const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { authorization } = require('./auth');
const { User, Course } = require('./db');

mongoose.connect(process.env.MONGODB_URI);
const port = 3000;

app.get('/courses', (req,res) => {

});

app.get('/user/purchase', (req,res) => {

});

app.post('/user/signup', (req, res) => {

});

app.post('/user/login', (req, res) => {

});

app.get('/user/home', (req, res) => {
  res.send('Hello World!');
});

app.post('/admin/signup', (req, res) => {

});

app.post('/admin/login', (req, res) => {

});

app.get('/admin/home' /* admin only */, (req, res) => {
  res.send('Hello Admin!');
});

app.listen(port);
