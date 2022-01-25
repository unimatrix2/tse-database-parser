import { batchDocumentImport } from './../lib/importer.lib';
import { parse } from '../lib/parser.lib';
import AppError from '../error/AppError';
import { mongoConnect, mongoDisconnect } from '../configs/db.config';

export const parser = async (pathUri: string, mongoUri: string) => {
	try {
		const parsedData = await parse(pathUri);
		await mongoConnect(mongoUri);
		await batchDocumentImport(parsedData);
		await mongoDisconnect();
	} catch (error: any) {
		console.log(error);
		new AppError(error);
	}
}
