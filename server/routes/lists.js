import { json } from 'body-parser';
const multer = require('multer')({ dest: 'server/controllers/list/uploads/' });
const parseJson = json();
const cookieParser = require('cookie-parser')();

// List controllers
import getLists from '../controllers/list/get-lists';
import getListSubscribers from '../controllers/list/get-list-subscribers';
import exportListSubscribersCSV from '../controllers/list/export-list-subscribers-csv';
import addSubscribers from '../controllers/list/add-subscribers';
import importCSV from '../controllers/list/import-csv';
import subscribeToList from '../controllers/list/subscribe';
import deleteSubscribers from '../controllers/list/delete-subscribers';
import deleteLists from '../controllers/list/delete-lists';
import updateList from '../controllers/list/update-list';

// Middleware
import { apiIsAuth } from './middleware/auth';
import { writeAccess, readAccess } from './middleware/acl';

// Permission
import listPermission from '../controllers/permissions/acl-lib/acl-list-permissions';

// Higher order functions decorating with the permission type
const writeListAccess = (req, res, next) => writeAccess(req, res, next, listPermission);
const readListAccess = (req, res, next) => readAccess(req, res, next, listPermission);

export default function(app, io) {
  // Get all lists
  app.get('/api/list/manage', apiIsAuth, cookieParser, readListAccess, (req, res) => {
    getLists(req, res);
  });
  // Get all subscribers of a list
  app.get('/api/list/subscribers', apiIsAuth, parseJson, cookieParser, readListAccess, (req, res) => {
    getListSubscribers(req, res);
  });
  // Get a single email using the list subscription key
  app.get('/api/list/subscribe', (req, res) => {
    subscribeToList(req, res);
  });
  // temp route for testing csv export of list subscribers
  app.get('/api/list/subscribers/csv', apiIsAuth, cookieParser, readListAccess, (req, res) => {
    exportListSubscribersCSV(req, res);
  });

  // Post new subscribers
  app.post('/api/list/add/subscribers', apiIsAuth, writeListAccess, (req, res) => {
    addSubscribers(req, res);
  });
  // Post new list via csv import
  app.post('/api/list/add/csv', apiIsAuth, multer.single('csv'), cookieParser, writeListAccess, (req, res) => {
    importCSV(req, res, io);
  });

  // Delete subscribers
  app.delete('/api/list/subscribers', apiIsAuth, parseJson, cookieParser, writeListAccess, (req, res) => {
    deleteSubscribers(req, res);
  });
  // Delete lists
  app.delete('/api/list/manage', apiIsAuth, parseJson, cookieParser, writeListAccess, (req, res) => {
    deleteLists(req, res);
  });

  //update a list
  app.patch('/api/list', apiIsAuth, parseJson, cookieParser, writeListAccess, (req,res) => {
    updateList(req,res);
  });
};
