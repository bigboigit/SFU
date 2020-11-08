const LocalStrategy = require("passport-local").Strategy;
const { select } = require("./databases");
const knex = require('./databases');

function initialize(passport) {
    const authenticateUser = (req, username, password, done) => {
        /* Authentication steps */
        // Query for username
        //If len>0
        // intialize user object with all the data;
        //if password matches return done
        //othwerise return incorrect
        knex('users')
            .select('username')
            .where({
                username: username,
                password: password
            })
            .then(result => {
                //check len == 0?
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
        knex('users')
            .select('username')
            .where({
                username: user.path.to.uname,
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