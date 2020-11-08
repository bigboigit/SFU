var express = require('express');
var router = express.Router();

const users = require('./market');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//check authenticated reroutes you into our app if already logged in
router.get('/login', res.locals.checkAuthenticated, function(req, res, next) {
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
});

router.use(users);

module.exports = router;
