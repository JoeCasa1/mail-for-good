import { json } from 'body-parser';
const parseJson = json();

import createUser from '../controllers/accountsManagement/create-user';
import deleteUser from '../controllers/accountsManagement/delete-user';

// Middleware
import { apiIsAuth } from './middleware/auth';

export default function(app) {
  app.post('/api/create-user', apiIsAuth, parseJson, (req, res) => {
    createUser(req,res);
  })

  app.delete('/api/delete-user', apiIsAuth, parseJson, (req,res) => {
    deleteUser(req,res)
  });
};
