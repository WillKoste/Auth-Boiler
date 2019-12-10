const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

router.get('/login', (req, res) => res.render('Login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/dashboard', (req, res) => res.render('dashboard'));

router.post('/register', (req, res) => {
  const {name, email, password, password2} = req.body;
  let errors = [];

  if(!name || !email || !password || !password2){
    errors.push({msg: 'Please fill in all fields'});
  }

  if(password !== password2){
    errors.push({msg: 'Passwords do not match'});
  }

  if(password.length < 6){
    errors.push({msg: 'Password must have at least 6 characters'});
  }

  if(errors.length > 0){
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else{
    User.findOne({email: email})
    .then(user => {
      if(user){
        errors.push({msg: 'User already exists with this email'});
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else{
        const newUser = new User({name, email, password});
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;

          newUser.password = hash;

          newUser.save()
            .then(user => {
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        }));
      }
    });
  }

});


module.exports = router;