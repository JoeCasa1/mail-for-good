import session from 'express-session';
const RedisStore = require('connect-redis')(session);

import { sessionSecret } from '../secrets';

export default client => {
  // Session middleware
  const sessionMiddleware = session({
    store: new RedisStore({ client }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
  });

  return { sessionMiddleware };
};
