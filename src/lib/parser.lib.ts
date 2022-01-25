import Papa from 'papaparse';
import fs from 'fs';
import 'colors';

import AppError from '../error/AppError';

export const parse = (url: string) => {
	return new Promise((resolve, reject) => {
		Papa.parse(fs.createReadStream(url), {
			encoding: 'latin1',
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				console.log(`${String(results.data.length).green} entries parsed`);
				console.log(`${String(results.errors.length).green} parsing errors`);
				if (results.errors.length > 0) {
					reject(new AppError({
						message: 'Errors were found on the table, and no data was imported into the database',
						method: 'parse',
						module: 'ParserLib',
						field: JSON.stringify(results.errors)
					}))
				}
				resolve(results.data);
			},
			error: (err) => reject(err),
		});
	});
};
