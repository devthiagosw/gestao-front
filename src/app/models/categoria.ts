import { TipoCategoria } from "../enums/tipo-categoria";  
import { Usuario } from "./usuario";

export class Categoria {
  id?: number;
  nomeCategoria!: string;
  tipo!: TipoCategoria;
  icone?: string;
  dataCriacao?: Date;
  usuario!: Usuario; 
}