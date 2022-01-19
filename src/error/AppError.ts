import ErrorParams from '../interfaces/error';
import 'colors';

export default class AppError extends Error {
	method: string;
	module: string;

	constructor(params: ErrorParams) {
		super();
		this.message = params.message || 'Application Error'.red.underline;
		this.method = params.method || 'Unknown Method'.red;
        this.module = params.module || 'Unknown Module'.red;
	}
}
