import { offerPermission as OfferPermission } from '../../models';

export default function(req, res) {

  OfferPermission.findAll({
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
  .then(receivedPermissionArray => {
    if (!receivedPermissionArray.length) {
      res.send();
    } else {
      res.send(receivedPermissionArray);
    }
  })
  .catch(err => {
    throw err;
  });
};
