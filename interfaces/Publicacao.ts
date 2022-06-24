import { IJogo } from './Jogo'
import { IPlataforma } from './Plataforma'

export interface IPublicacao{
    id: number;
    titulo: string;
    descricao: string;
    dataLancamento: Date;
    tipo: string;
    link: string;
    imagem: string;
    Jogo: Partial<IJogo>;
    Plataformas: IPlataforma[];
}

export interface IPublicacaoPost{
    id: number;
    titulo: string;
    descricao: string;
    dataLancamento: Date;
    tipo: string;
    link: string;
    imagem: string;
    Jogo: number;
    Plataformas?: number[];
}
