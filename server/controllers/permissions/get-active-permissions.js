import { acl as ACL } from '../../models';

export default function(req, res) {

  ACL.findAll({
    where: {
      toUserId: String(req.user.id)
    },
    attributes: [
      'id',
      'fromUserEmail',
      'campaigns',
      'templates',
      'lists',
      'createdAt',
      'updatedAt'
    ],
    raw: true
  })
  .then(permissionArray => {
    if (!permissionArray.length) {
      res.send();
    } else {
      res.send(permissionArray);
    }
  })
  .catch(err => {
    throw err;
  });
};
