import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';

export default async function listUser(req, res) {
  try {
    await connectMongo();
    let user = await User.find({ _id: req.query.userId });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
