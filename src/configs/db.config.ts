import { connect, connection } from 'mongoose';

export const mongoConnect = async (url: string) => {
	try {
		await connect(url);
		console.log('Database connected');
	} catch (error) {
		console.log(error);
	}
};

export const mongoDisconnect = async () => {
	await connection.close();
	console.log('Database disconnected');
};
