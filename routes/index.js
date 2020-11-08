var express = require('express');
var router = express.Router();

const users = require('./market');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Let's Exchange A Friend (LEAF)" });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: "Log in" });
});

router.post('/login', function(req, res, next) {
  res.locals.passport.authenticate("local", function(err, user, info) {
    if(err){
      return next(err);
    }
    if(!user){
      return res.render('/login', {messages: "Username or password is incorrect"});
    }
    req.logIn(user, function(err) {
      if(err){
        return next(err);
      }
      return res.redirect('/market'); //or whichever page should be the first page
    })
  })(req, res, next);
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up'});
});

router.post('/signup', function(req, res, next) {
  /*
  DATABASE ENTRY CREATION GOES HERE
  */
  knex ('users').insert({
    username:    req.body.uname,
    password:    req.body.passwd,
    credits:     req.body.credits,
    gpa:         req.body.gpa,
    program:     req.body.program,
    hobbies:     req.body.hobbies,
    personality: req.body.personality,
    city:        req.body.city,
    country:     req.body.country
  })
});

router.use(users);

module.exports = router;
