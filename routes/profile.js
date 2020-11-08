var express = require('express');
var router = express.Router();

const knex = require('../databases');

/* GET users listing. */
router.get('/:pid', async function(req, res, next) {
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
    me: (profileowner)? ((profileowner.length==0)? null: profileowner[0]) : null
  });
});

/* GET user's own profile */
router.get('/', async function(req, res, next) {
  const friends = await knex('inventory')
    .join('users', {
      'inventory.friend': 'users.id'
    })
    .select('*')
    .where('inventory.owner', req.user.id);
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

  res.render('profile', {
    title: req.user.username,
    me: req.user,
    friends: friends,
    friendValues: friendValues
  });
});

module.exports = router;
