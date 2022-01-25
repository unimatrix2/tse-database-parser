import { parse } from '../lib/parser.lib';
import AppError from '../error/AppError';

export const parser = async (pathUri: string) => {
	try {
		const parsedData = await parse(pathUri);
	} catch (error: any) {
		new AppError({
			message: error.message,
			method: 'Parser',
			module: 'Parse-Service',
			...error
		});
	}
}
