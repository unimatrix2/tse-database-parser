import 'colors';
import { ICandidate } from '../..';
import { batchMaker } from './util.lib';
import AppError from '../error/AppError';
import { insertManyBatch, singleSaveLoop } from './db.lib';
import { loggingColors as log } from './enum.lib';

/* export const singleDocumentImport = async (data: ICandidate[]) => {
	try {
		await singleSaveLoop(data);
	} catch (error: any) {
		throw new AppError({
			message: error.message,
			method: 'singleDocumentImportLoop',
			module: 'ImporterLib',
			step: 'Connect',
		});
	}
}; */

export const batchDocumentImport = async (data: ICandidate[]) => {
	try {
		const batches = batchMaker(data);
		await insertManyBatch(batches);
		console.log(`${log.success}${batches.length} Batches imported successfully`.green);
	} catch (error: any) {
		throw new AppError({
			message: error.message.red,
			method: 'batchDocumentImportLoop',
			module: 'ImporterLib',
			step: 'Connect',
		});
	}
};
