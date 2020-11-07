var express = require('express');
var router = express.Router();

const users = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(users);

module.exports = router;
