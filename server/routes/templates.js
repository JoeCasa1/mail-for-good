import { json } from 'body-parser';
const parseJson = json();
const cookieParser = require('cookie-parser')();

// Template controllers
import getTemplates from '../controllers/template/get-templates';
import createTemplate from '../controllers/template/create-template';
import deleteTemplates from '../controllers/template/delete-templates';

// Middleware
import { apiIsAuth } from './middleware/auth';
import { writeAccess, readAccess } from './middleware/acl';

// Permission
import templatePermission from '../controllers/permissions/acl-lib/acl-template-permissions';

// Higher order functions decorating with the permission type
const writeTemplateAccess = (req, res, next) => writeAccess(req, res, next, templatePermission);
const readTemplateAccess = (req, res, next) => readAccess(req, res, next, templatePermission);

export default function(app) {
  // Get a list of all templates
  app.get('/api/template', apiIsAuth, cookieParser, readTemplateAccess, (req, res) => {
    getTemplates(req, res);
  });
  // Post a new template
  app.post('/api/template', apiIsAuth, parseJson, cookieParser, writeTemplateAccess, (req, res) => {
    createTemplate(req, res);
  });
  // Delete template(s)
  app.delete('/api/template', apiIsAuth, parseJson, cookieParser, writeTemplateAccess, (req, res) => {
    deleteTemplates(req, res);
  });
};
