import Conf from 'conf';

const conf = new Conf();

export const setCache = (parsedData: any) => conf.set('cache', parsedData);

export const getCache = () => conf.get('cache');

export const clearCache = () => conf.clear();