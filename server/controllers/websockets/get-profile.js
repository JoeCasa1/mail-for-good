import { user as User } from '../../models';

export default function(id) {
  return User.findOne({
    where: {
      id: id
    },
    attributes: ['picture', 'email', 'createdAt', 'name', 'sentEmailsCount']
  }).then(userInstance => {
    const userObject = userInstance.get({ plain:true });
    return userObject;
  });
};
