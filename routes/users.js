const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => res.render('Login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/dashboard', (req, res) => res.render('dashboard'));


module.exports = router;