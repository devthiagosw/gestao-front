import { Usuario } from "./usuario";

export class Conta {
  id!: number;
  usuario!: Partial<Usuario>;
  nomeConta!: string;
  tipoConta!: string;
  saldoInicial!: number;
  dataCriacao?: string;
  status!: string;
}
