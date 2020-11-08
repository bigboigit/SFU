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
