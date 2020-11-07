var express = require('express');
var router = express.Router();

const users = require('./market');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: "Log in" });
});

router.post('/login', function(req, res, next) {
  /*
  AUTHENTICATION GOES HERE
  */
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up'});
});

router.post('/signup', function(req, res, next) {
  /*
  DATABASE ENTRY CREATION GOES HERE
  */
});

router.use(users);

module.exports = router;
