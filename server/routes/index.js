import { resolve } from 'path';
import { json } from 'body-parser';
import auth from './auth';
const parseJson = json();

import unsubscribe from '../controllers/subscriber/unsubscribe';

// Analytics
import getClickthroughs from '../controllers/analytics/get-clickthroughs';
import refresh from '../controllers/analytics/refresh';
import open from '../controllers/analytics/open';
import clickthrough from '../controllers/analytics/clickthrough';

// Settings
import getSettings from '../controllers/settings/get-settings';
import changeSettings from '../controllers/settings/changesettings';

// Middleware
import { apiIsAuth, isAuth } from './middleware/auth';

// Routes
import lists from './lists';
import templates from './templates';
import campaigns from './campaigns';
import accountsManagement from './accountsManagement';
import permissions from './permissions';

export default (app, passport, io, redis) => {

  ////////////////////
  /* AUTHENTICATION */
  ////////////////////

  auth(app, passport, isAuth);

  app.get('/logout', isAuth, (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  ////////////////////
  /*      API       */
  ////////////////////

  /* Campaigns */
  campaigns(app, io, redis);

  /* Templates */
  templates(app);

  /* Lists */
  lists(app, io);

  accountsManagement(app)

  /* Permissions */
  permissions(app);

  /* Settings */
  // Get boolean values designating assigned fields
  app.get('/api/settings', apiIsAuth, (req, res) => {
    getSettings(req, res);
  });
  // Post to change new settings
  app.post('/api/settings', apiIsAuth, parseJson, (req, res) => {
    changeSettings(req, res, redis);
  });

  /* Subscribers */
  // Get to unsubscribe an email based on the unsubscribeKey parameter
  app.get('/unsubscribe/:unsubscribeKey', (req, res) => {
    unsubscribe(req, res);
  });

  ////////////////////
  /*    ANALYTICS   */
  ////////////////////

  // convenience root for dev
  app.get('/api/analytics/refresh', (req, res) => {
    refresh(req, res);
  });
  // Clickthrough
  app.get('/clickthrough', (req, res) => {
    clickthrough(req, res);
  });
  // Open/pixel tracking
  app.get('/trackopen', (req, res) => {
    open(req, res);
  });
  // temporary
  app.get('/api/analytics/clickthrough', apiIsAuth, (req, res) => {
    getClickthroughs(req, res);
  });

  ////////////////////
  /*      APP       */
  ////////////////////

  app.get('/*', isAuth, (req, res) => {
    res.sendFile(resolve('dist/index.html'));
  });
};
