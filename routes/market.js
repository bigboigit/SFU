var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('market', {
    title: 'Log in'
  });
});

router.post('/buy', function(req, res, next) {
  /* UPDATE transaction server with buy
     DROP previous transaction of previous owner 
     update credit of buyer and seller
     */
});

router.post('/sell', function(req, res, next) {
  /* Place friend on marketplace
     */
});

module.exports = router;
