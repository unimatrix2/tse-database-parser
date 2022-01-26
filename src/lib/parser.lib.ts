import { ICandidate, IParseResult } from './../../index.d';
import Papa from 'papaparse';
import fs from 'fs';
import 'colors';

import AppError from '../error/AppError';

export const parse = (url: string): Promise<ICandidate[]> => {
	return new Promise((resolve, reject) => {
		Papa.parse<ICandidate>(fs.createReadStream(url), {
			encoding: 'latin1',
			header: true,
			skipEmptyLines: true,
			complete: (results: IParseResult) => {
				console.log(`${String(results.data.length).green} entries parsed`);
				const resultsErrorsLength = results.errors.length;
				console.log(
					`${
						resultsErrorsLength < 1
							? String(resultsErrorsLength).green
							: String(results.errors.length).red
					} parsing errors`
				);
				if (results.errors.length > 0) {
					reject(
						new AppError({
							message:
								'Errors were found on the table, and no data was imported into the database',
							method: 'parse',
							module: 'ParserLib',
							step: 'Complete',
							field: JSON.stringify(results.errors),
						})
					);
				}
				resolve(results.data);
			},
			error: (err) =>
				reject(
					new AppError({
						message: err.message,
						method: 'Parse',
						module: 'ParserLib',
					})
				),
		});
	});
};
