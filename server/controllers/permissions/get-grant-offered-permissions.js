import { offerPermission as OfferPermission } from '../../models';

export default function(req, res) {

  OfferPermission.findAll({
    where: {
      userId: req.user.id
    },
    attributes: [
      'id',
      'toUserEmail',
      'campaigns',
      'templates',
      'lists',
      'createdAt',
      'updatedAt'
    ],
    raw: true
  })
  .then(grantOfferedPermissionsArray => {
    if (!grantOfferedPermissionsArray.length) {
      res.send();
    } else {
      res.send(grantOfferedPermissionsArray);
    }
  })
  .catch(err => {
    throw err;
  });
};
