var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:pid', function(req, res, next) {
  console.log(req.params.pid)
  res.render('profile', {
    title: req.params.pid,

  });
});

module.exports = router;
