import 'colors';

import AppError from '../error/AppError';
import { parse } from '../lib/parser.lib';
import TseCandidate from '../models/Candidate.model';
import { loggingColors as log } from '../lib/enum.lib';
import { mongoConnect, mongoDisconnect } from '../configs/db.config';

export const parser = async (pathUri: string, mongoUri: string) => {
	try {
		await mongoConnect(mongoUri);
		const iterator = parse(pathUri);
		const promises = [];
		for await (const batch of iterator) {
		promises.push(TseCandidate.insertMany(batch)
			.then(() => console.log(`${log.success}Batch entries imported with success`))
			.catch((err) => console.log(log.error, err))
		);
	}
		await Promise.all(promises);
		await mongoDisconnect();
	} catch (error: any) {
		throw error instanceof AppError ? error : new AppError(error);
	}
}
