var express = require('express');
var router = express.Router();

const knex = require('../databases')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // owner table
  knex('market')
    .join('market.friendship', '=', 'inventory.id')
    .join('inventory.owner', '=', 'users.id')
    .select('market.id', 'users.username','market.price')
  
  // friend table
  knex('market')
    .join('market.friendship', '=', 'inventory.id')
    .join('inventory.friend', '=', 'users.id')
    .select('market.id',
            'users.username', 
            'users.gpa', 
            'users.program', 
            'users.hobbies', 
            'users.personailty', 
            'users.city', 
            'users.country', 
            'market.price')

  res.render('market', {
    title: 'Log in'
  });
});

// take off market place
router.post('/buy', function(req, res, next) {
  /* UPDATE transaction server with buy
     DROP previous transaction of previous owner 
     update credit of buyer and seller
     */
    knex ('market').where('id', req.query.id).del()

    knex ('inventory').insert({
      owner: req.query.purchaser,
      friend: req.query.friend
    })
});

// put on marketplace
router.post('/sell', function(req, res, next) {
  knex ('market').insert({
    friendship: req.query.friend,
    price: req.query.price
  })
});

module.exports = router;
