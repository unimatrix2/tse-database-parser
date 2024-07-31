import 'colors';
import type { WriteStream } from 'fs';
import type { ParseResult, ParseStepResult } from 'papaparse';

import AppError from '../error/AppError';
import { loggingColors as log } from './enum.lib';
import type { ICandidate } from '../../types';

export function handleParsedErrors(results: ParseStepResult<ICandidate> | ParseResult<ICandidate>, stream: WriteStream): void {
	const errorData = new AppError({
		message:
				'Errors were found on this document, verify these records were included on the database.',
		method: 'parse',
		module: 'ParserLib',
		step: 'Step',
		field: results.errors.map((err: any) => ({...err, data: results.data})),
	});

	console.log(log.error + 'Errors found on batch: ', results.errors);
	stream.write(JSON.stringify(errorData) + '\n');
}
