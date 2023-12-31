import 'colors';

import { parse } from '../lib/parser.lib';
import TseCandidate from '../models/Candidate.model';
import { loggingColors as log } from '../lib/enum.lib';
import { mongoConnect, mongoDisconnect } from '../configs/db.config';

export async function parseAndImportDb(pathUri: string, mongoUri: string) {
	const promises = [];
	try {
		await mongoConnect(mongoUri);
		for await (const batch of parse(pathUri)) {
			promises.push(TseCandidate.insertMany(batch)
				.then(() => console.log(`${log.success}Batch entries imported with success`))
				.catch((err) => console.log(log.error, err))
			);
		}
		await Promise.all(promises);
		await mongoDisconnect();
	} catch (error) {
		throw error;
	}
}

export async function parseAndUpdateDb(pathUri: string, mongoUri: string) {
	const year = pathUri.match(/\d{4}/)?.[0];
	if (year) {
		await mongoConnect(mongoUri);
		console.log(log.info + 'Removing DB entries for year: ', year);
		await TseCandidate.deleteMany({ ANO_ELEICAO: year });
		await mongoDisconnect();
		console.log(log.success + 'Removed DB entries for year: ', year);
		await parseAndImportDb(pathUri, mongoUri);
	}
	throw new Error(log.error + 'No year found in file name, make sure the file name follows the TSE Open Data standard: consulta_cand_YYYY.csv');
}