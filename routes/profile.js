var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:pid', function(req, res, next) {
  console.log(req.params.pid)
  res.render('profile', {
    title: req.params.pid,

  });
});

/* GET user's own profile */
router.get('/', function(req, res, next) {
  res.render('profile', {
    title: 'Profile Page'
  });
});

module.exports = router;
