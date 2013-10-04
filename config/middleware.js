var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
            passport.use(new GoogleStrategy({
                    clientID: process.env.SB_GPLUS_CLIENTID,
                    clientSecret: process.env.SB_GPLUS_CLIENT_SECRET,
                    callbackURL: process.env.SB_GPLUS_CALLBACK_URL
                },
                function(token, tokenSecret, profile, done) {
                    User.findOne({uid: parseInt(profile.id) }).done(function (err, user) {
                        if(user) {
                            return done(null, user);
                        } else {
                            User.create({
                                provider: profile.provider,
                                uid: profile.id,
                                name: profile.displayName,
                                picture: profile._json.picture
                            }).done(function(err, user) {
                                return done(err, user);
                            });
                        }
                    });
                }
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};
