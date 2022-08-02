import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';

export default async function addUser(req, res) {
	try {
		await connectMongo();
		const user = await User.findOneAndUpdate({ _id: req.body._id }, req.body);

		res.json({ user });
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
}
