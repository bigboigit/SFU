var express = require('express');
var router = express.Router();

const knex = require('../databases');

/* GET users listing. */
router.get('/:pid', async function (req, res, next) {
  console.log(req.params.pid)
  const profileowner = await knex('users')
    .select('*')
    .where({
      id: req.params.pid
    })
    .catch(err => {
      return null
    })

  res.render('profile', {
    title: req.params.pid,
    me: (profileowner) ? ((profileowner.length == 0) ? null : profileowner[0]) : null
  });
});

/* GET user's own profile */
router.get('/', async function (req, res, next) {
  const friends = await knex('inventory')
    .join('users', {
      'inventory.friend': 'users.id'
    })
    .select('*')
    .where('inventory.owner', req.user.id);

  let tiers = [];
  for (let i = 0; i < friends.length; i++) {
    tiers.push(Math.floor(Math.random() * friends.length));
  }

  res.render('profile', {
    title: req.user.username,
    me: req.user,
    friends: friends,
    values: tiers
  });
});

module.exports = router;