import Papa from 'papaparse';
import fs from 'fs';
import 'colors';

import AppError from '../error/AppError';
import { loggingColors as log } from './enum.lib';
import { ICandidate, IParseResult } from './../../index.d';

export const parse = (url: string): Promise<ICandidate[]> => {
	return new Promise((resolve, reject) => {
		Papa.parse<ICandidate>(fs.createReadStream(url), {
			encoding: 'latin1',
			header: true,
			skipEmptyLines: true,
			complete: (results: IParseResult) => {
				console.log(`${log.info}${String(results.data.length).green} entries parsed`);
				const resultsErrorsLength = results.errors.length;
				console.log(`${
					resultsErrorsLength < 1
						? log.success + String(resultsErrorsLength).green
						: log.error + String(results.errors.length).red
				} parsing errors`);
				if (results.errors.length > 0) {
					reject(
						new AppError({
							message:
								'Errors were found on the table, import cancelled'.red,
							method: 'parse',
							module: 'ParserLib',
							step: 'Complete',
							field: JSON.stringify(results.errors).gray,
						})
					);
				}
				resolve(results.data);
			},
			error: (err) =>
				reject(
					new AppError({
						message: err.message.red,
						method: 'Parse',
						module: 'ParserLib',
					})
				),
		});
	});
};
