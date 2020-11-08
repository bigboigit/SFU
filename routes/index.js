var express = require('express');
var router = express.Router();

const knex = require('../databases');

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/'); //On succesful login redirect to first page
  }
  next();
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Let's Exchange A Friend (LEAF)" });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: "Log in" });
});

router.post('/login', function(req, res, next) {
  res.locals.passport.authenticate("local", function(err, user, info) {
    console.log(err, user);
    if(err){
      req.flash('info', "Username or password is incorrect");
      return next(err);
    }
    if(!user){
      req.flash('info', "Username or password is incorrect");
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if(err){
        return next(err);
      }
      req.flash('info', 'You are logged in');
      const redirect = req.session.redirectTo;
      delete req.session.redirectTo;
      return res.redirect(redirect || '/'); //or whichever page should be the first page
    })
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logOut();
  req.flash('info', 'You are logged out');
  res.redirect('/');
});
router.get('/signup', checkAuthenticated, function(req, res, next) {
  res.render('signup', { title: 'Sign up'});
});

router.post('/signup', function(req, res, next) {
  /*
  DATABASE ENTRY CREATION GOES HERE
  */
  knex ('users').insert({
    username:      req.body.uname,
    password:      req.body.passwd,
    credits:       req.body.credits,
    gpa:           req.body.gpa,
    program:       req.body.program,
    hobbies:       req.body.hobbies,
    personality:   req.body.personality,
    city:          req.body.city,
    country:       req.body.country,
    pref_gpa:      req.body.pref_gpa,
    fas:           req.body.fas,
    arts:          req.body.arts,
    bus:           req.body.bus,
    comm:          req.body.comm,
    educ:          req.body.educ,
    env:           req.body.env,
    hsci:          req.body.hsci,
    sci:           req.body.sci,
    agreeable:     req.body.agreeable,
    conscientious: req.body.conscientious,
    extravert:     req.body.extravert,
    neurotic:      req.body.neurotic,
    open:          req.body.open
  }).then(result => {
    req.flash('info', 'Please log in');
    res.redirect('/login');
  }).catch(err => {
    console.error(err);
    req.flash('info', "Error signing up. Try again.");
    res.redirect('/signup');
  });
});

module.exports = router;
