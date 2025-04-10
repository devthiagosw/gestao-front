import { Meta } from './metas';
import { StatusUsuario } from '../enums';

export class Usuario {
    id?: number;
    nome!: string;
    email!: string;
    senha!: string;
    dataCriacao?: string;
    status!: StatusUsuario;
    metas?: Meta[];

    constructor(
        nome: string = '',
        email: string = '',
        senha: string = '',
        status: StatusUsuario = StatusUsuario.ATIVO,
        dataCriacao: string = new Date().toISOString(),
        metas: Meta[] = []
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.status = status;
        this.dataCriacao = dataCriacao;
        this.metas = metas;
    }
}
