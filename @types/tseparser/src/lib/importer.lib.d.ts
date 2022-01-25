import { ICandidateDocument } from './../models/index.d';

export function singleDocumentImportLoop(data: ICandidateDocument[], url: string): Promise<void>;

export function batchDocumentImportLoop(data: ICandidateDocument[], url: string): Promise<void>;