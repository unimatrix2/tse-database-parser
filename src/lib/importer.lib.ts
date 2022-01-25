import AppError from '../error/AppError';
import { ICandidate } from '../..';
import { batchMaker, insertManyBatch, singleSaveLoop } from './db.lib';

export const singleDocumentImport = async (
	data: ICandidate[]
) => {
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
};

export const batchDocumentImport = async (
	data: ICandidate[]
) => {
	try {
		const batches = batchMaker(data);
		await insertManyBatch(batches);
	} catch (error: any) {
		throw new AppError({
			message: error.message,
			method: 'batchDocumentImportLoop',
			module: 'ImporterLib',
			step: 'Connect',
		});
	}
};
