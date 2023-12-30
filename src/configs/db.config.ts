import { connect, connection } from 'mongoose';

import { loggingColors as log } from '../lib/enum.lib';

export const mongoConnect = async (url: string) => {
	try {
		await connect(url);
		console.log(log.success + 'Database connected');
	} catch (error) {
		console.log(log.error + 'Error connecting to database');
		throw error;
	}
};

export const mongoDisconnect = async () => {
	try {
		await connection.close();
		console.log(log.success + 'Database disconnected');
	} catch (error) {
		console.log(log.error + 'Error disconnecting from database');
		throw error;
	}
};
