import { Schema, model} from 'mongoose';
import { ICandidateModel } from '../..';

const tseCandidateSchema = new Schema({
    DT_GERACAO: { type: String },
    HH_GERACAO: { type: String },
    ANO_ELEICAO: { type: Number },
    CD_TIPO_ELEICAO: { type: Number },
    NM_TIPO_ELEICAO: { type: String },
    NR_TURNO: { type: Number },
    CD_ELEICAO: { type: String },
    DS_ELEICAO: { type: String },
    DT_ELEICAO: { type: String },
    TP_ABRANGENCIA: { type: String },
    SG_UF: { type: String },
    SG_UE: { type: String },
    NM_UE: { type: String },
    CD_CARGO: { type: Number },
    DS_CARGO: { type: String },
    SQ_CANDIDATO: { type: String, index: true },
    NR_CANDIDATO: { type: Number },
    NM_CANDIDATO: { type: String},
    NM_URNA_CANDIDATO: { type: String },
    NM_SOCIAL_CANDIDATO: { type: String },
    NR_CPF_CANDIDATO: { type: String, index: true },
    NM_EMAIL: { type: String },
    CD_SITUACAO_CANDIDATURA: { type: Number },
    DS_SITUACAO_CANDIDATURA: { type: String },
    CD_DETALHE_SITUACAO_CAND: { type: Number },
    DS_DETALHE_SITUACAO_CAND: { type: String },
    TP_AGREMIACAO: { type: String },
    NR_PARTIDO: { type: Number },
    SG_PARTIDO: { type: String },
    NM_PARTIDO: { type: String },
    SQ_COLIGACAO: { type: String },
    NM_COLIGACAO: { type: String },
    DS_COMPOSICAO_COLIGACAO: { type: String },
    CD_NACIONALIDADE: { type: Number },
    DS_NACIONALIDADE: { type: String },
    SG_UF_NASCIMENTO: { type: String },
    CD_MUNICIPIO_NASCIMENTO: { type: Number },
    NM_MUNICIPIO_NASCIMENTO: { type: String },
    DT_NASCIMENTO: { type: String },
    NR_IDADE_DATA_POSSE: { type: Number },
    NR_TITULO_ELEITORAL_CANDIDATO: { type: String },
    CD_GENERO: { type: Number },
    DS_GENERO: { type: String },
    CD_GRAU_INSTRUCAO: { type: Number },
    DS_GRAU_INSTRUCAO: { type: String },
    CD_ESTADO_CIVIL: { type: Number },
    DS_ESTADO_CIVIL: { type: String },
    CD_COR_RACA: { type: Number },
    DS_COR_RACA: { type: String },
    CD_OCUPACAO: { type: Number },
    DS_OCUPACAO: { type: String },
    VR_DESPESA_MAX_CAMPANHA: { type: Number },
    CD_SIT_TOT_TURNO: { type: Number, index: true },
    DS_SIT_TOT_TURNO: { type: String },
    ST_REELEICAO: { type: String, index: true },
    ST_DECLARAR_BENS: { type: String },
    NR_PROTOCOLO_CANDIDATURA: { type: Number },
    NR_PROCESSO: { type: String },
    CD_SITUACAO_CANDIDATO_PLEITO: { type: Number },
    DS_SITUACAO_CANDIDATO_PLEITO: { type: String },
    CD_SITUACAO_CANDIDATO_URNA: { type: Number },
    DS_SITUACAO_CANDIDATO_URNA: { type: String },
    ST_CANDIDATO_INSERIDO_URNA: { type: String, index: true },
}, { timestamps: true });

const TseCandidate: ICandidateModel = model('Candidates', tseCandidateSchema);

export default TseCandidate;
