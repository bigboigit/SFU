const LocalStrategy = require("passport-local").Strategy;
const { select } = require("./databases");
const knex = require('./databases');

function initialize(passport) {
    const authenticateUser = (req, username, password, done) => {

        knex('users')
            .select('*')
            .where({
                username: username,
                password: password
            })
            .then(result => {
                if(result.length == 0){
                    throw Error('no results');
                }
                const user = {...result[0]}//fill in user data
                return done(null, user)
            })
            .catch(err => {
                return done(null, false, {
                    message: "Username or password incorrect"
                });
            })
    }
    passport.use(
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true
            },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser((user,done) => {
        console.log(`Deserialize: ${user}`);
        knex('users')
            .select('username')
            .where({
                username: 'user.username'
            })
            .then(result => {
                return done(null, user)
            })
            .catch(err => {
                return done(err);
            })
    })
}


module.exports = initialize;