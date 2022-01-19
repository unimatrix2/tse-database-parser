import Papa from 'papaparse';
import fs from 'fs';
import 'colors';

export const parse = (url: string) => {
	return new Promise((resolve, reject) => {
		Papa.parse(fs.createReadStream(url), {
			encoding: 'latin1',
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				console.log(`${String(results.data.length).green} entries parsed`);
				console.log(`${String(results.errors.length).green} parsing errors`);
				resolve(results.data);
			},
			error: (err) => reject(err),
		});
	});
};
