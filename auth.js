const LocalStrategy = require("passport-local").Strategy;
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
                username: username
            })
            .then()
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
        //Query database for user
        //If does not exist return done(err)
        //If exists return done(null, user)
    })
}


module.exports = initialize;