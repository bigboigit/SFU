if (!process.env.DATABASE_URL) {
  console.error("missing database url. add the database url in .env with DATABASE_URL=...");
  process.exit(1);
}

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

(async () => {

  // test table
  if (!await knex.schema.hasTable('test')) {
    await knex.schema.createTable('test', table => {
      table.increments('id');
      table.string('testcolumn');
      table.binary('testcolumn2');
    });
    await knex('test').insert({
      testcolumn: 'failure',
      testcolumn2: false
    });
    await knex('test').insert({
      testcolumn: 'success',
      testcolumn2: true
    });
  }
  await knex('test')
    .select('testcolumn')
    .where({
      testcolumn2: true
    })
    .then(result => {
      console.log("database test result: ", result);
    })
    .then(() => {
      return knex.schema.dropTableIfExists('test');
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

  // put more tables here

  if (!await knex.schema.hasTable('users')) {
    await knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.integer('credits');

      table.float('gpa').notNullable();
      table.string('program').notNullable();
      // string array
      // based off nubmer of user's hits
      table.specificType('hobbies', 'text[]').notNullable();
      table.string('personality').notNullable();
      // calculating distance might be a yikes.
      table.string('city').notNullable();
      table.string('country').notNullable();
      // gpa preference
      table.integer('pref_gpa').notNullable();
      // program preferences
      table.integer('fas').notNullable();
      table.integer('arts').notNullable();
      table.integer('bus').notNullable();
      table.integer('comm').notNullable();
      table.integer('educ').notNullable();
      table.integer('env').notNullable();
      table.integer('hsci').notNullable();
      table.integer('sci').notNullable();
      // personality preferences
      table.integer('agreeable').notNullable();
      table.integer('conscientious').notNullable();
      table.integer('extravert').notNullable();
      table.integer('neurotic').notNullable();
      table.integer('open').notNullable();
    });
  }

  if (!await knex.schema.hasTable('inventory')) {
    await knex.schema.createTable('inventory', table => {
      table.increments('id');
      table.integer('owner');
      table.foreign('owner').references("users.id");
      table.integer('friend');
      table.foreign('friend').references("users.id");
    });
  }

  if (!await knex.schema.hasTable('market')) {
    await knex.schema.createTable('market', table => {
      table.increments('id');
      table.integer('friendship');
      table.foreign('friendship').references("inventory.id");
      table.integer('price');
    });
  }

})().catch(err => {
  console.error(err);
  process.exit(1)
});

module.exports = knex;