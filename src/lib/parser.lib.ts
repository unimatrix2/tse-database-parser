import 'colors';
import Papa from 'papaparse';
import { createReadStream, createWriteStream } from 'fs';

import AppError from '../error/AppError';
import { loggingColors as log } from './enum.lib';

export async function* parse<ICandidate>(url: string) {
	const batchSize = 5000;
	let batch: ICandidate[] = [];

	let resolve: (value: ICandidate[] | { done: boolean }) => void;
  	let promise = new Promise<ICandidate[] | { done: boolean }>(r => resolve = r);
	const logStream = createWriteStream(__dirname + '/../../../log.ndjson', { flags: 'a' });

	Papa.parse<ICandidate>(createReadStream(url), {
		encoding: 'utf8',
		header: true,
		skipEmptyLines: true,
		delimiter: ';',
		step: (results) => {
			if (results.errors.length) {

				const errorData = new AppError({
					message:
							'Errors were found on this document, verify these records were included on the database.',
					method: 'parse',
					module: 'ParserLib',
					step: 'Step',
					field: results.errors.map((err: any) => ({...err, data: results.data})),
			});

			console.log(log.error + 'Errors found on batch: ', results.errors);
			logStream.write(JSON.stringify(errorData) + '\n');
			}
			batch.push(results.data);
			if (batch.length >= batchSize) {
				logStream.write(JSON.stringify({ message: 'Batch parsed with success' }) + '\n');
				resolve(batch);
				batch = [];
				promise = new Promise(r => resolve = r);
			}
		},
		complete: (results) => {
			if (results.errors.length) {
				const errorData = new AppError({
					message:
							'Errors were found on this document, verify these records were included on the database.',
					method: 'parse',
					module: 'ParserLib',
					step: 'Step',
					field: results.errors.map((err: any) => ({...err, data: results.data})),
			});

			console.log(log.error + 'Errors found on batch: ', results.errors);
			logStream.write(JSON.stringify(errorData) + '\n');
			}
			if (batch.length > 0) {
				console.log(log.success + 'Last batch parsed with success!');
				logStream.write(JSON.stringify({ message: 'Batch parsed with success' }) + '\n');
				resolve(batch);
				batch = [];
				promise = new Promise(r => resolve = r);
			};
			resolve({ done: true });
		}
	});

	while (true) {
		const result = await promise;
		if (!(result instanceof Array) && result.done) {
			logStream.close();
			break;
		}
		yield result;
	}
}