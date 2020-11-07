var express = require('express');
var router = express.Router();

const knex = require('../databases')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // owner table
  const owners = await knex('market')
    .join('inventory', {
      'market.friendship': 'inventory.id'
    })
    .join('users', {
      'inventory.owner': 'users.id'
    })
    .select('market.id', 'users.username', 'market.price')
    .orderBy('id', 'asc');

  // friend table
  const friends = await knex('market')
    .join('inventory', {
      'market.friendship': 'inventory.id'
    })
    .join('users', {
      'inventory.friend': 'users.id'
    })
    .select('market.id',
      'users.username',
      'users.gpa',
      'users.program',
      'users.hobbies',
      'users.personality',
      'users.city',
      'users.country',
      'market.price')
    .orderBy('id', 'asc');

  res.render('market', {
    owners: owners,
    friends: friends
  });
});

// take off market place
router.post('/buy', function (req, res, next) {
  /* UPDATE transaction server with buy
     DROP previous transaction of previous owner 
     update credit of buyer and seller
     */
  knex('market').where('id', req.query.id).del()

  knex('inventory').insert({
    owner: req.query.purchaser,
    friend: req.query.friend
  })
});

// put on marketplace
router.post('/sell', function (req, res, next) {
  knex('market').insert({
    friendship: req.query.friend,
    price: req.query.price
  })
});

module.exports = router;