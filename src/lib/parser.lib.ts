import 'colors';
import Papa from 'papaparse';
import { createReadStream, createWriteStream } from 'fs';

import { loggingColors as log } from './enum.lib';
import { handleParsedErrors } from './util.lib';
import type { ICandidate } from '../..';

export async function* parse(url: string): AsyncGenerator<ICandidate[]> {
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
			if (results.errors.length) handleParsedErrors(results, logStream);
			batch.push(results.data);
			if (batch.length >= batchSize) {
				logStream.write(JSON.stringify({ message: 'Batch parsed with success' }) + '\n');
				resolve(batch);
				batch = [];
				promise = new Promise(r => resolve = r);
			}
		},
		complete: (results) => {
			if (results.errors.length) handleParsedErrors(results, logStream);
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
		if (result instanceof Array) yield result;
	}
}