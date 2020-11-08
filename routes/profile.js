var express = require('express');
var router = express.Router();

const knex = require('../databases');

/* GET users listing. */
router.get('/:pid', function(req, res, next) {
  console.log(req.params.pid)
  res.render('profile', {
    title: req.params.pid,

  });
});

/* GET user's own profile */
router.get('/', async function(req, res, next) {
  const friends = await knex('inventory')
    .join('users', {
      'inventory.owner': 'users.id'
    })
    .select('users.username')
    .where('inventory.owner', req.user.id);

  
    
  res.render('profile', {
    title: req.user.username,
    me: req.user,
    friends: friends
  });
});

module.exports = router;
