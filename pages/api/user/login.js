import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';

export default async function login(req, res) {
  try {
    await connectMongo();
    const user = await User.find({ familyId: req.body.familyId });
    if (user.length > 0 && user[0].password === req.body.password) {
      res.json({ user, statusCode: 200 });
    } else {
      res.json({ statusCode: 401 })
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
