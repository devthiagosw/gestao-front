import { Usuario } from "./usuario";

export class Meta {
  id?: number;
  usuario!: Partial<Usuario>;
  descricao!: string;
  valorObjetivo!: number;
  valorAtual!: number;
  dataInicio!: string;
  dataTermino!: string;
  status!: string;

  constructor(init?: Partial<Meta>) {
    Object.assign(this, init);
  }
}


