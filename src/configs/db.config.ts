import mongoose from 'mongoose';

const connect = async (url: string) => {
	try {
		await mongoose.connect(url);
		console.log('Database connected');
	} catch (error) {
		console.log(error);
	}
};

export default connect;
