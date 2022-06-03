import { IGenero } from './Genero'
import { IUsuario } from './Usuario'

export interface IJogo {
    id: number;
    nome: string;
    descricao: string;
    dataLancamento: Date;
    Generos: IGenero[];
    imagens: string[];
}

export interface IJogoPost {
    nome: string;
    descricao: string;
    dataLancamento: Date;
    Generos: number[];
    imagens: string[];
}