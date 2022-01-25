import AppError from '../error/AppError';
import connect from '../configs/db.config';
import TseCandidate from '../models/Candidate.model';
import { ICandidateDocument } from './../../@types/tseparser/src/models/index.d';

export const singleDocumentImportLoop = async (
	data: ICandidateDocument[],
	url: string
) => {
	try {
		await connect(url);
	} catch (error: any) {
		throw new AppError({
			message: error.message,
			method: 'singleDocumentImportLoop',
			module: 'ImporterLib',
			step: 'Connect'
		})
	}
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
					field: error.keyValue
				});
			}
			throw new AppError({
				message: error.message,
				method: 'singleDocumentImportLoop',
				module: 'ImporterLib',
				step: 'Loop'
			});
		}
	}
};

export const batchDocumentImportLoop = async (
	data: ICandidateDocument[],
	url: string
) => {
	try {
		await connect(url);
	} catch (error: any) {
		throw new AppError({
			message: error.message,
			method: 'batchDocumentImportLoop',
			module: 'ImporterLib',
			step: 'Connect'
		});
	}
	const length = data.length;
	const documentArray: ICandidateDocument[][] = [];
	for (let i = 0; i < length; i += 1) {
		i === 0
			? documentArray.push(data.slice(i, i + 5000))
			: documentArray.push(data.slice((i * 5000) + 1, (i * 5000) + 5000));
	}
	for (const docArray of documentArray) {
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
					field: error.keyValue
				});
			}
			throw new AppError({
				message: error.message,
				method: 'singleDocumentImportLoop',
				module: 'ImporterLib',
				step: 'Loop'
			});
		}
	}
}