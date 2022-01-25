import { connection } from 'mongoose';

import AppError from '../error/AppError';
import connect from '../configs/db.config';
import { ICandidateDocument } from '../..';
import { batchMaker, insertManyBatch, singleSaveLoop } from './db.lib';

export const singleDocumentImport = async (
	data: ICandidateDocument[],
	url: string
) => {
	try {
		await connect(url);
		await singleSaveLoop(data);
		await connection.close();
	} catch (error: any) {
		throw new AppError({
			message: error.message,
			method: 'singleDocumentImportLoop',
			module: 'ImporterLib',
			step: 'Connect',
		});
	}

	connection.close();
};

export const batchDocumentImport = async (
	data: ICandidateDocument[],
	url: string
) => {
	try {
		await connect(url);
		const batches = batchMaker(data);
		await insertManyBatch(batches);
		await connection.close();
	} catch (error: any) {
		throw new AppError({
			message: error.message,
			method: 'batchDocumentImportLoop',
			module: 'ImporterLib',
			step: 'Connect',
		});
	}
};
