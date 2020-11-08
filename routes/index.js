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
    const hobbies = [req.body.hobby1, req.body.hobby2, req.body.hobby3]
  knex ('users').insert({
    username:      req.body.uname,
    password:      req.body.passwd,
    credits:       req.body.credits,
    gpa:           req.body.gpa,
    program:       req.body.program,
    hobbies:       hobbies,
    personality:   req.body.personality,
    city:          req.body.City,
    country:       req.body.Country,
    pref_gpa:      req.body["Preferred GPA"][0],
    fas:           req.body["Preferred GPA"][1][0],
    arts:          req.body["Preferred GPA"][1][1],
    bus:           req.body["Preferred GPA"][1][2],
    comm:          req.body["Preferred GPA"][1][3],
    educ:          req.body["Preferred GPA"][1][4],
    env:           req.body["Preferred GPA"][1][5],
    hsci:          req.body["Preferred GPA"][1][6],
    sci:           req.body["Preferred GPA"][1][7],
    agreeable:     req.body["Preferred GPA"][2][0],
    conscientious: req.body["Preferred GPA"][2][1],
    extravert:     req.body["Preferred GPA"][2][2],
    neurotic:      req.body["Preferred GPA"][2][3],
    open:          req.body["Preferred GPA"][2][4]
  })
});

router.use(users);

module.exports = router;
