import { IUsuario } from './Usuario'

export interface ISugestao {
    id: number;
    assunto: string;
    mensagem: string;
    status: 'Visualizado'|'Não visualizado';
    idUsuario: number;
    Usuario: IUsuario;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISugestaoPost {
    assunto: string;
    mensagem: string;
}
