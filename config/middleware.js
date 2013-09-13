var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {

        User.findOne({uid: profile.id}).done(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    provider: profile.provider,
                    uid: profile.id,
                    name: profile.displayName
                }).done(function (err, user) {
                        return done(err, user);
                    });
            }
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}).done(function (err, user) {
        done(err, user)
    });
});


module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {

            passport.use(new GitHubStrategy({
                    clientID: "f4858a89a178bd0f5264",
                    clientSecret: "60a7b94176e5f92954526513fa4e7ec994d9dd7d",
                    callbackURL: "http://localhost:1337/auth/github/callback"
                },
                verifyHandler
            ));

            passport.use(new GoogleStrategy({
                    clientID: process.env.SB_GPLUS_CLIENTID || '328691051317.apps.googleusercontent.com',
                    clientSecret: process.env.SB_GPLUS_CLIENT_SECRET || 'aOoXRNAVLi4voRQ1ce5h9hUg',
                    callbackURL: process.env.SB_GPLUS_CALLBACK_URL || 'http://localhost:1337/auth/google/callback'
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};
