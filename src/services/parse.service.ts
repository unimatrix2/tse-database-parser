import { setCache, clearCache } from '../lib/store.lib';
import { parse } from '../lib/parser.lib';
import AppError from '../error/AppError';

export const parser = async (url: string) => {
	try {
		clearCache();
		const parsedData = await parse(url);
		setCache(parsedData);
	} catch (error: any) {
		new AppError({
			message: error.message,
			method: 'Parser',
			module: 'Parse-Service'
		});
	}
}