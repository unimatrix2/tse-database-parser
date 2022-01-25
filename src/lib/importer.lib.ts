import AppError from '../error/AppError';
import { mongoConnect, mongoDisconnect } from '../configs/db.config';
import { ICandidate } from '../..';
import { batchMaker, insertManyBatch, singleSaveLoop } from './db.lib';

export const singleDocumentImport = async (
	data: ICandidate[],
	url: string
) => {
	try {
		await mongoConnect(url);
		await singleSaveLoop(data);
		await mongoDisconnect();
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
	data: ICandidate[],
	url: string
) => {
	try {
		await mongoConnect(url);
		const batches = batchMaker(data);
		await insertManyBatch(batches);
		await mongoDisconnect();
	} catch (error: any) {
		throw new AppError({
			message: error.message,
			method: 'batchDocumentImportLoop',
			module: 'ImporterLib',
			step: 'Connect',
		});
	}
};
