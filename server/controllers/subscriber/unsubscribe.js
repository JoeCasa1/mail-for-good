import { listsubscriber } from '../../models';

export default (req, res) => {
  const unsubscribeKey = req.params.unsubscribeKey;

  listsubscriber.update(
    { subscribed: false },
    { where: { unsubscribeKey }}
  ).then(results => {
    // Redirect to a nicer unsubscribed page or similar
    // -- if results empty -> err
    res.status(200).send("You have been unsubscribed from this mailing list.");
  });
}
