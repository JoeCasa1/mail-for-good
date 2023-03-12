import { list as List } from '../../models';

export default (req, res) => {

  const listId = req.body.id;
  const values = req.body.values;

  List.update(
    values,
    {where:{id:listId}}
  )
  .then(()=>{
    res.send('Name updated');
  })
  .catch(()=>{
    res.status(400).send('Failed to update list');
  });
};
