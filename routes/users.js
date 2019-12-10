const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => res.send('Login'));
router.post('/register', (req, res) => res.send('Register'));


module.exports = router;