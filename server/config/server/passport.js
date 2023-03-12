import passport, { serializeUser, deserializeUser } from 'passport';

import { google } from '../secrets';
import { user as _user } from '../../models';
import Google from '../passport/google';
import local from '../passport/local';

export default () => {
  serializeUser(function(user, done) {
    done(null, user.id);
  });

  deserializeUser(function(id, done) {
    _user.findById(id).then(user => {
      done(null, user);
      return null;
    }).catch(err => {
      if (err) { throw err; }
      }
    );
  });
  ///////////////////////////////
  /* AUTHENTICATION STRATEGIES */
  ///////////////////////////////
  if(typeof process.env.GOOGLE_CONSUMER_KEY !== 'undefined'){
    Google(passport, google);
  }
  local(passport)
};
