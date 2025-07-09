const express = require('express')
const router = express.Router()


router.post('/signup', (req, res) => {

});

router.post('/login', (req, res) => {

});

router.get('/home' /* admin only */, (req, res) => {
  res.send('Hello Admin!');
});

module.exports = router
