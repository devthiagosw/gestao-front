import { Categoria } from "./categoria";
import { Usuario } from "./usuario";

export class Orcamento {
  id?: number;
  usuario!: Partial<Usuario>;
  categoria!: Partial<Categoria>
  valorLimite!: number;
  periodo!: string;
  dataCriacao?: string;

  constructor(init?: Partial<Orcamento>) {
    Object.assign(this, init);
  }
}