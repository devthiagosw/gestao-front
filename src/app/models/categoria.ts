import { TipoCategoria } from "../enums/tipo-categoria";
import { Usuario } from "./usuario";

export class Categoria {
  id?: number;
  nomeCategoria!: string;
  tipo!: TipoCategoria;
  icone?: string;
  dataCriacao?: string;
  usuario!: Usuario;

  constructor(
    nomeCategoria: string = '',
    tipo: TipoCategoria = TipoCategoria.DESPESA,
    icone: string = '',
    dataCriacao: string = new Date().toISOString(),
    // usuario: Usuario[] = []
  ) {
    this.nomeCategoria = nomeCategoria;
    this.tipo = tipo;
    this.icone = icone;
    this.dataCriacao = dataCriacao;
    // this.usuario = usuario;
  }
}