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
    .select('market.id', 'users.username', 'market.price', 'users.id as userId')
    .orderBy('market.id', 'asc');

  // friend table
  const friends = await knex('market')
    .join('inventory', {
      'market.friendship': 'inventory.id'
    })
    .join('users', {
      'inventory.friend': 'users.id'
    })
    .select('market.id',
      'users.id as user_id',
      'users.username',
      'users.gpa',
      'users.program',
      'users.hobbies',
      'users.personality',
      'users.city',
      'users.country',
      'market.price')
    .orderBy('market.id', 'asc');

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

  console.log(req.body);

  knex('market')
    .where('id', req.body.marketid)
    .del()
    .then(result => {
      return knex('inventory').insert({
        owner: req.user.id,
        friend: req.body.friend
      });
    })
    .then(result => {
      req.flash('info', 'You bought them');
      return res.redirect('/profile');
    });
});

// put on marketplace
router.post('/sell', function (req, res, next) {
  knex('market').insert({
    friendship: req.query.friend,
    price: req.query.price
  })
});

module.exports = router;