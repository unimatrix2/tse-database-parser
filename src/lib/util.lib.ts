import type { ICandidate } from '../..';
import AppError from '../error/AppError';

export const batchMaker = (data: ICandidate[]): ICandidate[][] => {
	const size: number = 5000;
	const length: number = Math.ceil(data.length / size);
	const documentArray: ICandidate[][] = [];
	for (let i = 0; i < length; i += 1) {
		documentArray.push(data.slice(i * size, i * size + size));
	}
	return documentArray;
};

export const insertionErrorHandler = (
	error: any,
	method: string,
	step?: string
): void => {
	if (error.keyValue) {
		console.log(error); // This is here because this specific error case will be handled specially and I need to know what error type is being thrown
		throw new AppError({
			message: error.message,
			method,
			module: 'ImporterLib',
			step,
			field: error.keyValue,
		});
	}
	throw new AppError({
		message: error.message,
		method,
		module: 'ImporterLib',
		step
	});
};
