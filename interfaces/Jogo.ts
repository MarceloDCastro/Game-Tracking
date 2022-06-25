import { IGenero } from './Genero'

export interface IJogo {
    id: number;
    nome: string;
    descricao: string;
    dataLancamento: Date;
    Generos: IGenero[];
    imagens: string[];
    ImagensJogos: {
        id: number,
        url: string
    }[]
}

export interface IJogoPost {
    nome: string;
    descricao: string;
    dataLancamento: Date;
    Generos: number[];
    imagens: string[];
}
