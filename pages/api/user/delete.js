import User from '../../../models/userModel';

export default async function deleteUser(req, res) {
  try {
    const user = await User.deleteOne({ _id: req.query.userId });
    console.log('DOCUMENT DELETED');
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
