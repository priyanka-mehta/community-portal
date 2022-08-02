import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';

export default async function listUser(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log(req)
    const user = await User.find();
    console.log('FETCHED DOCUMENT');

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
