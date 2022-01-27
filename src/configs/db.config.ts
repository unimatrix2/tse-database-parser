import { connect, connection } from 'mongoose';

import { loggingColors as log } from '../lib/enum.lib';

export const mongoConnect = async (url: string) => {
	try {
		await connect(url);
		console.log(log.success + 'Database connected');
	} catch (error) {
		console.log(error);
	}
};

export const mongoDisconnect = async () => {
	await connection.close();
	console.log(log.success + 'Database disconnected');
};
