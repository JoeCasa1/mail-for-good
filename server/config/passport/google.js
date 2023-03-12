import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { user, sequelize, setting } from '../../models';

export default (passport, secret) => {
  passport.use(new GoogleStrategy({
    clientID: secret.consumerKey,
    clientSecret: secret.consumerSecret,
    callbackURL: secret.callbackURL,
  }, (token, tokenSecret, profile, done) => {
    user.findOne({
      where: {
        googleId: profile.id
      }
    }).then(userExists => {
      if (userExists) {
        done(null, userExists);
      } else {
        let newUserCreated;

        sequelize.transaction(t => {
          return user.create({
            googleId: profile.id,
            token: token,
            email: profile._json.emails[0].value,
            name: profile.displayName,
            picture: profile._json.image.url
          }, { transaction: t })
            .then(newUser => {
              newUserCreated = newUser;
              return setting.create({ userId: newUser.id }, { transaction: t });
          });
        }).then(() => {
          done(null, newUserCreated);
        }).catch(err => {
          done(err);
        });
      }
      return null;
    }).catch(err => {
      done(err);
    });
  }));
};
