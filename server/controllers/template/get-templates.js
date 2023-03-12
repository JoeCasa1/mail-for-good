import { template as Template } from '../../models';

export default (req, res) => {

  const userId = req.user.id;

  // Find all campaigns belonging to a user & send it to them
  Template.findAll({
    where: {
      userId: userId
    },
    raw: true
  }).then(instancesArray => {
    res.send(instancesArray);
  });
};
