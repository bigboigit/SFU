var express = require('express');
var router = express.Router();

const knex = require('../databases')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // owner table in market
  const owners = await knex('market')
    .join('inventory', {
      'market.friendship': 'inventory.id'
    })
    .join('users', {
      'inventory.owner': 'users.id'
    })
    .select('market.id', 'users.username', 'market.price', 'users.id as userId')
    .orderBy('market.id', 'asc');

  // friend table in market
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

  let friendValues = [];
  for (i = 0; i < friends.length; i ++) {
    var value = 0;
    // gpa value
    // difference of gpa's * 3
    value -= Math.abs((req.user.pref_gpa - friends[i].gpa) * 3)
    // program value
    if (friends[i].program == 1) {
      value += req.user.fas;
    }
    else if (friends[i].program == 2) {
      value += req.user.arts;
    }
    else if (friends[i].program == 3) {
      value += req.user.bus;
    }
    else if (friends[i].program == 4) {
      value += req.user.comm;
    }
    else if (friends[i].program == 5) {
      value += req.user.educ;
    }
    else if (friends[i].program == 6) {
      value += req.user.env;
    }
    else if (friends[i].program == 7) {
      value += req.user.hsci;
    }
    else if (friends[i].program == 8) {
      value += req.user.sci;
    }
    // matching hobbies
    if (friends[i].hobbies.includes(req.user.hobbies[0])) {
      value += 2;
    }
    if (friends[i].hobbies.includes(req.user.hobbies[1])) {
      value += 2;
    }
    if (friends[i].hobbies.includes(req.user.hobbies[2])) {
      value += 2;
    }
    // personality value
    switch (friends[i].personality) {
      case 1:
        value += req.user.agreeable;
        break;
      case 2:
        value += req.user.conscientious;
        break;
      case 3:
        value += req.user.extravert;
        break;
      case 4:
        value += req.user.neurotic;
        break;
      case 5:
        value += req.user.open;
        break;
    }
    friendValues.push(value);
  }
  console.log();
  console.log(friendValues);
  console.log();
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

  if (req.user.credits > req.body.price) {
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
  }
  else {
    req.flash('info', 'You do not have enough money');
    return res.redirect('/market');
  }

});

// put on marketplace
router.post('/sell', function (req, res, next) {
  knex('market').insert({
    friendship: req.body.friend,
    price: req.body.price
  }).then(result => {
    return res.redirect('/market');
  }).catch(err => {
    console.error(err);
    req.flash("info", "error selling your person");
    return res.redirect('/market');
  })
});

module.exports = router;