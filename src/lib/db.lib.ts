import TseCandidate from '../models/Candidate.model';
import type { ICandidate } from '../..';
import { insertionErrorHandler } from './util.lib';

export const insertManyBatch = async (data: ICandidate[][]): Promise<void> => {
	for (const docArray of data) {
		try {
			await TseCandidate.insertMany(docArray);
		} catch (error: any) {
			insertionErrorHandler(error, 'insertManyBatch');
		}
	}
};

export const singleSaveLoop = async (data: ICandidate[]): Promise<void> => {
	for (const candidate of data) {
		try {
			const document = new TseCandidate(candidate);
			await document.save();
		} catch (error: any) {
			insertionErrorHandler(error, 'singleSaveLoop');
		}
	}
};

export const insertManySingle = async (data: ICandidate[]): Promise<void> => {
	try {
		await TseCandidate.insertMany(data);
	} catch (error: any) {
		insertionErrorHandler(error, 'insertManySingle');
	}
}