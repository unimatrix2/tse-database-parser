import { Document, Model, ObjectId } from 'mongoose';
import { ParseResult } from 'papaparse';

// Data Interfaces
export interface ErrorParams {
	message: any;
	method: string;
	module: string;
	step?: string;
	index?: number;
	field?: string;
}

export interface ICandidate {
	DT_GERACAO: string;
	HH_GERACAO: string;
	ANO_ELEICAO: number;
	CD_TIPO_ELEICAO: number;
	NM_TIPO_ELEICAO: string;
	NR_TURNO: number;
	CD_ELEICAO: string;
	DS_ELEICAO: string;
	DT_ELEICAO: string;
	TP_ABRANGENCIA: string;
	SG_UF: string;
	SG_UE: string;
	NM_UE: string;
	CD_CARGO: number;
	DS_CARGO: string;
	SQ_CANDIDATO: string;
	NR_CANDIDATO: number;
	NM_CANDIDATO: string;
	NM_URNA_CANDIDATO: string;
	NM_SOCIAL_CANDIDATO: string;
	NR_CPF_CANDIDATO: string;
	NM_EMAIL: string;
	CD_SITUACAO_CANDIDATURA: number;
	DS_SITUACAO_CANDIDATURA: string;
	CD_DETALHE_SITUACAO_CAND: number;
	DS_DETALHE_SITUACAO_CAND: string;
	TP_AGREMIACAO: string;
	NR_PARTIDO: number;
	SG_PARTIDO: string;
	NM_PARTIDO: string;
	SQ_COLIGACAO: string;
	NM_COLIGACAO: string;
	DS_COMPOSICAO_COLIGACAO: string;
	CD_NACIONALIDADE: number;
	DS_NACIONALIDADE: string;
	SG_UF_NASCIMENTO: string;
	CD_MUNICIPIO_NASCIMENTO: number;
	NM_MUNICIPIO_NASCIMENTO: string;
	DT_NASCIMENTO: string;
	NR_IDADE_DATA_POSSE: number;
	NR_TITULO_ELEITORAL_CANDIDATO: string;
	CD_GENERO: number;
	DS_GENERO: string;
	CD_GRAU_INSTRUCAO: number;
	DS_GRAU_INSTRUCAO: string;
	CD_ESTADO_CIVIL: number;
	DS_ESTADO_CIVIL: string;
	CD_COR_RACA: number;
	DS_COR_RACA: string;
	CD_OCUPACAO: number;
	DS_OCUPACAO: string;
	VR_DESPESA_MAX_CAMPANHA: number;
	CD_SIT_TOT_TURNO: number;
	DS_SIT_TOT_TURNO: string;
	ST_REELEICAO: string;
	ST_DECLARAR_BENS: string;
	NR_PROTOCOLO_CANDIDATURA: number;
	NR_PROCESSO: string;
	CD_SITUACAO_CANDIDATO_PLEITO: number;
	DS_SITUACAO_CANDIDATO_PLEITO: string;
	CD_SITUACAO_CANDIDATO_URNA: number;
	DS_SITUACAO_CANDIDATO_URNA: string;
	ST_CANDIDATO_INSERIDO_URNA: string;
}

export interface ICandidateDb extends ICandidate {
	_id: ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

// ImporterLib Methods
export declare const batchDocumentImport: (data: ICandidate[], url: string) => Promise<void>;


// DbLib Methods
export declare const insertManyBatch: (data: ICandidate[][]) => Promise<void>;

// ParserLib Methods
export declare const parse: (url: string) => Promise<ICandidate[]>;

// ParseService Methods
export declare const parser: (pathUri: string, mongoUri: string) => Promise<void>;

// Mongoose Interfaces
export interface ICandidateDocument extends Document<ICandidateModel> {}
export interface ICandidateModel extends Model<ICandidateDb> {}

export interface IParseResult extends Omit<ParseResult, 'data'> {
	data: ICandidate[]
}

// DB Config Methods
export declare const mongoConnect: (url: string) => Promise<void>;
export declare const mongoDisconnect: () => Promise<void>;

// Error Interfaces
export declare class AppError extends Error {
    method: string;
    module: string;
    step?: string;
    index?: number;
    field?: string;
    constructor(params: ErrorParams);
}