import { json } from 'body-parser';
const parseJson = json();

// Permissions controllers
import getGrantedPermissions from '../controllers/permissions/get-granted-permissions';
import grantPermissions from '../controllers/permissions/grant-permission';
import deleteGrantedPermissions from '../controllers/permissions/delete-granted-permissions';

import getActivePermissions from '../controllers/permissions/get-active-permissions';
import deleteActivePermissions from '../controllers/permissions/delete-active-permissions';

import getReceivedPermissionOffers from '../controllers/permissions/get-received-permission-offers';
import acceptPermissionOffer from '../controllers/permissions/accept-permission-offer';
import rejectPermissionOffer from '../controllers/permissions/reject-permission-offers';

import getGrantOfferedPermissions from '../controllers/permissions/get-grant-offered-permissions';
import deleteGrantOfferedPermissions from '../controllers/permissions/delete-grant-offered-permissions';

// Middleware
import { apiIsAuth } from './middleware/auth';

export default function(app) {
  // Get granted permissions (i.e. permissions you have granted another user)
  app.get('/api/permissions', apiIsAuth, (req, res) => {
    getGrantedPermissions(req, res);
  });
  // Post to offer another user a set of permissions
  app.post('/api/permissions', apiIsAuth, parseJson, (req, res) => {
    grantPermissions(req, res);
  });
  // Delete granted permissions, removes item(s) from the ACL
  app.delete('/api/permissions', apiIsAuth, parseJson, (req, res) => {
    deleteGrantedPermissions(req, res);
  });

  // Get active permissions (grantee -> granter)
  app.get('/api/active-permissions', apiIsAuth, (req, res) => {
    getActivePermissions(req, res);
  });
  // Delete active permissions, removes item(s) from the ACL
  app.delete('/api/active-permissions', apiIsAuth, parseJson, (req, res) => {
    deleteActivePermissions(req, res);
  });

  // Get received permission offers
  app.get('/api/received-permissions', apiIsAuth, (req, res) => {
    getReceivedPermissionOffers(req, res);
  });
  // Post to accept permission offers
  app.post('/api/received-permissions', apiIsAuth, parseJson, (req, res) => {
    acceptPermissionOffer(req, res);
  });
  // Delete to reject permission offers
  app.delete('/api/received-permissions', apiIsAuth, parseJson, (req, res) => {
    rejectPermissionOffer(req, res);
  });

  // Get offered permissions (granter -> grantee)
  app.get('/api/grant-offered-permissions', apiIsAuth, (req, res) => {
    getGrantOfferedPermissions(req, res);
  });
  // Delete offered permissions, removes item(s) from the ACL
  app.delete('/api/grant-offered-permissions', apiIsAuth, parseJson, (req, res) => {
    deleteGrantOfferedPermissions(req, res);
  });
};
