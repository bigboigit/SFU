if (!process.env.DATABASE_URL) {
  console.error("missing database url. add the database url in .env with DATABASE_URL=...");
  process.exit(1);
}

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

(async () => {
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
  knex('test')
    .select('testcolumn')
    .where({
      testcolumn2: true
    })
    .then(result => {
      console.log("database test result: ", result);
    });
})().catch(err => {
  console.error(err);
  process.exit(1)
});

module.exports = knex;