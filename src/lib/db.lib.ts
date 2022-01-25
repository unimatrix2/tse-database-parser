import AppError from '../error/AppError';
import { ICandidate, ICandidateDocument } from '../..';
import TseCandidate from '../models/Candidate.model';

export const insertManyBatch = async (
	data: ICandidate[][]
): Promise<void> => {
	for (const docArray of data) {
		try {
			await TseCandidate.insertMany(docArray);
		} catch (error: any) {
			if (error.keyValue) {
				console.log(error); // This is here because this specific error case will be handled specially and I need to know what error type is being thrown
				throw new AppError({
					message: error.message,
					method: 'singleDocumentImportLoop',
					module: 'ImporterLib',
					step: 'Loop',
					field: error.keyValue,
				});
			}
			throw new AppError({
				message: error.message,
				method: 'singleDocumentImportLoop',
				module: 'ImporterLib',
				step: 'Loop',
			});
		}
	}
};

export const singleSaveLoop = async (
	data: ICandidate[]
): Promise<void> => {
	for (const candidate of data) {
		try {
			const document: ICandidateDocument = new TseCandidate(candidate);
			await document.save();
		} catch (error: any) {
			if (error.keyValue) {
				console.log(error); // This is here because this specific error case will be handled specially and I need to know what error type is being thrown
				throw new AppError({
					message: error.message,
					method: 'singleDocumentImportLoop',
					module: 'ImporterLib',
					step: 'Loop',
					field: error.keyValue,
				});
			}
			throw new AppError({
				message: error.message,
				method: 'singleDocumentImportLoop',
				module: 'ImporterLib',
				step: 'Loop',
			});
		}
	}
};

export const batchMaker = (
	data: ICandidate[]
): ICandidate[][] => {
	const size: number = 10000;
	const length: number = Math.ceil(data.length / size);
	const documentArray: ICandidate[][] = [];
	for (let i = 0; i < length; i += 1) {
		documentArray.push(data.slice(i * size, i * size + size));
	}
	return documentArray;
};
