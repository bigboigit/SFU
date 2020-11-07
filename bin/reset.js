require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error("missing database url. add the database url in .env with DATABASE_URL=...");
  process.exit(1);
}

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

knex.schema.dropTableIfExists('market')
  .then(() => {
    return knex.schema.dropTableIfExists('inventory')
  })
  .then(() => {
    return knex.schema.dropTableIfExists('users')
  })
  .then(() => {
    return knex.schema.dropTableIfExists('test')
  })
  .then(() => {
    console.log("database reset success");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });