var express = require('express');
var router = express.Router();

const users = require('./market');

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/market') //On succesful login redirect to first page
  }
  next();
}
/* GET home page. */
router.get('/', checkAuthenticated, function(req, res, next) {
  res.render('index', { title: "Let's Exchange A Friend (LEAF)" });
});

router.get('/login', checkAuthenticated, function(req, res, next) {
  res.render('login', { title: "Log in" });
});

router.post('/login', function(req, res, next) {
  console.log(Object.keys(req.body));
  res.locals.passport.authenticate("local", function(err, user, info) {
    console.log(err, user);
    if(err){
      return next(err);
    }
    if(!user){
      return res.render('login', {messages: "Username or password is incorrect"});
    }
    req.logIn(user, function(err) {
      if(err){
        return next(err);
      }
      return res.redirect('/market'); //or whichever page should be the first page
    })
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logOut();
  res.redirect('/');
})
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
  })
});

router.use(users);

module.exports = router;
