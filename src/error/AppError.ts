import 'colors';

import { ErrorParams } from '../..';

const optionalParamsMapper = (
	optional: string | number | undefined | any[]
): boolean => Boolean(optional) || String(optional) === '0';


export default class AppError extends Error {
	method: string;
	module: string;
	step?: string;
	index?: number;
	field?: string | any[];

	constructor(params: ErrorParams) {
		super();
		this.message = params.message || 'Application Error'.red.underline;
		this.method = params.method || 'Unknown Method'.red;
        this.module = params.module || 'Unknown Module'.red;
		optionalParamsMapper(params.step) ? this.step = params.step : null;
		optionalParamsMapper(params.index) ? this.index = params.index : null;
		optionalParamsMapper(params.field) ? this.field = params.field : null;
	}
}
