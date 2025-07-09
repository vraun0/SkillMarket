const express = require('express')
const router = express.Router()

router.post('/signup', (req, res) => {

});

router.post('/login', (req, res) => {

});

router.get('/home', (req, res) => {
  res.send('Hello World!');
});

module.exports = router

