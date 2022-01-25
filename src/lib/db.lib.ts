import AppError from '../error/AppError';
import { ICandidateDocument } from '../..';
import TseCandidate from '../models/Candidate.model';

export const insertManyBatch = async (
	data: ICandidateDocument[][]
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
	data: ICandidateDocument[]
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
	data: ICandidateDocument[]
): ICandidateDocument[][] => {
	const length = data.length;
	const documentArray: ICandidateDocument[][] = [];
	for (let i = 0; i < length; i += 1) {
		i === 0
			? documentArray.push(data.slice(i, i + 5000))
			: documentArray.push(data.slice(i * 5000 + 1, i * 5000 + 5000));
	}
	return documentArray;
};
