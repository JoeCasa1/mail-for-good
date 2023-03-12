import { Server } from 'http';
import express from 'express';
import passport, { initialize, session } from 'passport';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import configureSequelize from './sequelize';
import configureWebpackDevMiddleware from './webpack-dev-middleware';
import configureRedis from './redis';
import configureSession from './session';
import configureIo from './io';

import restoreDbState from './restore-db-state';
import routes from '../../routes';

const app = express();
const server = Server(app);

export default () => {
  // Sync the db
  configureSequelize();
  // Use webpack deb middleware in development mode
  configureWebpackDevMiddleware(app);

  // Configure redis, receiving connections to client, subscriber and publisher
  const { client, subscriber, publisher } = configureRedis();

  // Configure session handling with redis, through the client connection.
  const { sessionMiddleware } = configureSession(client);

  // Configure io
  const io = configureIo(sessionMiddleware, server);

  // Configure express & passport
  // Configure express & passport
  require("./passport").default(passport); // Configure passport strategies & serialisation
  app.use(sessionMiddleware); // Use redis as session state handler
  app.use(initialize()); // Initialise passport
  app.use(session()); // Use passport middleware for auth
  app.use(helmet()); // Implements various security tweaks to http response headers

  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_SESSION],
    })
  );

  app.use("/public", express.static(path.join(__dirname, "../../../public"))); // Serve /public static files when unauth
  app.use("/dist", express.static(path.join(__dirname, "../../../dist"))); // Serve /dist static diles when auth

  // Routes
  routes(app, passport, io, { client, subscriber, publisher });

  // Start the server after correcting the database state
  restoreDbState();

  return server;
};
